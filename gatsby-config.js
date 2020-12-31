const path = require('path')

const siteUrl =
  process.env.GATSBY_SITE_URL ||
  process.env.SITE_URL ||
  `https://zetseat.netlify.com`

module.exports = {
  siteMetadata: {
    title: `Zetseat Church`,
    description: `Official Website of Zetseat Apostolic Reformation Church (https://zetseat.church/).`,
    author: `Zetseat Apostolic Reformation Church`,
    twitter: `@zetseat`, // todo
    copyright: `${new Date().getFullYear()} © Zetseat Apostolic Reformation Church`,
    siteUrl,
  },

  plugins: [
    //
    // HIGHER ORDER LANGUAGES:
    //
    {
      resolve: `gatsby-plugin-sass`,
      options: {},
    },
    // { todo
    //   resolve: `gatsby-plugin-purgecss`,
    //   options: {
    //     printRejected: true,
    //     develop: false /* CAUTION! ALWAYS TEST IN A 'production' MODE BUILD. */,
    //     whitelistPatterns: [
    //       /^gerami-yoga-item-/,
    //       /sal-animate/,
    //       /sal-disabled/,
    //       /^autolink-headers$/
    //     ],
    //     content: [
    //       path.join(process.cwd(), 'src/**/!(*.d).{ts,js,jsx,tsx}'),
    //       path.join(
    //         process.cwd(),
    //         'node_modules/gerami/**/!(*.d).{ts,js,jsx,tsx}'
    //       )
    //     ]
    //   }
    // },
    {
      resolve: `gatsby-plugin-typescript`,
      options: {},
    },
    {
      resolve: `gatsby-plugin-typescript-checker`,
      options: {},
    },
    {
      resolve: `gatsby-plugin-graphql-codegen`,
      options: {
        fileName: `./graphql-types.ts`,
        documentPaths: [
          `./src/**/*.{ts,tsx}`,
          // `./.cache/fragments/*.js`,
          `./node_modules/gatsby-*/!(node_modules)**/*.js`,
        ],
      },
    },

    //Language Localization
    {
      resolve: `gatsby-plugin-intl`,
      options: {
        path: `${__dirname}/src/shared/intl`,
        languages: [`en`, `am`],
        defaultLanguage: `en`,
        redirect: false,
      },
    },

    //
    // ASSETS:
    //
    {
      resolve: `gatsby-source-filesystem`,
      options: { name: `assets`, path: path.join(__dirname, `src`, `assets`) },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `uploads`,
        path: path.join(__dirname, `data`, `_uploads`),
      },
    },
    {
      resolve: `gatsby-plugin-sharp`,
      options: {},
    },
    {
      resolve: `gatsby-plugin-google-tagmanager`,
      options: { id: `GTM-T4NPKNQ` },
    },
    {
      resolve: `gatsby-transformer-sharp`,
      options: {},
    },
    {
      resolve: `gatsby-plugin-webfonts`,
      options: {
        fonts: { google: [{ family: `Merriweather`, variants: [`300`] }] },
      },
    },

    //
    // COMPONENTS:
    //
    {
      resolve: `gatsby-plugin-nprogress`,
      options: { color: `#ffd700`, showSpinner: false },
    },
    // { todo
    //   resolve: `gatsby-plugin-scroll-reveal`,
    //   options: {}
    // },

    //
    // DATA:
    //
    // { todo
    //   resolve: `gatsby-source-gravatar`,
    //   options: { emails: [] }
    // },
    // { todo
    //   resolve: `gatsby-plugin-remote-images`,
    //   options: { nodeType: `gravatar`, imagePath: 'url' }
    // },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
              }
            }
            logo: file(relativePath: { eq: "images/shared/icon.png" }) {
              childImageSharp {
                fixed(width: 3000, height: 3000, cropFocus: CENTER, quality: 90) {
                  src
                }
              }
            }
          }
        `,
        setup: ({ query }) => ({
          title: 'Zetseat Church Podcast',
          description: "Zetseat Apostolic Reformation Church's podcast.",
          language: 'en-us',
          generator: 'kelal tech plc',
          copyright:
            '© ' +
            new Date().getFullYear().toString() +
            ' Zetseat Apostolic Reformation Church',
          feed_url: siteUrl + '/podcasts.rss',
          site_url: siteUrl + '/podcasts',
          image_url: siteUrl + query.logo.childImageSharp.fixed.src,
          custom_namespaces: {
            media: 'https://www.itunes.com/dtds/podcast-1.0.dtd',
            itunes: 'http://www.itunes.com/dtds/podcast-1.0.dtd',
            dcterms: 'https://purl.org/dc/terms',
            spotify: 'https://www.spotify.com/ns/rss',
            psc: 'https://podlove.org/simple-chapters/',
          },
          custom_elements: [
            { 'itunes:author': 'Zetseat Church' },
            { 'itunes:type': 'serial' },
            {
              'itunes:owner': [
                { 'itunes:name': 'Zetseat Church' },
                { 'itunes:email': 'zetseatchurch@gmail.com' },
              ],
            },
            {
              'itunes:image': {
                _attr: {
                  href: siteUrl + query.logo.childImageSharp.fixed.src,
                },
              },
            },
            {
              'itunes:category': [
                { _attr: { text: 'Religion & Spirituality' } },
                { 'itunes:category': { _attr: { text: 'Christianity' } } },
              ],
            },
            { 'itunes:explicit': 'false' },

            // spotify:
            { 'spotify:countryOfOrigin': 'et' },
            { email: `zetseatchurch@gmail.com` },
            { author: `Zetseat Church` },
          ],
        }),
        feeds: [
          {
            query: `
              {
                allPodcasts: allMarkdownRemark(
                  filter: { frontmatter: { template: { eq: "podcast" } } }
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  edges {
                    node {
                      excerpt
                      fields { slug }
                      frontmatter {
                        thumbnail {
                          childImageSharp {
                            fixed(width: 3000, height: 3000, cropFocus: CENTER, quality: 90) {
                              src
                            }
                          }
                        }
                        title
                        date
                        audio {
                          publicURL
                          size
                        }
                      }
                    }
                  }
                }
              }
            `,
            serialize: ({ query: { allPodcasts } }) => {
              return allPodcasts.edges.map((edge) => {
                return {
                  title: edge.node.frontmatter.title,
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: siteUrl + edge.node.fields.slug,
                  guid: siteUrl + edge.node.fields.slug,
                  custom_elements: [
                    { 'itunes:episodeType': 'full' },
                    { 'itunes:title': edge.node.frontmatter.title },
                    {
                      enclosure: {
                        _attr: {
                          length: edge.node.frontmatter.audio.size.toString(),
                          type: 'audio/mpeg',
                          url:
                            'https://kelalapp.com/sp?url=' +
                            encodeURIComponent(
                              siteUrl + edge.node.frontmatter.audio.publicURL
                            ),
                        },
                      },
                    },
                    {
                      'itunes:duration': Math.round(
                        edge.node.frontmatter.audio.size / 320
                      ).toString(),
                    },
                    { 'itunes:explicit': 'false' },
                    {
                      'itunes:image': {
                        _attr: {
                          href:
                            siteUrl +
                            edge.node.frontmatter.thumbnail.childImageSharp
                              .fixed.src,
                        },
                      },
                    },

                    // spotify
                    { 'media:title': edge.node.frontmatter.title },
                    { 'media:description': edge.node.excerpt },
                    {
                      'media:content': {
                        _attr: {
                          type: 'audio/mpeg',
                          url:
                            'https://kelalapp.com/sp?url=' +
                            encodeURIComponent(
                              siteUrl + edge.node.frontmatter.audio.publicURL
                            ),
                        },
                      },
                    },
                  ],
                }
              })
            },
            output: '/podcasts.rss',
            title: 'Zetseat Church Podcast',
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-mailchimp`,
      options: {
        endpoint: `https://church.us4.list-manage.com/subscribe/post?u=83483edc0c13415a3e1fee4f4&id=8a3f9f412d`,
      },
    },
    {
      resolve: `gatsby-plugin-netlify-cms`,
      options: {
        htmlTitle: `Zetseat Church | Content Management`,
        htmlFavicon: `${__dirname}/src/assets/images/shared/icon.png`,
        modulePath: `${__dirname}/src/app/cms/cms.js`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: { name: `data`, path: `${__dirname}/data` },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-relative-images`,
            options: { staticFolderName: './data/_uploads' },
          },
          {
            resolve: `gatsby-remark-images`,
            options: { maxWidth: 776 /* same as GERAMI size 2XL */ },
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: { destinationDir: 'attachments' },
          },
          {
            resolve: `gatsby-remark-embedder`,
            options: {},
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {},
          },
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: { offsetY: `100`, className: `autolink-headers` },
          },
        ],
      },
    },
    {
      resolve: `@gatsby-contrib/gatsby-plugin-elasticlunr-search`,
      options: {
        fields: [`template`, `title`],
        resolvers: {
          MarkdownRemark: {
            id: (node) => node.id,
            template: (node) => node.frontmatter.template,
            title: (node) => node.frontmatter.title,
          },
        },
      },
    },

    //
    // ANALYSIS:
    //
    // { todo
    //   resolve: `gatsby-plugin-google-analytics`,
    //   options: { trackingId: `UA-154981201-1` }
    // },
    // { todo
    //   resolve: `gatsby-plugin-google-tagmanager`,
    //   options: { id: `	GTM-KD6K3BJ` }
    // },
    // { todo
    //   resolve: `gatsby-plugin-fullstory`,
    //   options: { fs_org: `RMH49` }
    // },

    //
    // META, PWA & SEO
    //
    {
      resolve: `gatsby-plugin-react-helmet`,
      options: {},
    },
    {
      resolve: `gatsby-plugin-page-creator`,
      options: { path: `${__dirname}/src/app/routes` },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: { exclude: [] },
    },
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {},
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Zetseat Apostolic Reformation Church`,
        short_name: `Zetseat Church`,
        description: `Official Website of Zetseat Apostolic Reformation Church (https://zetseat.church/).`,
        lang: `en`,
        display: `standalone`,
        icon: `src/assets/images/shared/icon.png`,
        start_url: `/`,
        background_color: `#ffd700`,
        theme_color: `#d4af37`,
      },
    },
    {
      resolve: `gatsby-plugin-offline`,
      options: { precachePages: [`/*`] },
    },

    //
    // HOSTING:
    //
    {
      resolve: `gatsby-plugin-netlify`,
      options: {},
    },
  ],
}
