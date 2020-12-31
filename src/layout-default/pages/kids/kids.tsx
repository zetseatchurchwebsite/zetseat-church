import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import { KidsQuery } from '../../../../graphql-types'
import SEO from '../../../shared/components/seo/seo'
import Layout from '../../../shared/components/layout/layout'
import KidsLead from './components/kids-lead/kids-lead'
import AnotherSection from '../../components/another-section/another-section'
import EmailRegistration from '../../../shared/components/email-registration/email-registration'
import KidsPurpose from './components/kids-purpose/kids-purpose'
import useLang from '../../../shared/hooks/lang/use-lang'
import KidsClass from './components/kids-class/kids-class'
import KidsQuote from './components/kids-quote/kids-quote'
import { Block, Content } from 'gerami'

type KidsProps = {}

const Kids: React.FC<KidsProps> = () => {
  const data = useStaticQuery<KidsQuery>(query)
  const { lead, otherSections } = data.kidsPageInfo?.frontmatter ?? {}

  const lang = useLang()
  return (
    <>
      <SEO title="Kids" />

      <Layout>
        {/*{!lead?.isEnabled ? null : <KidsLead title={`Girma`} {...lead} />}*/}
        <KidsLead bg={lead?.bg || null} title={lang`kids.title`} />
        {otherSections?.map((anotherSection, i) =>
          !anotherSection?.isEnabled ? null : (
            <AnotherSection key={i} {...(anotherSection as any)} />
          )
        ) || null}
        <Block
          first
          last
          className={
            ' margin-vertical-very-big padding-vertical-very-big center'
          }
        >
          <Content transparent size={'L'}>
            <KidsQuote />
          </Content>
        </Block>
        <KidsPurpose
          passionDescription={lang`kids.passion.description`}
          passionTitle={lang`kids.passion.title`}
          purposeDescription={lang`kids.purpose.description`}
          purposeTitle={lang`kids.purpose.title`}
        />
        <KidsClass />
        <EmailRegistration />
      </Layout>
    </>
  )
}

export default Kids

const query = graphql`
  query Kids {
    kidsPageInfo: markdownRemark(fields: { slug: { eq: "/info/kids-page/" } }) {
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
        otherSections {
          isEnabled
          bg {
            childImageSharp {
              fluid(maxWidth: 1920, quality: 90) {
                src
                srcSet
              }
            }
          }
          align
          title
          description
          btnText
          btnUrl
        }
      }
    }
  }
`
