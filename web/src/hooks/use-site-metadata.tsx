import { graphql, useStaticQuery } from "gatsby"

export const useSiteMetadata = () => {
  const data = useStaticQuery(graphql`
    query allSiteQuery {
      site {
        siteMetadata {
          title
          description
          image
          author
          siteUrl
        }
      }
    }
  `)
  return data.site.siteMetadata
}