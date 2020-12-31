import React from 'react'

import PreHeader from './components/pre-header/pre-header'
import Header from './components/header/header'
import Footer from './components/footer/footer'

type LayoutProps = React.PropsWithChildren<{
  transparentHeader?: boolean
}>

const Layout: React.FC<LayoutProps> = ({ children, transparentHeader }) => {
  return (
    <>
      <PreHeader />

      <Header transparentHeader={transparentHeader} />

      <main
        className="margin-none padding-none"
        style={{ minHeight: 'calc(100vh - (56px + 2 * 8px))' }}
      >
        {children}
      </main>

      <Footer />
    </>
  )
}

export default Layout
