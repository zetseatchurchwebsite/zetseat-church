import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import SEO from '../../../shared/components/seo/seo'
import Layout from '../../../shared/components/layout/layout'
import YouthLead from './components/youth-lead/youth-lead'
import YouthSchools from './components/youth-schools/youth-schools'
import YouthEvents from './components/youth-events/youth-events'
import AnotherSection from '../../components/another-section/another-section'
import EmailRegistration from '../../../shared/components/email-registration/email-registration'
import useLang from '../../../shared/hooks/lang/use-lang'
import YouthHistory from './components/youth-history/youth-history'
import YouthMission from './components/youth-mission/youth-mission'

type YouthProps = {}

const Youth: React.FC<YouthProps> = () => {
  const data = useStaticQuery(query)
  const { lead } = data.youthPageInfo?.frontmatter ?? {}
  const lang = useLang()
  return (
    <>
      <SEO title="Youth" />

      <Layout>
        {!lead?.isEnabled ? null : (
          <YouthLead {...lead} title={lang`youth.title`} />
        )}
        <YouthHistory
          title={lang`youth.history.title`}
          description={lang`youth.history.description`}
        />
        <YouthMission
          title={lang`youth.mission.title`}
          description={lang`youth.mission.description`}
        />
        <YouthSchools
          schools={[
            {
              title: lang`youth.schools.title`,
              description: lang`youth.schools.description`,
            },
            {
              title: lang`youth.cities.title`,
              description: lang`youth.cities.description`,
            },
            {
              title: lang`youth.higherEdu.title`,
              description: lang`youth.higherEdu.description`,
            },
            {
              title: lang`youth.professionals.title`,
              description: lang`youth.professionals.description`,
            },
          ]}
        />

        <YouthEvents
          events={[
            {
              title: lang`youth.event.firenight.title`,
              description: lang`youth.event.firenight.description`,
              btnText: lang`youth.event.button-text`,
              btnUrl: '/events',
            },
            {
              title: lang`youth.event.artnight.title`,
              description: lang`youth.event.artnight.description`,
              btnText: lang`youth.event.button-text`,
              btnUrl: '/events',
            },
            {
              title: lang`youth.event.gospel.title`,
              description: lang`youth.event.gospel.description`,
              btnText: lang`youth.event.button-text`,
              btnUrl: '/events',
            },
          ]}
        />

        <AnotherSection
          title={lang`youth.summercampus.title`}
          description={lang`youth.summercampus.description`}
          btnText={lang`youth.summercampus.btn`}
          // btnUrl={'/events'}
          bg={data?.summerCampBG}
        />

        <AnotherSection
          titleAlign={'left'}
          title={lang`youth.innerhealing.title`}
          description={lang`youth.innerhealing.description`}
        />

        <AnotherSection
          title={lang`youth.aweakening.title`}
          description={lang`youth.aweakening.description`}
        />

        <AnotherSection
          titleAlign={'left'}
          title={lang`youth.mission-school.title`}
          description={lang`youth.mission-school.description`}
        />

        <AnotherSection
          title={lang`youth.ays.title`}
          description={lang`youth.ays.description`}
          btnUrl={'https://ays.international/'}
          btnText={lang`youth.ays.btn`}
        />
        <EmailRegistration />
      </Layout>
    </>
  )
}

export default Youth

const query = graphql`
  query Youth {
    youthPageInfo: markdownRemark(
      fields: { slug: { eq: "/info/youth-page/" } }
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
      }
    }
    summerCampBG: file(relativePath: { eq: "images/youth/summer-camp.jpg" }) {
      childImageSharp {
        fluid(quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`
