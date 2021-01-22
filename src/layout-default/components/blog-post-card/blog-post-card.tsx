import React from 'react'
import GatsbyImage from 'gatsby-image'
import { FaRegNewspaper } from 'react-icons/fa'

import './blog-post-card.scss'
import {
  GatsbyImageSharpFluid_WithWebpFragment,
  Maybe,
} from '../../../../graphql-types'
import Anchor from '../../../shared/components/anchor/anchor'

type BlogPostCardProps = {
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

const BlogPostCard: React.FC<BlogPostCardProps> = ({
  slug,
  thumbnail,
  title,
  date,
  excerpt,
}) => {
  return (
    <Anchor to={slug} className="blog-post-card">
      <GatsbyImage
        className="blog-post-card-image bg-whitish"
        fluid={{
          ...(thumbnail?.childImageSharp?.fluid as any),
          aspectRatio: 16 / 9,
        }}
      />
      <div className="blog-post-card-overlay">
        <FaRegNewspaper className="blog-post-card-overlay-icon" />
        <span className="blog-post-card-overlay-label">Read Article</span>
      </div>
      <div className="padding-horizontal-big">
        <h4 className="blog-post-card-title">
          {title} <span className="subtitle font-M"> — {date}</span>
        </h4>
        <div className="blog-post-card-excerpt fg-black">{excerpt}</div>
      </div>
    </Anchor>
  )
}

export default BlogPostCard
