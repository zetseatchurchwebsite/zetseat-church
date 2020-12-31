import React from 'react'
import GatsbyImage from 'gatsby-image'
import { MdPlaylistPlay } from 'react-icons/md'

import './video-series-card.scss'
import {
  GatsbyImageSharpFluid_WithWebpFragment,
  Maybe,
} from '../../../../graphql-types'
import Anchor from '../../../shared/components/anchor/anchor'

type VideoCardProps = {
  slug: string
  thumbnail?: Maybe<{
    childImageSharp: Maybe<{
      fluid: Maybe<GatsbyImageSharpFluid_WithWebpFragment>
    }>
  }>
  title: string
  numberOfEpisodes: number
  excerpt?: string | null
}

const VideoSeriesCard: React.FC<VideoCardProps> = ({
  slug,
  thumbnail,
  title,
  numberOfEpisodes,
  excerpt,
}) => {
  return (
    <Anchor to={slug} className="video-series-card">
      <GatsbyImage
        className="video-series-card-image bg-whitish"
        fluid={{
          ...(thumbnail?.childImageSharp?.fluid as any),
          aspectRatio: 16 / 9,
        }}
      />
      <div className="video-series-card-overlay">
        <MdPlaylistPlay className="video-series-card-overlay-icon" />
        <span className="video-series-card-overlay-label">
          Play Video Series
        </span>
      </div>
      <div className="padding-horizontal-big">
        <h5 className="video-series-card-title">
          {title}{' '}
          <span className="subtitle font-M"> — {numberOfEpisodes} Videos</span>
        </h5>
        <div className="video-series-card-excerpt fg-blackish">{excerpt}</div>
      </div>
    </Anchor>
  )
}

export default VideoSeriesCard
