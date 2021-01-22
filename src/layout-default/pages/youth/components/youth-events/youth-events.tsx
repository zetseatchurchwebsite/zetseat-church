import React from 'react'
import { Block, Content, Yoga } from 'gerami'
import Markdown from 'markdown-to-jsx'
import useLang from '../../../../../shared/hooks/lang/use-lang'

import Anchor from '../../../../../shared/components/anchor/anchor'

type YouthEventsProps = {
  events: {
    title: string
    description: string
    btnText: string
    btnUrl: string
  }[]
}

const YouthEvents: React.FC<YouthEventsProps> = ({ events }) => {
  const lang = useLang()
  return (
    <div className="bg-whitish">
      <Content transparent size="8XL" className="padding-vertical-very-big">
        <Block first>
          <h1 className="center fg-black">{lang`youth.event.title`}</h1>
        </Block>

        <Block last>
          <Yoga maxCol={3} className="center">
            {events.map((e, i) => (
              <Content key={i}>
                <h3>
                  <Block>{e.title}</Block>
                  <hr style={{ opacity: 0.42 }} />
                  <Block className="subtitle font-M padding-bottom-none">
                    <Markdown>{e.description!}</Markdown>
                  </Block>
                </h3>
                {/* {!(e.btnText && e.btnText) ? null : (
                  <Block last className="padding-top-none">
                    <Anchor
                      to={e.btnUrl}
                      className="gerami-button gerami-button-primary margin-top-very-big"
                    >
                      <span className="inline-block middle">{e.btnText}</span>
                    </Anchor>
                  </Block>
                )} */}
              </Content>
            ))}
          </Yoga>
        </Block>
      </Content>
    </div>
  )
}

export default YouthEvents
