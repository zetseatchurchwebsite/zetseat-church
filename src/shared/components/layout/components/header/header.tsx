import React, { useState } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { Flex, FlexSpacer } from 'gerami'
import GatsbyImage from 'gatsby-image'

import './header.scss'
import { HeaderQuery } from '../../../../../../graphql-types'
import Nav from '../nav/nav'
import Anchor from '../../../anchor/anchor'
import { useScrollPosition } from '../../../../hooks/use-scroll-position/use-scroll-position'
import useLang from '../../../../hooks/lang/use-lang'

type HeaderProps = {
  transparentHeader?: boolean
}

const Header: React.FC<HeaderProps> = ({ transparentHeader }) => {
  const data = useStaticQuery<HeaderQuery>(query)

  const lang = useLang()
  const [pos, setPos] = useState({ x: 0, y: 0 })
  useScrollPosition(({ currPos }) => setPos(currPos))

  return (
    <header
      className={`header ${transparentHeader ? 'header-transparent' : ''} ${
        transparentHeader && pos.y === 0 ? 'header-transparent-active' : ''
      }`}
    >
      <div className="header-space">
        <Flex>
          <Anchor to="/" className="margin-auto" style={{ paddingLeft: 20 }}>
            <Flex className="header-left padding-auto ">
              {lang`header-name-1` === 'Zetseat' ? (
                <GatsbyImage
                  className="header-logo"
                  fixed={data.englishLogo?.childImageSharp?.fixed as any}
                />
              ) : (
                <GatsbyImage
                  className="header-logo"
                  fixed={data.amharicLogo?.childImageSharp?.fixed as any}
                />
              )}
              {/* <GatsbyImage
                className="header-logo"
                fixed={data.file?.childImageSharp?.fixed as any}
              /> */}
              {/* <h1 className="header-title">
                {lang`header-name-1`} {lang`header-name-2`}
                <br />
                {lang`header-name-3`} {lang`header-name-4`}
              </h1> */}
            </Flex>
          </Anchor>

          <FlexSpacer className="header-flex-spacer" />

          <Nav />
        </Flex>
      </div>
    </header>
  )
}

export default Header

export const query = graphql`
  query Header {
    englishLogo: file(relativePath: { eq: "images/shared/logoEng.png" }) {
      childImageSharp {
        fixed(height: 56, quality: 90) {
          ...GatsbyImageSharpFixed_withWebp
        }
      }
    }
    amharicLogo: file(relativePath: { eq: "images/shared/logoAmh.png" }) {
      childImageSharp {
        fixed(height: 56, quality: 90) {
          ...GatsbyImageSharpFixed_withWebp
        }
      }
    }
  }
`
