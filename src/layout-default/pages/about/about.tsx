import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import { AboutQuery } from '../../../../graphql-types'
import SEO from '../../../shared/components/seo/seo'
import Layout from '../../../shared/components/layout/layout'
import AboutLead from './components/about-lead/about-lead'
import AboutHistory from './components/about-history/about-history'
import AboutValues from './components/about-values/about-values'
import AboutStatementOfFaith from './components/about-statement-of-faith/about-statement-of-faith'
import AboutLeadership from './components/about-leadership/about-leadership'
import AboutStrategicAreas from './components/about-strategic-areas/about-strategic-areas'
import EmailRegistration from '../../../shared/components/email-registration/email-registration'
import HomeQuadLinks from '../home/components/home-quad-links/home-quad-links'
import useLang from '../../../shared/hooks/lang/use-lang'

type AboutProps = {}

const About: React.FC<AboutProps> = () => {
  const data = useStaticQuery<AboutQuery>(query)
  const {
    lead,
    history,
    values,
    statementOfFaith,
    leadership,
    strategicAreas,
  } = data.aboutPageInfo?.frontmatter ?? {}
  const { quadLinks } = data.homePageInfo?.frontmatter ?? {}

  const lang = useLang()
  return (
    <>
      <SEO title="About" />

      <Layout>
        {!lead?.isEnabled ? null : <AboutLead {...lead} />}
        {!history?.isEnabled ? null : (
          <AboutHistory
            {...history}
            title={lang`about.history.title`}
            description={lang`about.history`}
          />
        )}
        {!values?.isEnabled ? null : <AboutValues {...values} />}
        {!strategicAreas?.isEnabled ? null : (
          <AboutStrategicAreas {...strategicAreas} />
        )}
        {!statementOfFaith?.isEnabled ? null : (
          <AboutStatementOfFaith
            {...statementOfFaith}
            title={lang`about.statement.title`}
          />
        )}
        {!leadership?.isEnabled ? null : (
          <AboutLeadership {...leadership} title={lang`about.leader.title`} />
        )}
        {!quadLinks?.isEnabled ? null : (
          <HomeQuadLinks
            {...quadLinks}
            topLeftTitle={lang`home.quad-links.youth`}
            topRightTitle={lang`home.quad-links.kids`}
            onlyTop
          />
        )}
        <EmailRegistration />
      </Layout>
    </>
  )
}

export default About

const query = graphql`
  query About {
    aboutPageInfo: markdownRemark(
      fields: { slug: { eq: "/info/about-page/" } }
    ) {
      frontmatter {
        lead {
          isEnabled
          bg {
            childImageSharp {
              fluid(maxWidth: 1920, quality: 90) {
                src
                srcSet
              }
            }
          }
          title
          description
        }
        history {
          isEnabled
          title
          description
        }
        values {
          isEnabled
        }
        strategicAreas {
          isEnabled
          title
          description
        }
        statementOfFaith {
          isEnabled
          title
          description
          attachment {
            publicURL
          }
        }
        leadership {
          isEnabled
          title
          leaders {
            photo {
              childImageSharp {
                fluid(maxWidth: 420, quality: 90) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
            name
            role
          }
        }
      }
    }
    homePageInfo: markdownRemark(fields: { slug: { eq: "/info/home-page/" } }) {
      frontmatter {
        quadLinks {
          isEnabled
          topLeftCover {
            childImageSharp {
              fluid(maxWidth: 560, quality: 90) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          topLeftUrl
          topLeftTitle
          topRightCover {
            childImageSharp {
              fluid(maxWidth: 560, quality: 90) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          topRightUrl
          topRightTitle
          bottomLeftCover {
            childImageSharp {
              fluid(maxWidth: 560, quality: 90) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          bottomLeftTitle
          bottomLeftDescription
          bottomRightCover {
            childImageSharp {
              fluid(maxWidth: 560, quality: 90) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          bottomRightTitle
          bottomRightDescription
        }
      }
    }
  }
`
