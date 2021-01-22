import React from 'react'
import { Block, Content } from 'gerami'

type MISSION_PROPS = {
  title: string
  description: string
}
const YouthMission = ({ description, title }: MISSION_PROPS) => {
  return (
    <Block last>
      <Content transparent size="XL" className="right">
        <Block first>
          <h1 className="padding-top-normal fg-black">{title}</h1>
        </Block>
        <Block last className="font-L">
          {description}
        </Block>
      </Content>
    </Block>
  )
}
export default YouthMission
