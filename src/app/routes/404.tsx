import React from 'react'
import { PageRendererProps } from 'gatsby'

import App from '../app'
import Four04 from '../../layout-default/pages/404/404'

export default (props: PageRendererProps) => (
  <App pageRendererProps={props}>
    <Four04 />
  </App>
)
