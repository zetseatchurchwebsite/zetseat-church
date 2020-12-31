import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { Block, Content } from 'gerami'
import { kebabCase } from 'lodash'

import { TagsQuery } from '../../../../graphql-types'
import SEO from '../../../shared/components/seo/seo'
import Layout from '../../../shared/components/layout/layout'
import Anchor from '../../../shared/components/anchor/anchor'
import useLang from '../../../shared/hooks/lang/use-lang'

type TagsProps = {}

const Tags: React.FC<TagsProps> = () => {
  const { _tags } = useStaticQuery<TagsQuery>(query)
  const tags = _tags.group
  const lang = useLang()

  return (
    <>
      <SEO title="Blog" />

      <Layout>
        <Content transparent size="4XL">
          <Block first last>
            <div>
              <h1 className="h0">{lang`tags.all`}</h1>
            </div>
            <h4 className="subtitle">
              {tags.length} Tag
              {tags.length === 1 ? `` : `s`} Found
            </h4>

            <hr />

            <div className="margin-vertical-big">
              {tags.map((tag, i) => (
                <Anchor
                  key={i}
                  to={`/tags/${kebabCase(tag.fieldValue!)}/`}
                  className="margin-vertical-big margin-right-very-big font-L"
                >
                  {tag.fieldValue!} ({tag.totalCount!})
                </Anchor>
              ))}
            </div>
          </Block>
        </Content>
      </Layout>
    </>
  )
}

export default Tags

export const query = graphql`
  query Tags {
    _tags: allMarkdownRemark {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
