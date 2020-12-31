import React, { useMemo } from 'react'
import { Parallax } from 'react-parallax'
import { Block, Content } from 'gerami'
import Markdown from 'markdown-to-jsx'

import './another-section.scss'
import { ImageSharpFluid, Maybe } from '../../../../graphql-types'
import Anchor from '../../../shared/components/anchor/anchor'

type AnotherSectionProps = {
  bg?: Maybe<{
    childImageSharp: Maybe<{
      fluid: Maybe<Pick<ImageSharpFluid, 'src' | 'srcSet'>>
    }>
  }>
  align?: 'center' | 'left' | 'right' | string | null
  titleAlign?: 'center' | 'left' | 'right'
  descriptionAlign?: 'center' | 'left' | 'right'
  btnAlign?: 'center' | 'left' | 'right'
  title?: string | null | JSX.Element
  description?: string | null | JSX.Element
  btnText?: string | null | JSX.Element
  btnUrl?: string | null
  btnDownload?: boolean | null
}

const AnotherSection: React.FC<AnotherSectionProps> = ({
  bg,
  align: _align,
  titleAlign,
  descriptionAlign,
  btnAlign,
  title,
  description,
  btnText,
  btnUrl,
  btnDownload = false,
}) => {
  const align = useMemo(
    () =>
      _align && [`center`, `left`, `right`].includes(_align.toLowerCase())
        ? _align.toLowerCase()
        : `center`,
    [_align]
  )

  const BgComponent = ({ children }: React.PropsWithChildren<{}>) =>
    !!bg ? (
      <Parallax
        bgImage={bg?.childImageSharp?.fluid?.src}
        bgImageSrcSet={bg?.childImageSharp?.fluid?.srcSet}
        strength={300}
      >
        {children}
      </Parallax>
    ) : (
      <div>{children}</div>
    )

  return (
    <div className="another-section">
      <BgComponent>
        <div
          className={`${
            !!bg?.childImageSharp?.fluid?.src
              ? 'another-section-overlay fg-whitish inset-shade-S text-shade-S'
              : ''
          } padding-vertical-very-big`}
        >
          <Content
            transparent
            size="XL"
            className={`${align} padding-vertical-very-big`}
          >
            {!title ? null : (
              <Block first last={!description && (!btnText || !btnUrl)}>
                <h1
                  className={`fg-blackish ${titleAlign || ''} ${
                    !!description ? 'padding-top-none' : ''
                  }`}
                >
                  {title}
                </h1>
              </Block>
            )}

            {!description ? null : (
              <Block last={!btnText || !btnUrl}>
                <article className={`font-M ${descriptionAlign || ''}`}>
                  {typeof description === `string` ? (
                    <Markdown>{description!}</Markdown>
                  ) : (
                    description
                  )}
                </article>
              </Block>
            )}

            {!btnText || !btnUrl ? null : (
              <Block first last className={`${btnAlign || ''}`}>
                <Anchor
                  to={btnUrl}
                  download={btnDownload}
                  target="_blank"
                  rel="noopener nofollow"
                  className={`gerami-button gerami-button-primary`}
                >
                  {btnText}
                </Anchor>
              </Block>
            )}
          </Content>
        </div>
      </BgComponent>
    </div>
  )
}

export default AnotherSection
