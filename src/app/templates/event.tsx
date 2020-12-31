import React from 'react'
import { graphql, PageRendererProps } from 'gatsby'
import { Block, Content, Flex, FlexSpacer, Yoga } from 'gerami'
import {
  FaArrowLeft,
  FaClock,
  FaFacebook,
  FaLocationArrow,
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

import { EventQuery } from '../../../graphql-types'
import useSiteMetadata from '../../shared/hooks/use-site-metadata/use-site-metadata'
import App from '../app'
import SEO from '../../shared/components/seo/seo'
import Layout from '../../shared/components/layout/layout'
import Anchor from '../../shared/components/anchor/anchor'
import CopyToClipboard from '../../shared/components/copy-to-clipboard/copy-to-clipboard'
import useLang from '../../shared/hooks/lang/use-lang'

type EventProps = PageRendererProps & {
  data: EventQuery
}

const Event: React.FC<EventProps> = ({ location, data }) => {
  const { event } = data

  const siteMetadata = useSiteMetadata()
  const url = `${siteMetadata.siteUrl}${location.pathname}`
  const appName = siteMetadata?.title

  const title = event?.frontmatter?.title!
  const happensOn = event?.frontmatter?.happensOn!
  const loc = event?.frontmatter?.location!
  const body = event?.html
  const excerpt = event?.excerpt

  const lang = useLang()
  return (
    <App pageRendererProps={{ location }}>
      <SEO title={`${title} | Events`} />

      <Layout>
        <Content transparent size="4XL" className="margin-top-big">
          <Block first className="font-S padding-bottom-none">
            <Flex>
              <span className="margin-vertical-auto">
                <Anchor to="/events">
                  <small>
                    <FaArrowLeft />
                  </small>
                  <span className="inline-block margin-left-normal">
                    {lang`events.title`}
                  </span>
                </Anchor>
              </span>

              <FlexSpacer />

              <span className="margin-vertical-auto fg-blackish right">
                <small className="inline-block middle margin-small margin-right-normal">
                  {lang`share`}:
                </small>

                <FacebookShareButton
                  className="margin-horizontal-normal font-L middle"
                  url={url}
                  quote={`${title} | Events – ${appName}\n\n${excerpt}`}
                  hashtag={
                    appName ? `#${appName.replace(/ /g, '')}` : undefined
                  }
                >
                  <FaFacebook />
                </FacebookShareButton>

                <TelegramShareButton
                  className="margin-horizontal-normal font-L middle"
                  url={url}
                  title={`${title} | Events – ${appName}: ${excerpt}`}
                >
                  <FaTelegram />
                </TelegramShareButton>

                <TwitterShareButton
                  className="margin-horizontal-normal font-L middle"
                  url={url}
                  title={`${title} | Events – ${appName}`}
                  hashtags={appName ? [appName.replace(/ /g, ``)] : undefined}
                >
                  <FaTwitter />
                </TwitterShareButton>

                <WhatsappShareButton
                  className="margin-horizontal-normal font-L middle"
                  url={url}
                  title={`${title} | Events – ${appName}: ${excerpt}`}
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

        <Content transparent size="XL">
          <Block>
            <h1 className="h0 margin-top-very-big margin-bottom-small">
              {title}
            </h1>

            <Content className="margin-top-big">
              <Block>
                <Yoga maxCol={2}>
                  <div>
                    <h6 className="middle padding-vertical-normal  fg-blackish">
                      <small className="inline-block padding-right-normal">
                        <FaClock />
                      </small>
                      {lang`event-time`}
                    </h6>
                    <div className="middle">
                      {moment(new Date(happensOn)).format('MMMM D, YYYY')}
                    </div>
                  </div>

                  <div>
                    <h6 className="middle padding-vertical-normal fg-blackish">
                      <small className="inline-block padding-right-normal">
                        <FaLocationArrow />
                      </small>
                      {lang`event-location`}
                    </h6>
                    <div className="middle">{loc}</div>
                  </div>
                </Yoga>
              </Block>
            </Content>
          </Block>

          {!body ? null : (
            <>
              <Block first className="padding-bottom-none">
                <hr />
              </Block>

              <Block last>
                <article dangerouslySetInnerHTML={{ __html: body }} />
              </Block>
            </>
          )}
        </Content>
      </Layout>
    </App>
  )
}

export default Event

export const query = graphql`
  query Event($id: String!) {
    event: markdownRemark(id: { eq: $id }) {
      id
      excerpt
      frontmatter {
        title
        happensOn
        location
      }
      html
      excerpt
    }
  }
`
