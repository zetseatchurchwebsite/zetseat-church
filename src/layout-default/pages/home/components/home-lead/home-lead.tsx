import React from 'react'
import { Parallax } from 'react-parallax'
import { Block, Content } from 'gerami'
import Markdown from 'markdown-to-jsx'
import { FaRegNewspaper } from 'react-icons/fa'

import './home-lead.scss'
import { HomeQuery } from '../../../../../../graphql-types'
import Anchor from '../../../../../shared/components/anchor/anchor'
import useLang from '../../../../../shared/hooks/lang/use-lang'

type HomeLeadProps = Exclude<
  Exclude<HomeQuery['homePageInfo'], null | undefined>['frontmatter'],
  null | undefined
>['lead']

const HomeLead: React.FC<HomeLeadProps> = ({
  bg,
  description,
  btnText,
  btnUrl,
}) => {
  const lang = useLang()
  return (
    <div className="home-lead">
      <Parallax
        bgImage={bg?.childImageSharp?.fluid?.src}
        bgImageSrcSet={bg?.childImageSharp?.fluid?.srcSet}
        strength={200}
      >
        <div className="home-lead-overlay inset-shade-L inset-shade-M inset-shade-S padding-vertical-very-big fg-whitish">
          <Block className="margin-vertical-very-big padding-vertical-very-big">
            <Content
              transparent
              size="3XL"
              className="right margin-vertical-very-big padding-vertical-very-big"
            >
              <Block first last={!(description || (btnText && btnUrl))}>
                <h1 className="h0 fg-accent">{lang`home.lead.title`}</h1>
              </Block>

              <Block last={!(btnText && btnUrl)}>
                <article
                  className="right fg-whitish"
                  style={{ fontFamily: 'inherit' }}
                >
                  <Markdown>{description!}</Markdown>
                </article>
              </Block>

              {!(btnText && btnUrl) ? null : (
                <Block last className="fg-white">
                  <Anchor
                    to={btnUrl}
                    className="gerami-button margin-top-very-big"
                  >
                    <FaRegNewspaper className="margin-right-normal inline-block middle" />
                    <span className="inline-block middle">{btnText}</span>
                  </Anchor>
                </Block>
              )}
            </Content>
          </Block>
        </div>
      </Parallax>
    </div>
  )
}

export default HomeLead
