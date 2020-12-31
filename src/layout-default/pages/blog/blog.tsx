import React, { useState } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { Block, Content, Flex, FlexSpacer, Input, Yoga } from 'gerami'
import { MdSearch } from 'react-icons/md'

import { BlogQuery } from '../../../../graphql-types'
import { useSearch } from '../../../shared/contexts/search-index-context/search-index-context'
import useSearchMatch from '../../../shared/hooks/use-search-match/use-search-match'
import tagMatch from '../../../shared/hooks/tag-match/tag-match'
import SEO from '../../../shared/components/seo/seo'
import Layout from '../../../shared/components/layout/layout'
import BlogPostCard from '../../components/blog-post-card/blog-post-card'
import EmailRegistration from '../../../shared/components/email-registration/email-registration'
import useLang from '../../../shared/hooks/lang/use-lang'

type BlogProps = {}

const Blog: React.FC<BlogProps> = () => {
  const data = useStaticQuery<BlogQuery>(query)

  const [term, setTerm] = useState(``)
  const results = (useSearch(term, { expand: true }) || []).filter(
    (result) => result.template === 'blog-post'
  )

  const blogTags = data.blog.tags
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const _featuredBlog = useSearchMatch(
    data.featuredBlog.edges.map((edge) => edge.node),
    term.length ? results : undefined
  )
  const _otherBlog = useSearchMatch(
    data.otherBlog.edges.map((edge) => edge.node),
    term.length ? results : undefined
  )

  const featuredBlog = tagMatch(_featuredBlog, selectedTag)
  const otherBlog = tagMatch(_otherBlog, selectedTag)
  const lang = useLang()

  return (
    <>
      <SEO title="Blog" />

      <Layout>
        <Content transparent size="4XL">
          <Block first last>
            <Flex>
              <h1 className="h0">{lang`blog.title`}</h1>

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
                All ({_featuredBlog.length + _otherBlog.length})
              </button>
              {blogTags.map(({ fieldValue: tag }, i) => (
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
                  {tagMatch(_featuredBlog, tag!).length +
                    tagMatch(_otherBlog, tag!).length}
                  )
                </button>
              ))}
            </div>

            {featuredBlog.length <= 0 ? null : (
              <>
                <h4 className="subtitle">
                  {lang`blog.featured`}
                  {featuredBlog.length === 1
                    ? lang`blog-single`
                    : lang`blog-many`}
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
                    {featuredBlog.map((node, i) => (
                      <div key={i} className="padding-small">
                        <BlogPostCard
                          slug={node.fields?.slug!}
                          thumbnail={node.frontmatter?.thumbnail as any}
                          title={node.frontmatter?.title!}
                          date={node.frontmatter?.date!}
                          excerpt={node.excerpt}
                        />
                      </div>
                    ))}
                  </Yoga>
                </div>
              </>
            )}

            <h4 className="subtitle">
              {featuredBlog.length > 0 ? lang`blog-other` : lang`blog-all`}{' '}
              {lang`blog-name`}
              {otherBlog.length === 1 ? lang`blog-single` : lang`blog-many`}
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

            {otherBlog.length <= 0 ? (
              <div className="margin-vertical-big">
                {featuredBlog.length > 0
                  ? lang`blog-no-more-found`
                  : lang`blog-blog-found`}
              </div>
            ) : (
              <div className="cards-negation">
                <Yoga maxCol={3}>
                  {otherBlog.map((node, i) => (
                    <div key={i} className="padding-small">
                      <BlogPostCard
                        slug={node.fields?.slug!}
                        thumbnail={node.frontmatter?.thumbnail as any}
                        title={node.frontmatter?.title!}
                        date={node.frontmatter?.date!}
                        excerpt={node.excerpt}
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

export default Blog

export const query = graphql`
  query Blog {
    blog: allMarkdownRemark(
      filter: { frontmatter: { template: { eq: "blog-post" } } }
      sort: { fields: [frontmatter___date], order: [DESC] }
    ) {
      tags: group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }

    featuredBlog: allMarkdownRemark(
      filter: {
        frontmatter: { template: { eq: "blog-post" }, isFeatured: { eq: true } }
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
    otherBlog: allMarkdownRemark(
      filter: {
        frontmatter: { template: { eq: "blog-post" }, isFeatured: { ne: true } }
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
