import { createContext, useContext } from 'react'

const IsNewContext = createContext<boolean>(false)

export default IsNewContext

export const useIsNew = () => useContext(IsNewContext)
