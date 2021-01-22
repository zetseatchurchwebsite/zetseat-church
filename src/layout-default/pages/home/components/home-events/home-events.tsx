import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { Block, Content, Yoga } from 'gerami'
import { IoMdCalendar } from 'react-icons/io'
import moment from 'moment'

import './home-events.scss'
import { HomeQuery, HomeEventsQuery } from '../../../../../../graphql-types'
import Anchor from '../../../../../shared/components/anchor/anchor'
import useLang from '../../../../../shared/hooks/lang/use-lang'

type HomeEventsProps = Exclude<
  Exclude<HomeQuery['homePageInfo'], null | undefined>['frontmatter'],
  null | undefined
>['events']

const HomeEvents: React.FC<HomeEventsProps> = ({ maxList }) => {
  const data = useStaticQuery<HomeEventsQuery>(query)

  const events = data?.featuredEvents.nodes.slice(0, maxList || 3)
  const lang = useLang()
  return (
    <div className="bg-whitish">
      <Content
        transparent
        size="4XL"
        className="padding-vertical-very-big"
        style={{ borderRadius: 0 }}
      >
        <Content
          transparent
          size="3XL"
          className="padding-vertical-very-big center"
        >
          <Block first>
            <h1 className="padding-top-none fg-black">{lang`home.events.title`}</h1>
          </Block>
          <Block>
            <hr />
          </Block>
          <Block last>
            {!events.length ? (
              <div className="fg-black">No featured events found.</div>
            ) : (
              events.map(({ frontmatter, excerpt, fields }, i) => (
                <Yoga key={i} maxCol={2}>
                  <div
                    className="middle home-events-event-date fg-black bold"
                    style={{ textTransform: 'uppercase' }}
                  >
                    {moment(new Date(frontmatter?.happensOn!)).format(
                      'MMMM D, YYYY'
                    )}
                  </div>

                  <h4 className="middle home-events-event-content">
                    <Anchor to={fields?.slug!}>
                      {frontmatter?.title!}
                      <span className="subtitle font-L">
                        <span
                          className="inline-block padding-horizontal-normal"
                          style={{ opacity: 0.7 }}
                        >
                          @
                        </span>
                        {frontmatter?.location!}
                      </span>
                    </Anchor>
                    <div className="subtitle font-S">{excerpt}</div>
                  </h4>
                </Yoga>
              ))
            )}
          </Block>
          <Block first last>
            <Anchor
              to="/events"
              className="gerami-button gerami-button-primary"
            >
              <IoMdCalendar className="margin-right-big inline-block middle" />
              <span className="inline-block middle">{lang`home.events.btn`}</span>
            </Anchor>
          </Block>
        </Content>
      </Content>
    </div>
  )
}

export default HomeEvents

const query = graphql`
  query HomeEvents {
    featuredEvents: allMarkdownRemark(
      filter: {
        frontmatter: { template: { eq: "event" }, isFeatured: { eq: true } }
      }
      sort: { fields: [frontmatter___title], order: [ASC] }
    ) {
      nodes {
        frontmatter {
          title
          happensOn
          location
        }
        excerpt
        fields {
          slug
        }
      }
    }
  }
`
