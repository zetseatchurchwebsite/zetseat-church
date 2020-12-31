import React from 'react'
import { PageRendererProps } from 'gatsby'

import App from '../app'
import Tags from '../../layout-default/pages/tags/tags'

export default (props: PageRendererProps) => (
  <App pageRendererProps={props}>
    <Tags />
  </App>
)
