import React, { useMemo } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { Block, Content, Yoga } from 'gerami'
import {
  FaFacebook,
  FaInstagram,
  FaLocationArrow,
  FaTelegram,
  FaTwitter,
  FaYoutube,
} from 'react-icons/fa'
import Loadable from '@loadable/component'
import './footer.scss'
import { FooterQuery } from '../../../../../../graphql-types'
import { NavCategory, navData } from '../nav/nav-data'
import useSiteMetadata from '../../../../hooks/use-site-metadata/use-site-metadata'
import Anchor from '../../../anchor/anchor'
import useLang from '../../../../hooks/lang/use-lang'

type FooterProps = {}
const LoadLanguage = Loadable(
  () => import('../../../language-preference/language-preference')
)

const Footer: React.FC<FooterProps> = () => {
  const data = useStaticQuery<FooterQuery>(query)

  const navs = useMemo(
    () => ({
      primaries: navData.filter((nav) => nav.category === NavCategory.PRIMARY),
      foreigners: navData.filter((nav) => nav.category === NavCategory.FOREIGN),
      secondaries: navData.filter(
        (nav) => nav.category === NavCategory.SECONDARY
      ),
    }),
    []
  )

  const { social, addressUrl, mail, phones, emails } =
    data.generalInfo?.frontmatter ?? {}

  const siteMetadata = useSiteMetadata()

  const lang = useLang()
  return (
    <footer className="footer bg-whitish fg-blackish">
      <Content transparent size="4XL">
        <Block
          className="padding-vertical-none"
          style={{ overflowX: `hidden` }}
        >
          <Yoga maxCol={2}>
            <div className="margin-top-very-big">
              <div className="padding-top-big">
                {!social!.facebook ? null : (
                  <span>
                    <Anchor
                      to={social!.facebook}
                      title="Facebook"
                      className="footer-social"
                      target="_blank"
                      rel="noopener nofollow"
                    >
                      <FaFacebook />
                    </Anchor>
                  </span>
                )}
                {!social!.instagram ? null : (
                  <span>
                    <Anchor
                      to={social!.instagram}
                      title="Instagram"
                      className="footer-social"
                      target="_blank"
                      rel="noopener nofollow"
                    >
                      <FaInstagram />
                    </Anchor>
                  </span>
                )}
                {!social!.telegram ? null : (
                  <span>
                    <Anchor
                      to={social!.telegram}
                      title="Telegram"
                      className="footer-social"
                      target="_blank"
                      rel="noopener nofollow"
                    >
                      <FaTelegram />
                    </Anchor>
                  </span>
                )}
                {!social!.twitter ? null : (
                  <span>
                    <Anchor
                      to={social!.twitter}
                      title="Twitter"
                      className="footer-social"
                      target="_blank"
                      rel="noopener nofollow"
                    >
                      <FaTwitter />
                    </Anchor>
                  </span>
                )}
                {!social!.youtube ? null : (
                  <span>
                    <Anchor
                      to={social!.youtube}
                      title="YouTube"
                      className="footer-social"
                      target="_blank"
                      rel="noopener nofollow"
                    >
                      <FaYoutube />
                    </Anchor>
                  </span>
                )}
              </div>

              {!navs.primaries.length ? null : (
                <div className="padding-top-big">
                  {navs.primaries.map((nav, i) => (
                    <span key={i}>
                      <Anchor to={nav.url}>{nav.name}</Anchor>
                      {i >= navs.primaries.length - 1 ? null : (
                        <h6 className="inline-block padding-vertical-none padding-horizontal-normal fg-blackish">
                          •
                        </h6>
                      )}
                    </span>
                  ))}
                </div>
              )}

              {!navs.foreigners.length ? null : (
                <div className="padding-top-big">
                  {navs.foreigners.map((nav, i) => (
                    <span key={i}>
                      <Anchor
                        to={nav.url}
                        target="_blank"
                        rel="noopener nofollow"
                      >
                        {nav.name}
                      </Anchor>
                      {i >= navs.foreigners.length - 1 ? null : (
                        <h6 className="inline-block padding-vertical-none padding-horizontal-normal fg-blackish">
                          •
                        </h6>
                      )}
                    </span>
                  ))}
                </div>
              )}

              {!navs.secondaries.length ? null : (
                <div className="padding-top-big">
                  {navs.secondaries.map((nav, i) => (
                    <span key={i}>
                      <Anchor to={nav.url}>{nav.name}</Anchor>
                      {i >= navs.secondaries.length - 1 ? null : (
                        <h6 className="inline-block padding-vertical-none padding-horizontal-normal fg-blackish">
                          •
                        </h6>
                      )}
                    </span>
                  ))}
                </div>
              )}

              <div style={{ width: '100px' }} className="padding-top-big">
                <LoadLanguage />
              </div>
            </div>

            <div className="margin-top-very-big">
              <Block className="padding-none">
                <Yoga maxCol={2}>
                  <div>
                    <div>
                      <h5 className="padding-none font-S fg-blackish">
                        {lang`footer.address`}
                      </h5>
                      <div className="padding-top-small">
                        <pre>{lang`footer.location`}</pre>
                        <div>
                          <Anchor
                            to={addressUrl!}
                            target="_blank"
                            rel="noopener nofollow"
                          >
                            {lang`footer.direction`}
                            <small className="inline-block margin-left-normal">
                              <small>
                                <FaLocationArrow />
                              </small>
                            </small>
                          </Anchor>
                        </div>
                      </div>
                    </div>

                    <div className="padding-top-big">
                      <h5 className="padding-none font-S fg-blackish">{lang`footer.mail`}</h5>
                      <div className="padding-top-small">
                        <pre>{mail!}</pre>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div>
                      <h5 className="padding-none font-S fg-blackish">
                        {phones!.length === 1
                          ? lang`footer.phone`
                          : lang`footer.phones`}
                      </h5>
                      <div className="padding-top-small">
                        {phones!.map((phone, i) => (
                          <div key={i}>
                            <Anchor
                              to={`tel:${phone!
                                .replace(/ /g, ``)
                                .replace(/-/g, '')}`}
                              target="_blank"
                              rel="noopener nofollow"
                            >
                              {phone!}
                            </Anchor>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="padding-top-big">
                      <h5 className="padding-none font-S fg-blackish">
                        {emails!.length === 1
                          ? lang`footer.email`
                          : lang`footer.emails`}
                      </h5>
                      <div className="padding-top-small">
                        {emails!.map((email, i) => (
                          <div key={i}>
                            <Anchor
                              to={`mailto:${email!}`}
                              target="_blank"
                              rel="noopener nofollow"
                            >
                              {email!}
                            </Anchor>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Yoga>
              </Block>
            </div>
          </Yoga>
        </Block>

        <Block>
          <hr style={{ opacity: 0.42 }} />
        </Block>

        <Block last>
          {siteMetadata.copyright}
          <h6 className="inline-block padding-vertical-none padding-horizontal-normal fg-blackish">
            •
          </h6>
          Powered by{' '}
          <Anchor to="https://www.kelaltech.com" target="_blank" rel="noopener">
            Kelal Tech
          </Anchor>
        </Block>
      </Content>
    </footer>
  )
}

export default Footer

const query = graphql`
  query Footer {
    generalInfo: markdownRemark(fields: { slug: { regex: "/info/general/" } }) {
      frontmatter {
        social {
          facebook
          instagram
          telegram
          twitter
          youtube
        }
        address
        addressUrl
        mail
        phones
        emails
      }
    }
  }
`
