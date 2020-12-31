import React from 'react'

import { AboutQuery } from '../../../../../../graphql-types'
import AnotherSection from '../../../../components/another-section/another-section'

type AboutLeadProps = Exclude<
  Exclude<AboutQuery['aboutPageInfo'], null | undefined>['frontmatter'],
  null | undefined
>['lead']

const AboutLead: React.FC<AboutLeadProps> = ({ bg, title, description }) => {
  return (
    <AnotherSection
      bg={bg as any}
      align="right"
      title={title}
      description={description}
    />
  )
}

export default AboutLead
