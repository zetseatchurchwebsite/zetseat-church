import { graphql, PageRendererProps } from 'gatsby'
import GatsbyImage from 'gatsby-image'
import { Block, Content, Flex, FlexSpacer, Yoga } from 'gerami'
import moment from 'moment'
import React, { useState } from 'react'
import {
  FaArrowLeft,
  FaFacebook,
  FaTelegram,
  FaTwitter,
  FaWhatsapp,
} from 'react-icons/fa'
import { MdExpandLess, MdExpandMore } from 'react-icons/md'
import {
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share'
import { VideoSeriesQuery } from '../../../graphql-types'
import useSiteMetadata from '../../shared/hooks/use-site-metadata/use-site-metadata'
import App from '../app'
import SEO from '../../shared/components/seo/seo'
import Layout from '../../shared/components/layout/layout'
import useLang from '../../shared/hooks/lang/use-lang'
import Anchor from '../../shared/components/anchor/anchor'
import CopyToClipboard from '../../shared/components/copy-to-clipboard/copy-to-clipboard'

export type YouTubeMetaType = {
  id: string
  url: string
  snippet: {
    publishedAt: string // Date
    channelId: string
    title: string
    description: string
    thumbnails: {
      default: { url: string; width: number; height: number }
      medium: { url: string; width: number; height: number }
      high: { url: string; width: number; height: number }
      standard: { url: string; width: number; height: number }
      maxres: { url: string; width: number; height: number }
    }
    channelTitle: string
    tags: string[]
    categoryId: string
    liveBroadcastContent: string
    localized: {
      title: string
      description: string
      defaultAudioLanguage: string
    }
    defaultAudioLanguage: string
  }
  embed: string
}

type VideoProps = PageRendererProps & {
  data: VideoSeriesQuery
}

const VideoSeries = ({ location, data }: VideoProps) => {
  const { video } = data

  const siteMetadata = useSiteMetadata()
  const url = `${siteMetadata.siteUrl}${location.pathname}`
  const appName = siteMetadata?.title

  const thumbnail = video?.frontmatter?.thumbnail
  const title = video?.frontmatter?.title!
  const episodes: YouTubeMetaType[] =
    video?.frontmatter?.episodes
      ?.map((episode) => (episode ? JSON.parse(episode) : null))
      .filter((episode) => episode !== null) || []
  const body = video?.html
  const excerpt = video?.excerpt

  const [episode, setEpisode] = useState<YouTubeMetaType | null>(
    episodes.length ? episodes[0] : null
  )
  const [descriptionVisible, setDescriptionVisible] = useState(true)

  const lang = useLang()

  return (
    <App pageRendererProps={{ location }}>
      <SEO title={`${title} | Videos`} />

      <Layout>
        <GatsbyImage
          fluid={thumbnail?.childImageSharp?.fluid as any}
          className="block margin-bottom-very-big bg-whitish"
        />

        <Content transparent size="4XL" className="margin-top-big">
          <Block first className="font-S padding-bottom-none">
            <Flex>
              <span className="margin-vertical-auto">
                <Anchor to="/videos">
                  <small>
                    <FaArrowLeft />
                  </small>
                  <span className="inline-block margin-left-normal">
                    {lang`videos`}
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
                  quote={`${title} | Videos – ${appName}\n\n${excerpt}`}
                  hashtag={
                    appName ? `#${appName.replace(/ /g, '')}` : undefined
                  }
                >
                  <FaFacebook />
                </FacebookShareButton>

                <TelegramShareButton
                  className="margin-horizontal-normal font-L middle"
                  url={url}
                  title={`${title} | Videos – ${appName}: ${excerpt}`}
                >
                  <FaTelegram />
                </TelegramShareButton>

                <TwitterShareButton
                  className="margin-horizontal-normal font-L middle"
                  url={url}
                  title={`${title} | Videos – ${appName}`}
                  hashtags={appName ? [appName.replace(/ /g, ``)] : undefined}
                >
                  <FaTwitter />
                </TwitterShareButton>

                <WhatsappShareButton
                  className="margin-horizontal-normal font-L middle"
                  url={url}
                  title={`${title} | Videos – ${appName}: ${excerpt}`}
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

        <Content transparent size="4XL" className="padding-bottom-big">
          <Block last={!episodes.length}>
            <h1 className="h0 margin-top-very-big margin-bottom-small">
              {title}
            </h1>
            <div className="subtitle">
              {episodes.length} {lang`vidoes`}
            </div>

            <hr className="block margin-vertical-very-big" />

            <Content id="player" className="margin-top-very-big">
              {episode === null ? (
                <Block first last>
                  {lang`video-not-selected`}
                </Block>
              ) : (
                <>
                  <Block first>
                    <h2 className="padding-top-none fg-black">
                      {episode?.snippet.title}'
                      <div className="subtitle font-M">
                        {moment(new Date(episode?.snippet.publishedAt)).format(
                          'MMM D, YYYY'
                        )}
                        <h6 className="inline-block padding-vertical-none padding-horizontal-normal fg-black">
                          •
                        </h6>
                        <Anchor
                          to={episode?.url}
                          target="_blank"
                          rel="noopener nofollow"
                          className="light"
                        >
                          {lang`open-in-youtube`}
                        </Anchor>
                      </div>
                    </h2>
                  </Block>

                  <div
                    className="bg-whitish padding-none"
                    dangerouslySetInnerHTML={{
                      __html: episode?.embed
                        .replace(
                          /<iframe /,
                          `<iframe class="video-series-iframe" `
                        )
                        .replace(/ height="[0-9]*"/i, ``),
                    }}
                  />

                  {!episode?.snippet.description ? null : (
                    <>
                      <Block>
                        <h6 className="padding-vertical-small right">
                          <button
                            className="gerami-anchor fg-black"
                            style={{
                              padding: 0,
                              border: 0,
                              font: `inherit`,
                              fontWeight: 300,
                              fontSize: `0.84rem`,
                              background: `transparent none`,
                            }}
                            onClick={() =>
                              setDescriptionVisible(!descriptionVisible)
                            }
                          >
                            {lang`about-episode`}
                            <span className="inline-block margin-left-normal fg-primary">
                              {descriptionVisible ? (
                                <MdExpandLess />
                              ) : (
                                <MdExpandMore />
                              )}
                            </span>
                          </button>
                        </h6>
                      </Block>

                      {!descriptionVisible ? null : (
                        <Block last>
                          <pre className="font-S">
                            {episode?.snippet.description}
                          </pre>
                        </Block>
                      )}
                    </>
                  )}
                </>
              )}
            </Content>

            <Content className="margin-vertical-big">
              {!episodes.length ? (
                <Block first last>
                  {lang`videos-episode-no-found`}
                </Block>
              ) : (
                <div className="padding-vertical-small padding-horizontal-big">
                  <Yoga maxCol={4}>
                    {episodes.map((e, i) => (
                      <Anchor
                        key={i}
                        to="#player"
                        onClick={() => setEpisode(e)}
                        className="gerami-anchor"
                        style={{
                          padding: 0,
                          border: 0,
                          font: `inherit`,
                          background: `transparent none`,
                          boxShadow: `none`,
                          color: `inherit`,
                        }}
                        title={e.snippet.title}
                      >
                        <Content
                          className="fg-black"
                          style={{ overflow: `hidden` }}
                        >
                          <GatsbyImage
                            className="blog-post-card-image bg-whitish"
                            fluid={{
                              aspectRatio: 16 / 9,
                              src: `${encodeURI(
                                decodeURI(
                                  e.snippet.thumbnails?.medium?.url ||
                                    '/icons/icon-512x512.png'
                                )
                              )}`,
                              srcSet: `${encodeURI(
                                decodeURI(
                                  e.snippet.thumbnails?.default?.url ||
                                    '/icons/icon-512x512.png'
                                )
                              )} ${
                                e.snippet.thumbnails?.default?.width || '512w'
                              }w, ${encodeURI(
                                decodeURI(
                                  e.snippet.thumbnails?.medium?.url ||
                                    '/icons/icon-512x512.png'
                                )
                              )} ${
                                e.snippet.thumbnails?.medium?.width || 512
                              }w`,
                              sizes: `(max-width: ${
                                e.snippet.thumbnails?.default?.width || 512
                              }px) ${
                                e.snippet.thumbnails?.default?.width || 512
                              }px, ${
                                e.snippet.thumbnails?.medium?.width || 512
                              }px`,
                            }}
                          />
                        </Content>
                        <div
                          className={`font-S fg-${
                            episode && episode.id === e.id
                              ? 'primary'
                              : 'blackish'
                          } left padding-top-small`}
                          style={{ height: 48, overflow: `hidden` }}
                        >
                          {e.snippet.title}
                        </div>
                      </Anchor>
                    ))}
                  </Yoga>
                </div>
              )}
            </Content>

            {!body ? null : (
              <Content
                transparent
                size="XL"
                className="margin-vertical-very-big padding-top-small"
              >
                <hr className="block margin-vertical-very-big" />

                <article
                  className="padding-top-small"
                  dangerouslySetInnerHTML={{ __html: body! }}
                />
              </Content>
            )}
          </Block>
        </Content>
      </Layout>
    </App>
  )
}

export default VideoSeries

export const query = graphql`
  query VideoSeries($id: String!) {
    video: markdownRemark(id: { eq: $id }) {
      id
      excerpt
      frontmatter {
        isFeatured
        thumbnail {
          childImageSharp {
            fluid(maxWidth: 1920, maxHeight: 280, quality: 90) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        title
        episodes
      }
      html
      excerpt
    }
  }
`
