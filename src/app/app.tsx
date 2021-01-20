import React from 'react'
import { graphql, PageRendererProps, useStaticQuery } from 'gatsby'

import './styles/index.scss'
import useLazy from '../shared/hooks/use-lazy/use-lazy'
import IsNewContext from '../shared/contexts/is-new-context/is-new-context'
import PageContext from '../shared/contexts/page-context/page-context'
import SearchIndexContext from '../shared/contexts/search-index-context/search-index-context'
import { AppQuery } from '../../graphql-types'

type AppProps = React.PropsWithChildren<{
  pageRendererProps: PageRendererProps
}>

const IS_NEW_KEY = `IS_NEW`

const App: React.FC<AppProps> = ({ children, pageRendererProps }) => {
  const [isNew] = useLazy(false, (setIsNew) => {
    if (!window.localStorage.getItem(IS_NEW_KEY)) setIsNew(true)
    window.localStorage.setItem(IS_NEW_KEY, 'true')
  })

  const data = useStaticQuery<AppQuery>(query)

  return (
    <IsNewContext.Provider value={isNew}>
      <PageContext.Provider value={pageRendererProps}>
        <SearchIndexContext.Provider
          value={data.siteSearchIndex?.index || null}
        >
          {children}
        </SearchIndexContext.Provider>
      </PageContext.Provider>
    </IsNewContext.Provider>
  )
}

export default App

const query = graphql`
  query App {
    siteSearchIndex {
      index
    }

    # PRE-CACHE FOR gatbsy-plugin-feed IN gatsby-config.js
    logo: file(relativePath: { eq: "images/shared/logoEng.png" }) {
      childImageSharp {
        fixed(width: 3000, height: 3000, cropFocus: CENTER, quality: 90) {
          src
        }
      }
    }
    allPodcasts: allMarkdownRemark(
      filter: { frontmatter: { template: { eq: "podcast" } } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          frontmatter {
            thumbnail {
              childImageSharp {
                fixed(
                  width: 3000
                  height: 3000
                  cropFocus: CENTER
                  quality: 90
                ) {
                  src
                }
              }
            }
          }
        }
      }
    }
  }
`
