import React from 'react'
import { Block, Content, Yoga } from 'gerami'
import { FaPodcast, FaRegNewspaper, MdPlaylistPlay } from 'react-icons/all'
import _ from 'lodash'
import { FormattedMessage } from 'gatsby-plugin-intl'

import { HomeQuery } from '../../../../../../graphql-types'
import Anchor from '../../../../../shared/components/anchor/anchor'

type HomeMediaProps = Exclude<
  Exclude<HomeQuery['homePageInfo'], null | undefined>['frontmatter'],
  null | undefined
>['media']

const HomeMedia: React.FC<HomeMediaProps> = ({
  isBlogEnabled,
  isPodcastsEnabled,
  isVideosEnabled,
}) => {
  const media = _.compact([
    !isBlogEnabled
      ? null
      : {
          icon: <FaRegNewspaper />,
          title: <FormattedMessage id={'home.media.blog-title'} />,
          btnText: <FormattedMessage id={'home.media.blog-btn'} />,
          btnPath: `/blog`,
        },
    !isPodcastsEnabled
      ? null
      : {
          icon: <FaPodcast />,
          title: <FormattedMessage id={'home.media.podcasts-title'} />,
          btnText: <FormattedMessage id={'home.media.podcasts-btn'} />,
          btnPath: `/podcasts`,
        },
    !isVideosEnabled
      ? null
      : {
          icon: <MdPlaylistPlay />,
          title: <FormattedMessage id={'home.media.videos-title'} />,
          btnText: <FormattedMessage id={'home.media.videos-btn'} />,
          btnPath: `/videos`,
        },
  ])

  // @ts-ignore
  const maxCol = !!isBlogEnabled + !!isPodcastsEnabled + !!isVideosEnabled

  return (
    <div className="home-media padding-vertical-very-big">
      <Content transparent size="XXL">
        <Block first last>
          <Yoga maxCol={maxCol}>
            {media.map(({ icon, title, btnText, btnPath }, i) => (
              <div key={i} className="padding-big">
                <Content className="center padding-vertical-very-big">
                  <Block first className="h0">
                    {icon}
                  </Block>
                  <Block className="h2 fg-black">{title}</Block>

                  <Block first last>
                    <Anchor
                      className="gerami-button gerami-button-primary"
                      to={btnPath}
                    >
                      {btnText}
                    </Anchor>
                  </Block>
                </Content>
              </div>
            ))}
          </Yoga>
        </Block>
      </Content>
    </div>
  )
}

export default HomeMedia
