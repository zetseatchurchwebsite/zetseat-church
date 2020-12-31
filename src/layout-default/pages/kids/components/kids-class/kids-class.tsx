import React from 'react'
import { Block, Content } from 'gerami'
import ClassCard from './components/class-card/class-card'
import useLang from '../../../../../shared/hooks/lang/use-lang'

const KidsClass = () => {
  const lang = useLang()
  return (
    <div className="">
      <Content
        transparent
        size="8XL"
        className="margin-vertical-very-big padding-vertical-very-big"
      >
        <Block first last>
          <h1 className="center fg-blackish">{lang`kids.class.title`}</h1>
        </Block>
        <Content size={'L'} transparent>
          <Block>
            <ClassCard
              classes={[
                {
                  classTitle: lang`kids.class-1`,
                  subject: lang`kids.class-1.title`,
                  age: lang`kids.class-1.age`,
                },
                {
                  classTitle: lang`kids.class-2`,
                  subject: lang`kids.class-2.title`,
                  age: lang`kids.class-2.age`,
                },
                {
                  classTitle: lang`kids.class-3`,
                  subject: lang`kids.class-3.title`,
                  age: lang`kids.class-3.age`,
                },
                {
                  classTitle: lang`kids.class-4`,
                  subject: lang`kids.class-4.title`,
                  age: lang`kids.class-4.age`,
                },
                {
                  classTitle: lang`kids.class-5`,
                  subject: lang`kids.class-5.title`,
                  age: lang`kids.class-5.age`,
                },
              ]}
            />
          </Block>
        </Content>
      </Content>
    </div>
  )
}

export default KidsClass
