import React, { useState } from 'react';

// Create a separate component which will load RichTextEditor only in browser
import type { RichTextEditorProps } from '@mantine/rte';



export function RichText(props: RichTextEditorProps) {
  if (typeof window !== 'undefined') {
    // eslint-disable-next-line import/extensions, global-require
    const { RichTextEditor } = require('@mantine/rte');
    return <RichTextEditor {...props} />;
  }

  // Render anything as fallback on server, e.g. loader or html content without editor
  return null;
}

export default RichText