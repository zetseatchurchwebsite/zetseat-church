import React from 'react'
import { Block } from 'gerami'
import useLang from '../../../../../shared/hooks/lang/use-lang'
import './kids-quote.scss'

const KidsQuote = () => {
  const lang = useLang()
  return (
    <Block first className="center quote-box">
      <blockquote className={' about-hist-motton'}>
        <p className={''}>{lang`kids.quote.description`}</p>
      </blockquote>
      <h4 className="subtitle fg-primary center">{lang`kids.quote.by`}</h4>
    </Block>
  )
}

export default KidsQuote
