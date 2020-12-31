import React, { useState } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { Block, Content, Flex, FlexSpacer, Input, Yoga } from 'gerami'
import { MdSearch } from 'react-icons/md'

import { EventsQuery } from '../../../../graphql-types'
import { useSearch } from '../../../shared/contexts/search-index-context/search-index-context'
import useSearchMatch from '../../../shared/hooks/use-search-match/use-search-match'
import SEO from '../../../shared/components/seo/seo'
import Layout from '../../../shared/components/layout/layout'
import EventCard from '../../components/event-card/event-card'
import EmailRegistration from '../../../shared/components/email-registration/email-registration'
import useLang from '../../../shared/hooks/lang/use-lang'

type EventsProps = {}

const Events: React.FC<EventsProps> = () => {
  const data = useStaticQuery<EventsQuery>(query)

  const [term, setTerm] = useState(``)
  const results = (useSearch(term, { expand: true }) || []).filter(
    (result) => result.template === 'event'
  )

  const featuredEvents = useSearchMatch(
    data.featuredEvents.edges.map((edge) => edge.node),
    term.length ? results : undefined
  )
  const otherEvents = useSearchMatch(
    data.otherEvents.edges.map((edge) => edge.node),
    term.length ? results : undefined
  )

  const lang = useLang()

  return (
    <>
      <SEO title="Events" />

      <Layout>
        <Content transparent size="4XL">
          <Block first last>
            <Flex>
              <h1 className="h0">{lang`events.title`}</h1>

              <FlexSpacer />

              <div
                className="margin-left-very-big padding-top-big full-width"
                style={{ maxWidth: 420 }}
              >
                <Input
                  type="search"
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                  placeholder={lang`search-field.placeholder`}
                  className="middle full-width"
                />
                <MdSearch className="search-icon" />
              </div>
            </Flex>

            {featuredEvents.length <= 0 ? null : (
              <>
                <h4 className="subtitle">
                  {lang`events.featured`}
                  {featuredEvents.length === 1
                    ? lang`events-single`
                    : lang`events-many`}
                  {term ? (
                    <>
                      {' '}
                      Matching <q>{term}</q>
                    </>
                  ) : null}
                </h4>

                <hr />

                <div className="cards-negation">
                  <Yoga maxCol={2} className="margin-bottom-big">
                    {featuredEvents.map((node, i) => (
                      <div key={i} className="padding-small">
                        <EventCard
                          slug={node?.fields?.slug!}
                          title={node?.frontmatter?.title!}
                          happensOn={node?.frontmatter?.happensOn!}
                          location={node?.frontmatter?.location!}
                          excerpt={node?.excerpt}
                        />
                      </div>
                    ))}
                  </Yoga>
                </div>
              </>
            )}

            <h4 className="subtitle">
              {featuredEvents.length > 0
                ? lang`events-other`
                : lang` events-all`}
              {lang`events-name`}
              {otherEvents.length === 1
                ? lang`events-single`
                : lang`events-many`}
              {term ? (
                <>
                  {' '}
                  Matching <q>{term}</q>
                </>
              ) : null}
            </h4>

            <hr />

            {otherEvents.length <= 0 ? (
              <div className="margin-vertical-big">
                {featuredEvents.length > 0
                  ? lang`events-no-more-found`
                  : lang`events-no-found`}
              </div>
            ) : (
              <div className="cards-negation">
                <Yoga maxCol={3}>
                  {otherEvents.map((node, i) => (
                    <div key={i} className="padding-small">
                      <EventCard
                        slug={node?.fields?.slug!}
                        title={node?.frontmatter?.title!}
                        happensOn={node?.frontmatter?.happensOn!}
                        location={node?.frontmatter?.location!}
                        excerpt={node?.excerpt}
                      />
                    </div>
                  ))}
                </Yoga>
              </div>
            )}
          </Block>
        </Content>

        <EmailRegistration />
      </Layout>
    </>
  )
}

export default Events

export const query = graphql`
  query Events {
    featuredEvents: allMarkdownRemark(
      filter: {
        frontmatter: { template: { eq: "event" }, isFeatured: { eq: true } }
      }
      sort: { fields: [frontmatter___title], order: [ASC] }
    ) {
      edges {
        node {
          id
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

    otherEvents: allMarkdownRemark(
      filter: {
        frontmatter: { template: { eq: "event" }, isFeatured: { ne: true } }
      }
      sort: { fields: [frontmatter___title], order: [ASC] }
    ) {
      edges {
        node {
          id
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
  }
`
