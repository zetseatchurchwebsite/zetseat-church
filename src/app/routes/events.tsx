import React from 'react'
import { PageRendererProps } from 'gatsby'

import App from '../app'
import Events from '../../layout-default/pages/events/events'

export default (props: PageRendererProps) => (
  <App pageRendererProps={props}>
    <Events />
  </App>
)
