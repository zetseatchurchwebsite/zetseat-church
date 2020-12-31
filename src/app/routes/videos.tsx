import React from 'react'
import { PageRendererProps } from 'gatsby'

import App from '../app'
import Videos from '../../layout-default/pages/videos/videos'

export default (props: PageRendererProps) => (
  <App pageRendererProps={props}>
    <Videos />
  </App>
)
