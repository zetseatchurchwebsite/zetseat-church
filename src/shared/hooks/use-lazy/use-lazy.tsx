import React, { useEffect, useState } from 'react'

const useLazy = function <T>(
  initialValue: T,
  effectCallback: (
    setState: React.Dispatch<React.SetStateAction<T>>,
    state: T,
    isInitial: boolean
  ) => void | (() => void | undefined) = () => () => {},
  deps: React.DependencyList = []
): [T, React.Dispatch<React.SetStateAction<T>>, boolean] {
  const [loading, setLoading] = useState(true)
  const [state, setState] = useState(initialValue)

  /* eslint-disable */
  useEffect(() => {
    const unsubscribe = effectCallback(setState, state, loading)
    setLoading(false)
    return unsubscribe
  }, [effectCallback].concat(deps))
  /* eslint-enable */

  return [state, setState, loading]
}

export default useLazy
