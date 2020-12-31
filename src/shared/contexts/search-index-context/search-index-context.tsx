import { createContext, useContext } from 'react'
import { Index, SearchConfig } from 'elasticlunr'

import { Scalars } from '../../../../graphql-types'

const SearchIndexContext = createContext<
  Scalars['SiteSearchIndex_Index'] | null
>(null)

export default SearchIndexContext

export const useRawSearchIndex = () => useContext(SearchIndexContext)

export const useSearchIndex = function <T = any>() {
  const rawIndex = useRawSearchIndex()
  return rawIndex === null ? null : Index.load<T>(rawIndex)
}

export const useSearch = function <T = any>(
  query: string,
  userConfig?: SearchConfig<T> & { expand?: boolean }
) {
  const index = useSearchIndex<T>()
  return index
    ?.search(query, userConfig)
    .map(({ ref }) => index.documentStore.getDoc(ref))
}
