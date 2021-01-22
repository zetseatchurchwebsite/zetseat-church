import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import GatsbyImage from 'gatsby-image'
import { Content } from 'gerami'

import './pre-header.scss'
import { PreHeaderQuery } from '../../../../../../graphql-types'
import { useIsNew } from '../../../../contexts/is-new-context/is-new-context'
import useLang from '../../../../hooks/lang/use-lang'

type PreHeaderProps = {}

const PreHeader: React.FC<PreHeaderProps> = () => {
  const data = useStaticQuery<PreHeaderQuery>(query)

  const isNew = useIsNew()

  const lang = useLang()
  return !isNew ? null : (
    <div className="pre-header">
      <div className="pre-header-bg padding-big">
        <Content
          transparent
          size="XXL"
          className="pre-header-content padding-vertical-very-big center"
        >
          <GatsbyImage
            className="pre-header-logo margin-auto"
            fixed={data.logo?.childImageSharp?.fixed as any}
          />
          <div className="left margin-auto">
            <h1>{lang`pre-header-title`}</h1>
            <h3 className="subtitle light padding-top-normal">
              {lang`pre-header-motto`}
            </h3>
          </div>
        </Content>
      </div>
    </div>
  )
}

export default PreHeader

export const query = graphql`
  query PreHeader {
    logo: file(relativePath: { eq: "images/shared/logoEng.png" }) {
      childImageSharp {
        fixed(height: 140, quality: 90) {
          ...GatsbyImageSharpFixed_withWebp
        }
      }
    }
    generalInfo: markdownRemark(fields: { slug: { regex: "/info/general/" } }) {
      frontmatter {
        motto
      }
    }
  }
`
