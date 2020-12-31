import React from 'react'
import { Content } from 'gerami'

import { AboutQuery } from '../../../../../../graphql-types'
import AnotherSection from '../../../../components/another-section/another-section'

type AboutStatementOfFaithProps = Exclude<
  Exclude<AboutQuery['aboutPageInfo'], null | undefined>['frontmatter'],
  null | undefined
>['statementOfFaith']

const AboutStatementOfFaith: React.FC<AboutStatementOfFaithProps> = ({
  title,
  description,
  attachment,
}) => {
  return (
    <div className="bg-whitish">
      <Content size="XXL" className="shade-L" style={{ borderRadius: 0 }}>
        <AnotherSection
          align="left"
          title={title}
          description={description}
          btnText="Download Document"
          btnUrl={attachment?.publicURL}
          btnDownload={true}
          btnAlign="right"
        />
      </Content>
    </div>
  )
}

export default AboutStatementOfFaith
