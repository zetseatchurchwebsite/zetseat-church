import React from 'react'
import { Block, Content, Yoga } from 'gerami'

import { AboutQuery } from '../../../../../../graphql-types'
import GatsbyImage from 'gatsby-image'

type AboutLeadershipProps = Exclude<
  Exclude<AboutQuery['aboutPageInfo'], null | undefined>['frontmatter'],
  null | undefined
>['leadership']

const AboutLeadership: React.FC<AboutLeadershipProps> = ({
  title,
  leaders,
}) => {
  return (
    <div>
      <Content
        transparent
        size="XXL"
        className="left margin-vertical-very-big padding-vertical-very-big"
      >
        {title && (
          <Block first last={!leaders} className="center">
            <h1 className="fg-black">{title}</h1>
          </Block>
        )}

        {leaders && (
          <Block first={!title} last>
            <Yoga maxCol={3} className="center">
              {leaders.map((leader, i) => (
                <div key={i} className="padding-normal">
                  <Content>
                    <GatsbyImage
                      fluid={{
                        ...(leader?.photo?.childImageSharp?.fluid as any),
                        aspectRatio: 4 / 3,
                      }}
                    />
                    <div className="center padding-horizontal-normal padding-vertical-big">
                      <div className="padding-bottom-small bold">
                        {leader?.name?.toUpperCase()}
                      </div>
                      <div className="padding-top-small font-S fg-black">
                        {leader?.role?.toUpperCase()}
                      </div>
                    </div>
                  </Content>
                </div>
              ))}
            </Yoga>
          </Block>
        )}
      </Content>
    </div>
  )
}

export default AboutLeadership
