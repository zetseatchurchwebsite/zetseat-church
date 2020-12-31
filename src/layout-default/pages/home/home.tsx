import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import { HomeQuery } from '../../../../graphql-types'
import SEO from '../../../shared/components/seo/seo'
import Layout from '../../../shared/components/layout/layout'
import HomeLead from './components/home-lead/home-lead'
import HomeAbout from './components/home-about/home-about'
import HomeForeignLinks from './components/home-foreign-links/home-foreign-links'
import HomeQuadLinks from './components/home-quad-links/home-quad-links'
import HomeEvents from './components/home-events/home-events'
import HomeMedia from './components/home-media/home-media'
import EmailRegistration from '../../../shared/components/email-registration/email-registration'
import useLang from '../../../shared/hooks/lang/use-lang'

type HomeProps = {}

const Home: React.FC<HomeProps> = () => {
  const data = useStaticQuery<HomeQuery>(query)
  const { lead, about, foreignLinks, quadLinks, events, media } =
    data.homePageInfo?.frontmatter ?? {}

  const lang = useLang()
  return (
    <>
      <SEO title="Home" />

      <Layout transparentHeader>
        {!lead?.isEnabled ? null : (
          <HomeLead
            bg={lead.bg}
            title={lang`home.lead.title`}
            description={lang`home.lead.description`}
            btnText={lang`btn.readmore`}
            btnUrl={lead.btnUrl}
            isEnabled={lead.isEnabled}
          />
        )}
        {!about?.isEnabled ? null : (
          <HomeAbout
            isEnabled={about.isEnabled}
            btnUrl={about.btnUrl}
            btnText={lang`btn.know.more`}
            description={lang`home.about.description`}
            title={lang`home.about.title`}
          />
        )}
        {!foreignLinks?.isEnabled ? null : (
          <HomeForeignLinks
            isEnabled={foreignLinks.isEnabled}
            shopTitle={lang`home.forign-links.store`}
            shopDescription={lang`home.forign-links.store-description`}
            shopBtnText={lang`home.forign-links.store-btn`}
            shopBtnUrl={foreignLinks.shopBtnUrl}
            liveTvTitle={lang`home.forign-links.tv`}
            liveTvDescription={lang`home.forign-links.tv-description`}
            liveTvBtnText={lang`home.forign-links.tv-btn`}
            liveTvBtnUrl={foreignLinks.liveTvBtnUrl}
          />
        )}
        {!quadLinks?.isEnabled ? null : (
          <HomeQuadLinks
            {...quadLinks}
            topLeftTitle={lang`home.quad-links.youth`}
            topRightTitle={lang`home.quad-links.kids`}
            bottomLeftTitle={lang`home.quad-links.worship`}
            bottomRightTitle={lang`home.quad-links.actofkindness`}
          />
        )}
        {!events?.isEnabled ? null : <HomeEvents {...events} />}
        {!media?.isEnabled ? null : <HomeMedia {...media} />}
        <EmailRegistration />
      </Layout>
    </>
  )
}

export default Home

const query = graphql`
  query Home {
    homePageInfo: markdownRemark(fields: { slug: { eq: "/info/home-page/" } }) {
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
          btnText
          btnUrl
        }
        about {
          isEnabled
          title
          description
          btnText
          btnUrl
        }
        foreignLinks {
          isEnabled
          shopTitle
          shopDescription
          shopBtnText
          shopBtnUrl
          liveTvTitle
          liveTvDescription
          liveTvBtnText
          liveTvBtnUrl
        }
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
        events {
          isEnabled
          maxList
        }
        media {
          isEnabled
          isBlogEnabled
          isPodcastsEnabled
          isVideosEnabled
        }
      }
    }
  }
`
