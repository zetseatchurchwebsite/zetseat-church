import React, { ReactNode } from 'react'
import { Block, Content, Yoga } from 'gerami'
import Markdown from 'markdown-to-jsx'
import { FaRegLightbulb } from 'react-icons/fa'
import { IoMdCalendar } from 'react-icons/io'
import { HomeQuery } from '../../../../../../graphql-types'
import Anchor from '../../../../../shared/components/anchor/anchor'
import { FormattedMessage } from 'gatsby-plugin-intl'
import useLang from '../../../../../shared/hooks/lang/use-lang'
import { graphql, useStaticQuery } from 'gatsby'
import { HomeAboutQuery } from '../../../../../../graphql-types'

type HomeAboutProps = Exclude<
  Exclude<HomeQuery['homePageInfo'], null | undefined>['frontmatter'],
  null | undefined
>['about']

type Schedule = {
  time: String | ReactNode
  name: String | ReactNode
}

const schedules: Schedule[] = [
  {
    time: <FormattedMessage id={'home.about.schedule.wed-time'} />,
    name: <FormattedMessage id={'home.about.schedule.wed-title'} />,
  },
  {
    time: <FormattedMessage id={'home.about.schedule.sun-time'} />,
    name: <FormattedMessage id={'home.about.schedule.sun-title'} />,
  },
]

const HomeAbout: React.FC<HomeAboutProps> = ({
  title,
  description,
  btnText,
  btnUrl,
}) => {
  const data = useStaticQuery<HomeAboutQuery>(query)

  const lang = useLang()
  return (
    <div
      className="padding-vertical-very-big"
      style={{
        backgroundSize: '960px auto',
        backgroundPosition: 'bottom right',
        backgroundRepeat: 'no-repeat',
        backgroundImage: `url(${data.homebg?.childImageSharp?.fluid?.src})`,
      }}
    >
      <Content
        transparent
        size="3XL"
        className="left padding-vertical-very-big"
      >
        <Block first last>
          <Yoga maxCol={2}>
            <div className="middle">
              <Block first last={!(description || (btnText && btnUrl))}>
                <h1 className="padding-top-none fg-black">{title}</h1>
              </Block>

              <Block last={!(btnText && btnUrl)}>
                <article
                  className="left fg-black font-M"
                  style={{ fontFamily: `inherit` }}
                >
                  <Markdown>{description!}</Markdown>
                </article>
              </Block>

              {!(btnText && btnUrl) ? null : (
                <Block last>
                  <Anchor
                    to={btnUrl}
                    className="gerami-button gerami-button-primary margin-top-very-big"
                  >
                    <FaRegLightbulb className="margin-right-normal inline-block middle" />
                    <span className="inline-block middle">{btnText}</span>
                  </Anchor>
                </Block>
              )}
            </div>

            <Block className="middle padding-vertical-none">
              <Block className="padding-vertical-none">
                <Content className="shade-S">
                  <Block first last>
                    <h4 className="padding-none fg-black">{lang`home.about.schedule.title`}</h4>
                  </Block>

                  {schedules.map((schedule, i) => (
                    <div key={i}>
                      {!(i < schedules.length) ? null : (
                        <hr
                          className="margin-none margin-bottom-normal"
                          style={{ opacity: 0.42 }}
                        />
                      )}
                      <Block
                        last={i >= schedules.length - 1}
                        className="flex margin-top-big margin-top-small"
                      >
                        <div className="margin-auto font-XL fg-primary padding-right-very-big padding-right-very-big">
                          <IoMdCalendar />
                        </div>
                        <div className="margin-auto" style={{ flex: 1 }}>
                          <div className="font-XS padding-top-none uppercase fg-black">
                            {schedule.time}
                          </div>
                          <h6 className="font-M padding-top-none fg-black">
                            {schedule.name}
                          </h6>
                        </div>
                      </Block>
                    </div>
                  ))}
                </Content>
              </Block>
            </Block>
          </Yoga>
        </Block>
      </Content>
    </div>
  )
}

export default HomeAbout
export const query = graphql`
  query HomeAbout {
    homebg: file(relativePath: { eq: "images/shared/homebg.png" }) {
      childImageSharp {
        fluid(maxWidth: 1920, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`
