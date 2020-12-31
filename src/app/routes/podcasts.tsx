import React from 'react'
import { PageRendererProps } from 'gatsby'

import App from '../app'
import Podcasts from '../../layout-default/pages/podcasts/podcasts'

export default (props: PageRendererProps) => (
  <App pageRendererProps={props}>
    <Podcasts />
  </App>
)
