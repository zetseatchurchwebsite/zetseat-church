import React, { useState } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { Block, Content, Flex, FlexSpacer, Input, Yoga } from 'gerami'
import { MdSearch } from 'react-icons/md'

import { VideosQuery } from '../../../../graphql-types'
import { useSearch } from '../../../shared/contexts/search-index-context/search-index-context'
import useSearchMatch from '../../../shared/hooks/use-search-match/use-search-match'
import SEO from '../../../shared/components/seo/seo'
import Layout from '../../../shared/components/layout/layout'
import VideoSeriesCard from '../../components/video-series-card/video-series-card'
import EmailRegistration from '../../../shared/components/email-registration/email-registration'
import useLang from '../../../shared/hooks/lang/use-lang'
import './videos.scss'

type VideosProps = {}

const Videos: React.FC<VideosProps> = () => {
  const data = useStaticQuery<VideosQuery>(query)
  const lang = useLang()
  const [term, setTerm] = useState(``)
  const results = (useSearch(term, { expand: true }) || []).filter(
    (result) => result.template === 'video-series'
  )

  const featuredVideos = useSearchMatch(
    data.featuredVideos.edges.map((edge) => edge.node),
    term.length ? results : undefined
  )
  const otherVideos = useSearchMatch(
    data.otherVideos.edges.map((edge) => edge.node),
    term.length ? results : undefined
  )
  console.log('data')
  return (
    <>
      <SEO title="Videos" />

      <Layout>
        <Content>
          <Block className="image-box">
            <Flex>
              <div>
                <h1 className="h0 fg-whitish">{lang`videos.title`}</h1>
              </div>
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
                <MdSearch className="search-icon bg-whitish" />
              </div>
            </Flex>
          </Block>
        </Content>

        <Content transparent size="4XL">
          <Block first last>
            {/* <Flex>
              <h1 className="h0">Zetseat TV</h1>

              <FlexSpacer />

              <div
                className="margin-left-very-big padding-top-big full-width"
                style={{ maxWidth: 420 }}
              >
                <Input
                  type="search"
                  value={term}
                  onChange={e => setTerm(e.target.value)}
                  placeholder="Search"
                  className="middle full-width"
                />
                <MdSearch className="search-icon" />
              </div>
            </Flex>*/}

            {featuredVideos.length <= 0 ? null : (
              <>
                <h4 className="subtitle">
                  {lang`videos.featured`}
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
                    {featuredVideos.map((node, i) => (
                      <div key={i} className="padding-small">
                        <VideoSeriesCard
                          slug={node?.fields?.slug!}
                          thumbnail={node?.frontmatter?.thumbnail as any}
                          title={node?.frontmatter?.title!}
                          numberOfEpisodes={
                            node.frontmatter?.episodes?.length || 0
                          }
                          excerpt={node?.excerpt || ``}
                        />
                      </div>
                    ))}
                  </Yoga>
                </div>
              </>
            )}

            <h4 className="subtitle">
              {featuredVideos.length > 0
                ? lang`videos-other`
                : lang`videos-all`}{' '}
              {lang`videos-name`}
              {term ? (
                <>
                  {' '}
                  Matching <q>{term}</q>
                </>
              ) : null}
            </h4>

            <hr />

            {otherVideos.length <= 0 ? (
              <div className="margin-vertical-big">
                {featuredVideos.length > 0
                  ? lang`videos-no-more-found`
                  : lang`videos-no-found`}
              </div>
            ) : (
              <div className="cards-negation">
                <Yoga maxCol={3}>
                  {otherVideos.map((node, i) => (
                    <div key={i} className="padding-small">
                      <VideoSeriesCard
                        slug={node?.fields?.slug!}
                        thumbnail={node?.frontmatter?.thumbnail as any}
                        title={node?.frontmatter?.title!}
                        numberOfEpisodes={
                          node.frontmatter?.episodes?.length || 0
                        }
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

export default Videos

export const query = graphql`
  query Videos {
    featuredVideos: allMarkdownRemark(
      filter: {
        frontmatter: {
          template: { eq: "video-series" }
          isFeatured: { eq: true }
        }
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
            episodes
          }
          excerpt
          fields {
            slug
          }
        }
      }
    }
    otherVideos: allMarkdownRemark(
      filter: {
        frontmatter: {
          template: { eq: "video-series" }
          isFeatured: { ne: true }
        }
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
            episodes
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
