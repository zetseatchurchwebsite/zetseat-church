import React from 'react'

import { AboutQuery } from '../../../../../../graphql-types'
import AnotherSection from '../../../../components/another-section/another-section'

type AboutHistoryProps = Exclude<
  Exclude<AboutQuery['aboutPageInfo'], null | undefined>['frontmatter'],
  null | undefined
>['history']

const AboutHistory: React.FC<AboutHistoryProps> = ({ title, description }) => {
  return <AnotherSection align="left" title={title} description={description} />
}

export default AboutHistory
