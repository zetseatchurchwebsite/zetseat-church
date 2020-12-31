import React, { useMemo } from 'react'
import { graphql, PageRendererProps } from 'gatsby'
import { Block, Content, Flex, FlexSpacer, Yoga } from 'gerami'

import { TagQuery } from '../../../graphql-types'
import App from '../app'
import SEO from '../../shared/components/seo/seo'
import Layout from '../../shared/components/layout/layout'
import BlogPostCard from '../../layout-default/components/blog-post-card/blog-post-card'
import PodcastCard from '../../layout-default/components/podcast-card/podcast-card'
import Anchor from '../../shared/components/anchor/anchor'

type TagProps = PageRendererProps & {
  data: TagQuery
  pageContext: {
    tag: string
  }
}

const Tag: React.FC<TagProps> = ({ location, data, pageContext }) => {
  const posts = useMemo(() => data.posts.edges.map((edge) => edge.node), [data])

  const tag = pageContext.tag

  return (
    <App pageRendererProps={{ location }}>
      <SEO title={`${tag} | Tags`} />

      <Layout>
        <Content transparent size="4XL">
          <Block first last>
            <Flex>
              <h1 className="h0">
                Tag: <q>{tag}</q>
              </h1>

              <FlexSpacer />

              <Anchor
                to="/tags"
                className="margin-left-very-big margin-top-very-big padding-top-big"
              >
                Browse All Tags
              </Anchor>
            </Flex>

            <div>
              <h4 className="subtitle">
                {posts.length} Post{posts.length === 1 ? `` : `s`} Tagged with{' '}
                <q>{tag}</q>
              </h4>

              <hr />

              <Yoga maxCol={3} className="margin-bottom-big">
                {posts.map((node, i) => {
                  const Card =
                    node.frontmatter?.template === `blog-post`
                      ? BlogPostCard
                      : node.frontmatter?.template === `podcast`
                      ? PodcastCard
                      : null
                  return !Card ? null : (
                    <Card
                      key={i}
                      slug={node.fields?.slug!}
                      thumbnail={node.frontmatter?.thumbnail as any}
                      title={node.frontmatter?.title!}
                      date={node.frontmatter?.date!}
                      excerpt={node.excerpt}
                    />
                  )
                })}
              </Yoga>
            </div>
          </Block>
        </Content>
      </Layout>
    </App>
  )
}

export default Tag

export const query = graphql`
  query Tag($tag: String) {
    posts: allMarkdownRemark(
      filter: {
        frontmatter: {
          template: { regex: "/^(blog-post|podcast)$/" }
          tags: { in: [$tag] }
        }
      }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      totalCount
      edges {
        node {
          frontmatter {
            template
            thumbnail {
              childImageSharp {
                fluid(maxWidth: 512, quality: 90) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
            title
            date(formatString: "MMMM DD, YYYY")
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
