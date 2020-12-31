import React from 'react'
import GatsbyImage from 'gatsby-image'
import { FaPodcast } from 'react-icons/fa'

import './podcast-card.scss'
import {
  GatsbyImageSharpFluid_WithWebpFragment,
  Maybe,
} from '../../../../graphql-types'
import Anchor from '../../../shared/components/anchor/anchor'

type PodcastCardProps = {
  slug: string
  thumbnail?: Maybe<{
    childImageSharp: Maybe<{
      fluid: Maybe<GatsbyImageSharpFluid_WithWebpFragment>
    }>
  }>
  title: string
  date: string
  excerpt?: string | null
}

const PodcastCard: React.FC<PodcastCardProps> = ({
  slug,
  thumbnail,
  title,
  date,
  excerpt,
}) => {
  return (
    <Anchor to={slug} className="podcast-card">
      <GatsbyImage
        className="podcast-card-image bg-whitish"
        fluid={{
          ...(thumbnail?.childImageSharp?.fluid as any),
          aspectRatio: 16 / 9,
        }}
      />
      <div className="podcast-card-overlay">
        <FaPodcast className="podcast-card-overlay-icon" />
        <span className="podcast-card-overlay-label">Listen to Podcast</span>
      </div>
      <div className="padding-horizontal-big">
        <h5 className="podcast-card-title">
          {title} <span className="subtitle font-M"> — {date}</span>
        </h5>
        <div className="podcast-card-excerpt fg-blackish">{excerpt}</div>
      </div>
    </Anchor>
  )
}

export default PodcastCard
