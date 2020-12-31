import React from 'react'

import { YouthQuery } from '../../../../../../graphql-types'
import AnotherSection from '../../../../components/another-section/another-section'

type YouthLeadProps = Exclude<
  Exclude<YouthQuery['youthPageInfo'], null | undefined>['frontmatter'],
  null | undefined
>['lead']

const YouthLead: React.FC<YouthLeadProps> = ({ bg, title, description }) => {
  return (
    <AnotherSection
      bg={bg as any}
      align="right"
      title={title}
      description={description}
    />
  )
}

export default YouthLead
