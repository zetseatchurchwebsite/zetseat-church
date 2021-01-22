import React from 'react'
import { Block, Content, Yoga } from 'gerami'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { IoMdTv } from 'react-icons/io'
import Markdown from 'markdown-to-jsx'

import './home-foreign-links.scss'
import { HomeQuery } from '../../../../../../graphql-types'
import Anchor from '../../../../../shared/components/anchor/anchor'

type HomeShopProps = Exclude<
  Exclude<HomeQuery['homePageInfo'], null | undefined>['frontmatter'],
  null | undefined
>['foreignLinks']

const HomeForeignLinks: React.FC<HomeShopProps> = ({
  shopTitle,
  shopDescription,
  shopBtnText,
  shopBtnUrl,
  liveTvTitle,
  liveTvDescription,
  liveTvBtnText,
  liveTvBtnUrl,
}) => {
  return (
    <div className="home-foreign-links padding-vertical-very-big bg-whitish">
      <Content transparent size="3XL" className="padding-vertical-very-big">
        <Block>
          <Yoga maxCol={2}>
            <div className="padding-big">
              <Content className="home-foreign-links-content">
                <Block first>
                  <AiOutlineShoppingCart className="home-foreign-links-icon" />
                </Block>
                <Block>
                  <h2 className="home-foreign-links-title fg-black">
                    {shopTitle!}
                  </h2>
                </Block>
                <Block>
                  <article className="home-foreign-links-description font-S">
                    <Markdown>{shopDescription!}</Markdown>
                  </article>
                </Block>
                <Block first last>
                  <Anchor
                    to={shopBtnUrl!}
                    className="home-foreign-links-button gerami-button gerami-button-primary"
                    target="_blank"
                    rel="noopener nofollow"
                  >
                    {shopBtnText!}
                  </Anchor>
                </Block>
              </Content>
            </div>

            <div className="padding-big">
              <Content className="home-foreign-links-content">
                <Block first>
                  <IoMdTv className="home-foreign-links-icon" />
                </Block>
                <Block>
                  <h2 className="home-foreign-links-title fg-black">
                    {liveTvTitle!}
                  </h2>
                </Block>
                <Block>
                  <article className="home-foreign-links-description font-S">
                    <Markdown>{liveTvDescription!}</Markdown>
                  </article>
                </Block>
                <Block first last>
                  <Anchor
                    to={liveTvBtnUrl!}
                    className="home-foreign-links-button gerami-button gerami-button-primary"
                    target="_blank"
                    rel="noopener nofollow"
                  >
                    {liveTvBtnText!}
                  </Anchor>
                </Block>
              </Content>
            </div>
          </Yoga>
        </Block>
      </Content>
    </div>
  )
}

export default HomeForeignLinks
