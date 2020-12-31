import { useMemo } from 'react'

type WithIdType<T> = { id?: string | null } & T

const useSearchMatch = function <T = any>(
  all: WithIdType<T>[],
  ids?: WithIdType<any>[]
): T[] {
  return useMemo(
    () =>
      !ids ? all : all.filter((item) => !!ids.find(({ id }) => item.id === id)),
    [all, ids]
  )
}

export default useSearchMatch
