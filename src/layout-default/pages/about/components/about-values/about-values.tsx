import React from 'react'
import { Block, Content, Yoga } from 'gerami'

import { AboutQuery } from '../../../../../../graphql-types'
import useLang from '../../../../../shared/hooks/lang/use-lang'

type AboutValuesProps = Exclude<
  Exclude<AboutQuery['aboutPageInfo'], null | undefined>['frontmatter'],
  null | undefined
>['values']

const AboutValues: React.FC<AboutValuesProps> = () => {
  const lang = useLang()
  return (
    <div className="bg-whitish padding-vertical-very-big">
      <Block first>
        <Content transparent size="XL" className="left">
          <Block first>
            <h1 className="padding-top-normal fg-blackish">{lang`about.vision.title`}</h1>
          </Block>
          <Block last className="font-L">
            {lang`about.vision.description`}
          </Block>
        </Content>
      </Block>

      <Block>
        <Content transparent size="XL" className="right">
          <Block first>
            <h1 className="padding-top-normal fg-blackish">{lang`about.mission.title`}</h1>
          </Block>
          <Block last className="font-L">
            {lang`about.mission.description`}
          </Block>
        </Content>
      </Block>

      <Block last>
        <Block first>
          <h1 className="padding-top-normal fg-blackish">{lang`about.core.title`}</h1>
        </Block>
        <Content transparent size="3XL">
          <Yoga maxCol={5} className="margin-vertical-none center">
            <Content style={{ height: '210px' }}>
              <Block last className="fg-blackish">
                <div
                  className="font-X7L fg-blackish right padding-bottom-small"
                  style={{ opacity: 0.14 }}
                >
                  1
                </div>
                {lang`about.vision-1`}
              </Block>
            </Content>

            <Content style={{ height: '210px' }}>
              <Block last className="fg-blackish">
                <div
                  className="font-X7L fg-blackish right padding-bottom-small"
                  style={{ opacity: 0.14 }}
                >
                  2
                </div>
                {lang`about.vision-2`}
              </Block>
            </Content>

            <Content style={{ height: '210px' }}>
              <Block last className="fg-blackish">
                <div
                  className="font-X7L fg-blackish right padding-bottom-small"
                  style={{ opacity: 0.14 }}
                >
                  3
                </div>
                {lang`about.vision-3`}
              </Block>
            </Content>

            <Content style={{ height: '210px' }}>
              <Block last className="fg-blackish">
                <div
                  className="font-X7L fg-blackish right padding-bottom-small"
                  style={{ opacity: 0.14 }}
                >
                  4
                </div>
                {lang`about.vision-4`}
              </Block>
            </Content>

            <Content style={{ height: '210px' }}>
              <Block last className="fg-blackish">
                <div
                  className="font-X7L fg-blackish right padding-bottom-small"
                  style={{ opacity: 0.14 }}
                >
                  5
                </div>
                {lang`about.vision-5`}
              </Block>
            </Content>
          </Yoga>
        </Content>
      </Block>
    </div>
  )
}

export default AboutValues
