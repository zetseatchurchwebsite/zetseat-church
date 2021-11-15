import React from 'react'
import { graphql, PageRendererProps } from 'gatsby'
import GatsbyImage from 'gatsby-image'
import { Block, Container, Content, Flex, FlexSpacer, Yoga } from 'gerami'
import {
  FaArrowLeft,
  FaFacebook,
  FaTelegram,
  FaTwitter,
  FaWhatsapp,
} from 'react-icons/fa'
import {
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share'
import moment from 'moment'
import { kebabCase } from 'lodash'

import { PodcastQuery } from '../../../graphql-types'
import useSiteMetadata from '../../shared/hooks/use-site-metadata/use-site-metadata'
import App from '../app'
import SEO from '../../shared/components/seo/seo'
import Layout from '../../shared/components/layout/layout'
import Anchor from '../../shared/components/anchor/anchor'
import CopyToClipboard from '../../shared/components/copy-to-clipboard/copy-to-clipboard'
import BlogPostCard from '../../layout-default/components/blog-post-card/blog-post-card'
import PodcastCard from '../../layout-default/components/podcast-card/podcast-card'
import useLang from '../../shared/hooks/lang/use-lang'

type PodcastProps = PageRendererProps & {
  data: PodcastQuery
}

const Podcast: React.FC<PodcastProps> = ({ location, data }) => {
  const { podcast, similarPosts: _similarPosts } = data
  const lang = useLang()

  const siteMetadata = useSiteMetadata()
  const url = `${siteMetadata.siteUrl}${location.pathname}`
  const appName = siteMetadata?.title

  const thumbnail = podcast?.frontmatter?.thumbnail
  const title = podcast?.frontmatter?.title!
  const date = podcast?.frontmatter?.date!
  const _audio = podcast?.frontmatter?.audio!
  const audio =
    JSON.parse(podcast?.frontmatter?.fromRss || '{"url":"","mp3":""}').mp3 ||
    (_audio ? `${siteMetadata.siteUrl}${_audio.publicURL}` : '')
  const authors = podcast?.frontmatter?.authors!
  const tags = podcast?.frontmatter?.tags!
  const body = podcast?.html
  const excerpt = podcast?.excerpt

  const similarPosts = _similarPosts.edges.map((edge) => edge.node) || []

  return (
    <App pageRendererProps={{ location }}>
      <SEO title={`${title} | Podcasts`} />

      <Layout>
        <Content transparent size="4XL" className="margin-top-big">
          <Block first className="font-S padding-bottom-none">
            <Flex>
              <span className="margin-vertical-auto">
                <Anchor to="/podcasts">
                  <small>
                    <FaArrowLeft />
                  </small>
                  <span className="inline-block margin-left-normal">
                    {lang`podcasts.title`}
                  </span>
                </Anchor>
              </span>

              <FlexSpacer />

              <span className="margin-vertical-auto fg-black right">
                <small className="inline-block middle margin-small margin-right-normal">
                  {lang`share`}:
                </small>

                <FacebookShareButton
                  className="margin-horizontal-normal font-L middle"
                  url={url}
                  quote={`${title} | Podcasts – ${appName}\n\n${excerpt}`}
                  hashtag={
                    appName ? `#${appName.replace(/ /g, '')}` : undefined
                  }
                >
                  <FaFacebook />
                </FacebookShareButton>

                <TelegramShareButton
                  className="margin-horizontal-normal font-L middle"
                  url={url}
                  title={`${title} | Podcasts – ${appName}: ${excerpt}`}
                >
                  <FaTelegram />
                </TelegramShareButton>

                <TwitterShareButton
                  className="margin-horizontal-normal font-L middle"
                  url={url}
                  title={`${title} | Podcasts – ${appName}`}
                  hashtags={appName ? [appName.replace(/ /g, ``)] : undefined}
                >
                  <FaTwitter />
                </TwitterShareButton>

                <WhatsappShareButton
                  className="margin-horizontal-normal font-L middle"
                  url={url}
                  title={`${title} | Podcasts – ${appName}: ${excerpt}`}
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
          <Block last={!body}>
            <h1 className="h0 margin-top-very-big margin-bottom-small">
              {title}
            </h1>
            <div className="subtitle">
              Published {moment(new Date(date)).fromNow()} by{' '}
              {authors.join(`, `)}
            </div>

            <hr className="block margin-vertical-very-big" />

            <Container>
              <Content className="margin-top-very-big audio-container bg-whitish">
                {!thumbnail ? null : (
                  <GatsbyImage
                    fluid={thumbnail?.childImageSharp?.fluid as any}
                    className="block"
                    style={{ marginBottom: -76 }}
                  />
                )}
                <div
                  className="relative right"
                  style={{ zIndex: 1, height: 74 }}
                >
                  <div
                    className="padding-horizontal-big"
                    style={{ paddingTop: 16, paddingBottom: 16 }}
                  >
                    <Anchor
                      to={audio!}
                      download={true}
                      target="_blank"
                      rel="noopener nofollow"
                      className="gerami-button uppercase fg-black bg-whitish"
                      style={{
                        margin: 0,
                        padding: `16px 24px`,
                        border: 0,
                        outline: 0,
                        height: 42,
                        fontSize: 12,
                        lineHeight: `12px`,
                      }}
                    >
                      {lang`download`}
                    </Anchor>
                  </div>
                </div>
                <div className="padding-big">
                  {/* eslint-disable */}
                  <audio src={audio} controls controlsList="nodownload" />
                  {/* eslint-enable */}
                </div>
              </Content>
            </Container>
          </Block>

          {!body ? null : (
            <Block first last>
              <article dangerouslySetInnerHTML={{ __html: body || `` }} />
            </Block>
          )}
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
              <h3 className="padding-top-none fg-black">Similar Posts</h3>
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

export default Podcast

export const query = graphql`
  query Podcast($id: String!, $tags: [String]) {
    podcast: markdownRemark(id: { eq: $id }) {
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
        fromRss
        audio {
          publicURL
        }
        authors
        tags
      }
      html
    }

    similarPosts: allMarkdownRemark(
      filter: {
        id: { ne: $id }
        frontmatter: {
          template: { regex: "/^(podcast)$/" }
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
