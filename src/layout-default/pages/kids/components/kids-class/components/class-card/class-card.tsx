import React from 'react'
import { Block, Content } from 'gerami'

type ClassCardProps = {
  classes: {
    classTitle: string
    subject: string
    age: string
  }[]
}
const ClassCard = ({ classes }: ClassCardProps) => {
  return (
    <Block className="middle padding-vertical-none">
      <Block className="padding-vertical-none">
        <Content className="shade-S">
          {classes.map((c, i) => (
            <div key={i}>
              {!(i < classes.length) ? null : (
                <hr
                  className="margin-none margin-bottom-normal"
                  style={{ opacity: 0.42 }}
                />
              )}

              <Block
                last={i >= classes.length - 1}
                className="flex margin-top-big margin-top-small"
              >
                <div className="margin-auto font-XL fg-primary padding-right-very-big padding-right-very-big">
                  {c.classTitle}
                </div>
                <div className="margin-auto" style={{ flex: 1 }}>
                  <h6 className="font-M padding-top-none fg-black">
                    {c.subject}
                  </h6>
                  <div className="font-XS padding-top-none uppercase fg-black">
                    {c.age}
                  </div>
                </div>
              </Block>
            </div>
          ))}
        </Content>
      </Block>
    </Block>
  )
}

export default ClassCard
