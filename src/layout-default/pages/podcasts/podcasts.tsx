import React, { useState } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { Block, Content, Flex, FlexSpacer, Input, Yoga } from 'gerami'
import { MdSearch } from 'react-icons/md'

import { PodcastsQuery } from '../../../../graphql-types'
import { useSearch } from '../../../shared/contexts/search-index-context/search-index-context'
import useSearchMatch from '../../../shared/hooks/use-search-match/use-search-match'
import tagMatch from '../../../shared/hooks/tag-match/tag-match'
import SEO from '../../../shared/components/seo/seo'
import Layout from '../../../shared/components/layout/layout'
import PodcastCard from '../../components/podcast-card/podcast-card'
import EmailRegistration from '../../../shared/components/email-registration/email-registration'
import useLang from '../../../shared/hooks/lang/use-lang'

type PodcastsProps = {}

const Podcasts: React.FC<PodcastsProps> = () => {
  const data = useStaticQuery<PodcastsQuery>(query)

  const [term, setTerm] = useState(``)
  const results = (useSearch(term, { expand: true }) || []).filter(
    (result) => result.template === 'podcast'
  )

  const podcastTags = data.podcasts.tags
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const _featuredPodcasts = useSearchMatch(
    data.featuredPodcasts.edges.map((edge) => edge.node),
    term.length ? results : undefined
  )
  const _otherPodcasts = useSearchMatch(
    data.otherPodcasts.edges.map((edge) => edge.node),
    term.length ? results : undefined
  )

  const featuredPodcasts = tagMatch(_featuredPodcasts, selectedTag)
  const otherPodcasts = tagMatch(_otherPodcasts, selectedTag)
  const lang = useLang()
  return (
    <>
      <SEO title="Podcasts" />

      <Layout>
        <Content transparent size="4XL">
          <Block first last>
            <Flex>
              <h1 className="h0">{lang`podcasts.title`}</h1>

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

            <div className="margin-vertical-big">
              <button
                className="gerami-anchor margin-vertical-big margin-right-very-big font-S"
                style={{
                  background: `transparent none`,
                  border: 0,
                  outline: 0,
                  padding: 0,
                  font: `inherit`,
                }}
                onClick={() => setSelectedTag(null)}
              >
                All ({_featuredPodcasts.length + _otherPodcasts.length})
              </button>
              {podcastTags.map(({ fieldValue: tag }, i) => (
                <button
                  key={i}
                  className="gerami-anchor margin-vertical-big margin-right-very-big font-S"
                  style={{
                    background: `transparent none`,
                    border: 0,
                    outline: 0,
                    padding: 0,
                    font: `inherit`,
                  }}
                  onClick={() => setSelectedTag(tag!)}
                >
                  {tag!} (
                  {tagMatch(_featuredPodcasts, tag!).length +
                    tagMatch(_otherPodcasts, tag!).length}
                  )
                </button>
              ))}
            </div>

            {featuredPodcasts.length <= 0 ? null : (
              <>
                <h4 className="subtitle">
                  {lang`podcasts.featured`}
                  {featuredPodcasts.length === 1
                    ? lang`podcasts-single`
                    : lang`podcasts-many`}
                  {term ? (
                    <>
                      {' '}
                      Matching <q>{term}</q>
                    </>
                  ) : null}
                  {selectedTag !== null ? (
                    <>
                      {term ? ' and ' : ' '}
                      Tagged with <q>{selectedTag}</q>
                    </>
                  ) : null}
                </h4>

                <hr />

                <div className="cards-negation">
                  <Yoga maxCol={2} className="margin-bottom-big">
                    {featuredPodcasts.map((node, i) => (
                      <div key={i} className="padding-small">
                        <PodcastCard
                          slug={node?.fields?.slug!}
                          thumbnail={node?.frontmatter?.thumbnail as any}
                          title={node?.frontmatter?.title!}
                          date={node?.frontmatter?.date!}
                          excerpt={node?.excerpt || ``}
                        />
                      </div>
                    ))}
                  </Yoga>
                </div>
              </>
            )}

            <h4 className="subtitle">
              {featuredPodcasts.length > 0
                ? lang`podcasts-other`
                : lang`podcasts-all`}{' '}
              {lang`podcasts-name`}
              {otherPodcasts.length === 1
                ? lang`podcasts-single`
                : lang`podcasts-many`}
              {term ? (
                <>
                  {' '}
                  Matching <q>{term}</q>
                </>
              ) : null}
              {selectedTag !== null ? (
                <>
                  {term ? ' and ' : ' '}
                  Tagged with <q>{selectedTag}</q>
                </>
              ) : null}
            </h4>

            <hr />

            {otherPodcasts.length <= 0 ? (
              <div className="margin-vertical-big">
                {featuredPodcasts.length > 0
                  ? lang`podcasts-no-more-found`
                  : lang`podcasts-no-found`}
              </div>
            ) : (
              <div className="cards-negation">
                <Yoga maxCol={3}>
                  {otherPodcasts.map((node, i) => (
                    <div key={i} className="padding-small">
                      <PodcastCard
                        slug={node?.fields?.slug!}
                        thumbnail={node?.frontmatter?.thumbnail as any}
                        title={node?.frontmatter?.title!}
                        date={node?.frontmatter?.date!}
                        excerpt={node?.excerpt || ``}
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

export default Podcasts

export const query = graphql`
  query Podcasts {
    podcasts: allMarkdownRemark(
      filter: { frontmatter: { template: { eq: "podcast" } } }
      sort: { fields: [frontmatter___date], order: [DESC] }
    ) {
      tags: group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }

    featuredPodcasts: allMarkdownRemark(
      filter: {
        frontmatter: { template: { eq: "podcast" }, isFeatured: { eq: true } }
      }
      sort: { fields: [frontmatter___date], order: [DESC] }
    ) {
      edges {
        node {
          id
          frontmatter {
            thumbnail {
              childImageSharp {
                fluid(maxWidth: 512, quality: 90) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
            title
            date(formatString: "MMMM DD, YYYY")
            tags
          }
          excerpt
          fields {
            slug
          }
        }
      }
    }
    otherPodcasts: allMarkdownRemark(
      filter: {
        frontmatter: { template: { eq: "podcast" }, isFeatured: { ne: true } }
      }
      sort: { fields: [frontmatter___date], order: [DESC] }
    ) {
      edges {
        node {
          id
          frontmatter {
            thumbnail {
              childImageSharp {
                fluid(maxWidth: 512, quality: 90) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
            title
            date(formatString: "MMMM DD, YYYY")
            tags
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
