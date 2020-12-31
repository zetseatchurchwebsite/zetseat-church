import React from 'react'

import { AboutQuery } from '../../../../../../graphql-types'
import AnotherSection from '../../../../components/another-section/another-section'

type AboutStrategicAreasProps = Exclude<
  Exclude<AboutQuery['aboutPageInfo'], null | undefined>['frontmatter'],
  null | undefined
>['strategicAreas']

const AboutStrategicAreas: React.FC<AboutStrategicAreasProps> = ({
  title,
  description,
}) => {
  return <AnotherSection align="left" title={title} description={description} />
}

export default AboutStrategicAreas
