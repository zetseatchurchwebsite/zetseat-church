import React from 'react'
import { graphql, PageRendererProps } from 'gatsby'
import GatsbyImage from 'gatsby-image'
import { Block, Container, Content, Flex, FlexSpacer, Yoga } from 'gerami'
import {
  FaFacebook,
  FaTelegram,
  FaTwitter,
  FaWhatsapp,
  FaArrowLeft,
} from 'react-icons/fa'
import {
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share'
import moment from 'moment'
import { kebabCase } from 'lodash'

import { BlogPostQuery } from '../../../graphql-types'
import useSiteMetadata from '../../shared/hooks/use-site-metadata/use-site-metadata'
import App from '../app'
import SEO from '../../shared/components/seo/seo'
import Layout from '../../shared/components/layout/layout'
import Anchor from '../../shared/components/anchor/anchor'
import CopyToClipboard from '../../shared/components/copy-to-clipboard/copy-to-clipboard'
import BlogPostCard from '../../layout-default/components/blog-post-card/blog-post-card'
import PodcastCard from '../../layout-default/components/podcast-card/podcast-card'
import useLang from '../../shared/hooks/lang/use-lang'

type BlogPostProps = PageRendererProps & {
  data: BlogPostQuery
}

const BlogPost: React.FC<BlogPostProps> = ({ location, data }) => {
  const { blogPost, similarPosts: _similarPosts } = data

  const siteMetadata = useSiteMetadata()
  const url = `${siteMetadata.siteUrl}${location.pathname}`
  const appName = siteMetadata?.title

  const thumbnail = blogPost?.frontmatter?.thumbnail
  const title = blogPost?.frontmatter?.title!
  const date = blogPost?.frontmatter?.date!
  const authors = blogPost?.frontmatter?.authors!
  const tags = blogPost?.frontmatter?.tags!
  const body = blogPost?.html!
  const excerpt = blogPost?.excerpt!

  const similarPosts = _similarPosts.edges.map((edge) => edge.node) || []

  const lang = useLang()
  return (
    <App pageRendererProps={{ location }}>
      <SEO title={`${title} | Blog`} />

      <Layout>
        <Content transparent size="4XL" className="margin-top-big">
          <Block first className="font-S padding-bottom-none">
            <Flex>
              <span className="margin-vertical-auto">
                <Anchor to="/blog">
                  <small>
                    <FaArrowLeft />
                  </small>
                  <span className="inline-block margin-left-normal">{lang`blog.title`}</span>
                </Anchor>
              </span>

              <FlexSpacer />

              <span className="margin-vertical-auto fg-black right">
                <small className="inline-block middle margin-small margin-right-normal">
                  {lang`share`}
                </small>

                <FacebookShareButton
                  className="margin-horizontal-normal font-L middle"
                  url={url}
                  quote={`${title} | Blog – ${appName}\n\n${excerpt}`}
                  hashtag={
                    appName ? `#${appName.replace(/ /g, '')}` : undefined
                  }
                >
                  <FaFacebook />
                </FacebookShareButton>

                <TelegramShareButton
                  className="margin-horizontal-normal font-L middle"
                  url={url}
                  title={`${title} | Blog – ${appName}: ${excerpt}`}
                >
                  <FaTelegram />
                </TelegramShareButton>

                <TwitterShareButton
                  className="margin-horizontal-normal font-L middle"
                  url={url}
                  title={`${title} | Blog – ${appName}`}
                  hashtags={appName ? [appName.replace(/ /g, ``)] : undefined}
                >
                  <FaTwitter />
                </TwitterShareButton>

                <WhatsappShareButton
                  className="margin-horizontal-normal font-L middle"
                  url={url}
                  title={`${title} | Blog – ${appName}: ${excerpt}`}
                >
                  <FaWhatsapp />
                </WhatsappShareButton>

                <CopyToClipboard
                  value={url}
                  className="margin-horizontal-normal font-L middle"
                />
              </span>
            </Flex>
          </Block>
        </Content>

        <Content transparent size="XL" className="padding-bottom-very-big">
          <Block last>
            <h1 className="h0 margin-top-very-big margin-bottom-small">
              {title}
            </h1>
            <div className="subtitle">
              Published {moment(new Date(date)).fromNow()} by{' '}
              {authors.join(`, `)}
            </div>

            <hr className="block margin-vertical-very-big" />

            {!thumbnail ? null : (
              <Container>
                <Container>
                  <GatsbyImage
                    fluid={thumbnail?.childImageSharp?.fluid as any}
                    className="block margin-vertical-very-big bg-whitish"
                  />
                </Container>
              </Container>
            )}

            <article dangerouslySetInnerHTML={{ __html: body }} />
          </Block>
        </Content>

        {!tags?.length ? null : (
          <Content transparent size="4XL" className="padding-bottom-very-big">
            <Block first last>
              <h3 className="padding-top-none fg-black">{lang`tags`}</h3>
              <hr />
              <div>
                {tags.map((tag, i) => (
                  <Anchor
                    key={i}
                    to={`/tags/${kebabCase(tag!)}`}
                    className="margin-vertical-big margin-right-very-big"
                  >
                    {tag!}
                  </Anchor>
                ))}
              </div>
            </Block>
          </Content>
        )}

        {!similarPosts?.length ? null : (
          <Content transparent size="4XL" className="padding-bottom-very-big">
            <Block first last>
              <h3 className="padding-top-none fg-black">{lang`similar-posts`}</h3>
              <hr />
              <Yoga maxCol={3}>
                {similarPosts.map((node, i) => {
                  const Card =
                    node.frontmatter?.template === `blog-post`
                      ? BlogPostCard
                      : node.frontmatter?.template === `podcast`
                      ? PodcastCard
                      : null
                  return !Card ? null : (
                    <Card
                      key={i}
                      slug={node.fields?.slug!}
                      thumbnail={node.frontmatter?.thumbnail as any}
                      title={node.frontmatter?.title!}
                      date={node.frontmatter?.date!}
                    />
                  )
                })}
              </Yoga>
            </Block>
          </Content>
        )}
      </Layout>
    </App>
  )
}

export default BlogPost

export const query = graphql`
  query BlogPost($id: String!, $tags: [String]) {
    blogPost: markdownRemark(id: { eq: $id }) {
      id
      excerpt
      frontmatter {
        thumbnail {
          childImageSharp {
            fluid(maxWidth: 720, quality: 90) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        isFeatured
        title
        date(formatString: "MMMM DD, YYYY")
        authors
        tags
      }
      html
    }

    similarPosts: allMarkdownRemark(
      filter: {
        id: { ne: $id }
        frontmatter: {
          template: { regex: "/^(blog-post)$/" }
          tags: { in: $tags }
        }
      }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 3
    ) {
      edges {
        node {
          id
          frontmatter {
            template
            thumbnail {
              childImageSharp {
                fluid(maxWidth: 720, quality: 90) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
            title
            date(formatString: "MMMM DD, YYYY")
            tags
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
