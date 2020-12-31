import React from 'react'
import { Block, Content, Yoga } from 'gerami'

import Markdown from 'markdown-to-jsx'

type KidsPurposeProps = {
  purposeTitle: string
  purposeDescription: string
  passionTitle: string
  passionDescription: string
}

const KidsPurpose: React.FC<KidsPurposeProps> = ({
  purposeTitle,
  purposeDescription,
  passionTitle,
  passionDescription,
}) => {
  return (
    <div>
      <Content
        transparent
        size="4XL"
        className="margin-vertical-very-big padding-vertical-very-big"
      >
        <Block first last>
          <Yoga maxCol={3} className="center">
            <Content className="center">
              <h3>
                <Block>{purposeTitle}</Block>
                <hr style={{ opacity: 0.42 }} />
                <Block last className="subtitle font-M">
                  <Markdown>{purposeDescription!}</Markdown>
                </Block>
              </h3>
            </Content>

            <Content className="center">
              <h3>
                <Block>{passionTitle}</Block>
                <hr style={{ opacity: 0.42 }} />
                <Block last className="subtitle font-M">
                  <Markdown>{passionDescription!}</Markdown>
                </Block>
              </h3>
            </Content>
          </Yoga>
        </Block>
      </Content>
    </div>
  )
}

export default KidsPurpose
