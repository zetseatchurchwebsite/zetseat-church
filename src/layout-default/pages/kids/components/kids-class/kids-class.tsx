import React from 'react'
import { Block, Content } from 'gerami'
import ClassCard from './components/class-card/class-card'
import useLang from '../../../../../shared/hooks/lang/use-lang'
import { KidsbgQuery } from '../../../../../../graphql-types'
import { graphql, useStaticQuery } from 'gatsby'

const KidsClass = () => {
  const data = useStaticQuery<KidsbgQuery>(query)

  const lang = useLang()
  return (
    <div
      className=""
      style={{
        backgroundSize: '960px auto',
        backgroundPosition: 'bottom right',
        backgroundRepeat: 'no-repeat',
        backgroundImage: `url(${data.homebg?.childImageSharp?.fluid?.src})`,
      }}
    >
      <Content
        transparent
        size="8XL"
        className="margin-vertical-very-big padding-vertical-very-big"
      >
        <Block first last>
          <h1 className="center fg-black">{lang`kids.class.title`}</h1>
        </Block>
        <Content size={'L'} transparent>
          <Block>
            <ClassCard
              classes={[
                {
                  classTitle: lang`kids.class-1`,
                  subject: lang`kids.class-1.title`,
                  age: lang`kids.class-1.age`,
                },
                {
                  classTitle: lang`kids.class-2`,
                  subject: lang`kids.class-2.title`,
                  age: lang`kids.class-2.age`,
                },
                {
                  classTitle: lang`kids.class-3`,
                  subject: lang`kids.class-3.title`,
                  age: lang`kids.class-3.age`,
                },
                {
                  classTitle: lang`kids.class-4`,
                  subject: lang`kids.class-4.title`,
                  age: lang`kids.class-4.age`,
                },
                {
                  classTitle: lang`kids.class-5`,
                  subject: lang`kids.class-5.title`,
                  age: lang`kids.class-5.age`,
                },
              ]}
            />
          </Block>
        </Content>
      </Content>
    </div>
  )
}

export default KidsClass
export const query = graphql`
  query Kidsbg {
    homebg: file(relativePath: { eq: "images/shared/homebg.png" }) {
      childImageSharp {
        fluid(maxWidth: 1920, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`
