import React from 'react'
import { PageRendererProps } from 'gatsby'

import App from '../app'
import Blog from '../../layout-default/pages/blog/blog'

export default (props: PageRendererProps) => (
  <App pageRendererProps={props}>
    <Blog />
  </App>
)
