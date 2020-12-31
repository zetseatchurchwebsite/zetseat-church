import React, { FormEvent, useState } from 'react'
import { Block, Button, Content, Flex, FlexSpacer, Input } from 'gerami'
import addToMailchimp from 'gatsby-plugin-mailchimp'
import { FaRegBell } from 'react-icons/fa'
import useLang from '../../hooks/lang/use-lang'

type EmailRegistrationProps = {}

const EmailRegistration: React.FC<EmailRegistrationProps> = () => {
  const [isSending, setIsSending] = useState(false)
  const [responseMessage, setResponseMessage] = useState<string>()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setIsSending(true)

    addToMailchimp((e.target as any).EMAIL.value)
      .then((data: any) =>
        setResponseMessage(data?.msg || `Sorry, some error has occurred.`)
      )
      .catch(() =>
        // returns a 200 status code, if network connection succeeds
        setResponseMessage(
          `Sorry, some error has occurred.<br/>This could possibly be a network connection issue.`
        )
      )
      .finally(() => setIsSending(false))
  }

  const lang = useLang()
  return (
    <div className="padding-vertical-very-big padding-left-big">
      <Content
        transparent
        size="L"
        className="flex padding-vertical-very-big margin-bottom-very-big"
      >
        <div className="margin-auto fg-blackish padding-horizontal-very-big hide-on-mobile">
          <FaRegBell style={{ fontSize: `7em`, opacity: 0.14 }} />
        </div>

        <div className="margin-auto" style={{ flex: 1 }}>
          <div
            className="margin-vertical-very-big"
            style={{ borderLeft: `solid rgba(0,0,0,0.028) 4px` }}
          >
            <Block className="padding-vertical-none">
              <h1 className="padding-top-none fg-blackish">{lang`email.sub.title`}</h1>
              <div className="subtitle margin-bottom-very-big">
                {lang`email.sub.description`}
              </div>

              {responseMessage ? (
                <div dangerouslySetInnerHTML={{ __html: responseMessage }} />
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="margin-vertical-very-big"
                >
                  <Flex>
                    <FlexSpacer />

                    <Input
                      type="email"
                      placeholder={lang`email.sub.placeholder`}
                      name="EMAIL"
                      className="full-width"
                      disabled={isSending}
                      required
                    />

                    <div className="padding-horizontal-small" />

                    <Button type="submit" disabled={isSending}>
                      {lang`email.sub.btn`}
                    </Button>

                    <FlexSpacer />
                  </Flex>
                </form>
              )}
            </Block>
          </div>
        </div>
      </Content>
    </div>
  )
}

export default EmailRegistration
