import React from 'react'
import { Helmet } from 'react-helmet'

import useSiteMetadata from '../../hooks/use-site-metadata/use-site-metadata'

type SEOProps = {
  title: string
  description?: string
  author?: string
  twitter?: string
  copyright?: string
  lang?: string
  meta?: any[]
}

const SEO: React.FC<SEOProps> = ({
  title,
  description = ``,
  author = ``,
  twitter = ``,
  copyright = ``,
  lang = `en`,
  meta = [],
}) => {
  const siteMetadata = useSiteMetadata()

  return (
    <Helmet
      htmlAttributes={{ lang }}
      title={title}
      titleTemplate={`%s | ${siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: description || siteMetadata.description || ``,
        },
        {
          name: `author`,
          content: author || siteMetadata.author || ``,
        },
        {
          name: `copyright`,
          content: copyright || siteMetadata.copyright || ``,
        },
        {
          property: `og:title`,
          content: title || ``,
        },
        {
          property: `og:description`,
          content: description || siteMetadata.description || ``,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: twitter || siteMetadata.twitter || ``,
        },
        {
          name: `twitter:title`,
          content: title || ``,
        },
        {
          name: `twitter:description`,
          content: description || siteMetadata.description || ``,
        },
      ].concat(meta)}
    />
  )
}

export default SEO
