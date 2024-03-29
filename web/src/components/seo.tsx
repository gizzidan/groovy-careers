import React from "react"
import { useSiteMetadata } from "../hooks/use-site-metadata"
import defaultImage from "../images/twitter-card-image.png";

interface Props {
    description?: string
    pathname?: string
    children?: any
    image?: any
    title?: string
}

const SEO = ({ title, description, image, pathname, children }: Props) => {

    const { title: defaultTitle, description: defaultDescription, siteUrl } = useSiteMetadata()

    const seo = {
        title: title || defaultTitle,
        description: description || defaultDescription,
        image: image == undefined ? defaultImage : image,
        url: `${siteUrl}${pathname || ``}`,
    }
    return (
        <>
            <title>{seo.title}</title>
            <meta name="description" content={seo.description} />
            <meta name="image" content={image == undefined ? `${siteUrl}${seo.image}` : seo.image} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={seo.title} />
            <meta name="twitter:url" content={seo.url} />
            <meta name="twitter:image" content={image == undefined ? `${siteUrl}${seo.image}` : seo.image} />
            <meta name="twitter:description" content={seo.description} />
            {children}
        </>
    )
}

export default SEO