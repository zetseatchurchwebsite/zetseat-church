import React from 'react'
import { PageRendererProps } from 'gatsby'

import App from '../app'
import Youth from '../../layout-default/pages/youth/youth'

export default (props: PageRendererProps) => (
  <App pageRendererProps={props}>
    <Youth />
  </App>
)
