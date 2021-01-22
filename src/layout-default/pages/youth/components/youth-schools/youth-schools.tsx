import React from 'react'
import { Block, Content, Yoga } from 'gerami'

import Markdown from 'markdown-to-jsx'
import { YouthbgQuery } from '../../../../../../graphql-types'
import { graphql, useStaticQuery } from 'gatsby'
type YouthSchoolsProps = {
  schools: { title: string; description: string }[]
}

const YouthSchools: React.FC<YouthSchoolsProps> = ({ schools }) => {
  const data = useStaticQuery<YouthbgQuery>(query)
  return (
    <div
      style={{
        backgroundSize: '960px auto',
        backgroundPosition: 'bottom right',
        backgroundRepeat: 'no-repeat',
        backgroundImage: `url(${data.homebg?.childImageSharp?.fluid?.src})`,
      }}
    >
      <Content
        transparent
        size="4XL"
        className="margin-top-very-big padding-vertical-very-big"
      >
        <Block first last>
          <Yoga maxCol={2} className="center">
            <div className="padding-horizontal-normal">
              <Content
                className="left"
                style={{
                  minHeight: '300px',
                }}
              >
                <h3>
                  <Block>{`${schools ? schools[0]?.title : ''}`}</Block>
                  <hr style={{ opacity: 0.42 }} />
                  <Block last className="subtitle font-M">
                    <Markdown>{`${
                      schools ? schools[0]?.description : ''
                    }`}</Markdown>
                  </Block>
                </h3>
              </Content>

              <Content className="left margin-top-very-big">
                <h3>
                  <Block>{`${schools ? schools[1]?.title : ''}`}</Block>
                  <hr style={{ opacity: 0.42 }} />
                  <Block last className="subtitle font-M">
                    <Markdown>{`${
                      schools ? schools[1]?.description : ''
                    }`}</Markdown>
                  </Block>
                </h3>
              </Content>
            </div>

            <div className="padding-horizontal-normal">
              <Content className="left">
                <h3>
                  <Block>{`${schools ? schools[2]?.title : ''}`}</Block>
                  <hr style={{ opacity: 0.42 }} />
                  <Block last className="subtitle font-M">
                    <Markdown>{`${
                      schools ? schools[2]?.description : ''
                    }`}</Markdown>
                  </Block>
                </h3>
              </Content>

              <Content className="left margin-top-very-big">
                <h3>
                  <Block>{`${schools ? schools[3]?.title : ''}`}</Block>
                  <hr style={{ opacity: 0.42 }} />
                  <Block last className="subtitle font-M">
                    <Markdown>{`${
                      schools ? schools[3]?.description : ''
                    }`}</Markdown>
                  </Block>
                </h3>
              </Content>
            </div>
          </Yoga>
        </Block>
      </Content>
    </div>
  )
}

export default YouthSchools
export const query = graphql`
  query Youthbg {
    homebg: file(relativePath: { eq: "images/shared/homebg.png" }) {
      childImageSharp {
        fluid(maxWidth: 1920, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`
