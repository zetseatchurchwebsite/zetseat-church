import React from 'react'
import { PageRendererProps } from 'gatsby'

import App from '../app'
import Kids from '../../layout-default/pages/kids/kids'

export default (props: PageRendererProps) => (
  <App pageRendererProps={props}>
    <Kids />
  </App>
)
