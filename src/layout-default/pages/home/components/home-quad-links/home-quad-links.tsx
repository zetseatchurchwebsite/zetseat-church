import React, { useState } from 'react'
import GatsbyImage from 'gatsby-image'
import { Block, Content } from 'gerami'
import { MdExpandLess, MdExpandMore, MdLink } from 'react-icons/md'
import Markdown from 'markdown-to-jsx'

import './home-quad-links.scss'
import {
  GatsbyImageSharpFluid_WithWebpFragment,
  HomeQuery,
  Maybe,
} from '../../../../../../graphql-types'
import Anchor from '../../../../../shared/components/anchor/anchor'

type HomeQuadLinksProps = Exclude<
  Exclude<HomeQuery['homePageInfo'], null | undefined>['frontmatter'],
  null | undefined
>['quadLinks'] & {
  onlyTop?: boolean
}

const HomeQuadLinks: React.FC<HomeQuadLinksProps> = ({
  topLeftCover,
  topLeftUrl,
  topLeftTitle,
  topRightCover,
  topRightUrl,
  topRightTitle,
  bottomLeftCover,
  bottomLeftTitle,
  bottomLeftDescription,
  bottomRightCover,
  bottomRightTitle,
  bottomRightDescription,
  onlyTop = false,
}) => {
  return (
    <div className={`home-quad-links${onlyTop ? ' bg-whitish' : ''}`}>
      <Content transparent size="XXL">
        <Block
          first
          last={onlyTop}
          className={onlyTop ? `` : `padding-bottom-none`}
        >
          <HomeQuadLinksLink
            cover={topLeftCover as any}
            url={topLeftUrl}
            title={topLeftTitle}
          />
          <HomeQuadLinksLink
            cover={topRightCover as any}
            url={topRightUrl}
            title={topRightTitle}
          />
        </Block>
        {onlyTop ? null : (
          <Block last className="padding-top-none">
            <HomeQuadLinksLink
              cover={bottomLeftCover as any}
              title={bottomLeftTitle}
              expandableText={bottomLeftDescription}
            />
            <HomeQuadLinksLink
              cover={bottomRightCover as any}
              title={bottomRightTitle}
              expandableText={bottomRightDescription}
            />
          </Block>
        )}
      </Content>
    </div>
  )
}

export default HomeQuadLinks

type HomeQuadLinksLinkProps = {
  cover?: Maybe<{
    childImageSharp: Maybe<{
      fluid: Maybe<GatsbyImageSharpFluid_WithWebpFragment>
    }>
  }>
  url?: string | null
  title?: string | null
  expandableText?: string | null
}

const HomeQuadLinksLink: React.FC<HomeQuadLinksLinkProps> = ({
  cover,
  url,
  title,
  expandableText,
}) => {
  const [expanded, setExpanded] = useState(false)

  const Parent = (props: any) =>
    url && !expandableText ? (
      <Anchor to={url} {...props} />
    ) : (
      <button
        onClick={() => setExpanded(!expanded)}
        {...props}
        className={`gerami-anchor ${props.className || ''}`}
        style={{
          background: `transparent none`,
          border: 0,
          outline: 0,
          padding: 0,
          font: `inherit`,
          ...(props.style || {}),
        }}
      />
    )

  return (
    <div className="home-quad-links-link-container">
      <Parent className="home-quad-links-link">
        <Content style={{ overflow: `hidden` }}>
          <GatsbyImage
            fluid={{
              ...(cover?.childImageSharp?.fluid as any),
              aspectRatio: 4 / 3,
            }}
            className="bg-whitish"
          />
          <h3>
            <span className="inline-block fg-black">{title!}</span>
            <span className="inline-block font-M padding-left-normal fg-primary">
              {!expandableText ? (
                <MdLink />
              ) : expanded ? (
                <MdExpandLess />
              ) : (
                <MdExpandMore />
              )}
            </span>
          </h3>
          {!(!!expandableText && expanded) ? null : (
            <Block last className="fg-black">
              <article className="font-S">
                <Markdown>{expandableText!}</Markdown>
              </article>
            </Block>
          )}
        </Content>
      </Parent>
    </div>
  )
}
