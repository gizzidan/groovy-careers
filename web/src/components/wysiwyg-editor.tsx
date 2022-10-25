import { ContentState, convertToRaw, EditorState, Modifier } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import React, { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const WYSIWYGEditor = ({ onChange, value }: any) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    if (!updated) {
      const defaultValue = value ? value : "";
      const blocksFromHtml = htmlToDraft(defaultValue);
      const contentState = ContentState.createFromBlockArray(
        blocksFromHtml.contentBlocks,
        blocksFromHtml.entityMap
      );
      const newEditorState = EditorState.createWithContent(contentState);
      setEditorState(newEditorState);
    }
  }, [value]);

  const onEditorStateChange = (editorState: any) => {
    setUpdated(true);
    setEditorState(editorState);

    return onChange(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };


  return (
    <>
      <div className="editor">
        <Editor
          spellCheck
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
          toolbar={{
            options: ['inline', 'list', 'textAlign', 'link', 'emoji', 'remove', 'history']
          }}
        />
      </div>
    </>
  );
};

export default WYSIWYGEditor;