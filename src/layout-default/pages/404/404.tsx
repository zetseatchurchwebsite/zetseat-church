import React from 'react'
import { Block, Content } from 'gerami'

import Layout from '../../../shared/components/layout/layout'
import SEO from '../../../shared/components/seo/seo'
import Anchor from '../../../shared/components/anchor/anchor'
import useLang from '../../../shared/hooks/lang/use-lang'

type Four04Props = {}

const Four04: React.FC<Four04Props> = () => {
  const lang = useLang()

  return (
    <>
      <SEO title="Not found (404)" />

      <Layout>
        <Content
          transparent
          size="XL"
          className="center padding-vertical-very-big"
        >
          <Block first>
            <h1
              className="margin-top-very-big padding-top-very-big"
              style={{ fontSize: `5.6rem` }}
            >
              <span role="img" aria-label="Oops!">
                😕
              </span>
            </h1>
            <h1 className="padding-none">{lang`page-not-found.title`}</h1>
          </Block>
          <Block>
            <p className="margin-none padding-none">
              {lang`page-not-found.message`}
            </p>
          </Block>
          <Block first last>
            <hr />
          </Block>
          <Block last>
            <Anchor
              className="gerami-button gerami-button-primary padding-vertical-big padding-horizontal-very-big"
              to="/"
            >
              {lang`page-not-found.link`}
            </Anchor>
          </Block>
        </Content>
      </Layout>
    </>
  )
}

export default Four04
