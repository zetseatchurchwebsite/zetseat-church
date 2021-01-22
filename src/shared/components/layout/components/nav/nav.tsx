import React, { useMemo, useState } from 'react'
import { Block, Button, Content, Flex, FlexSpacer } from 'gerami'
import { MdClose } from 'react-icons/md'
import { FiMenu } from 'react-icons/fi'

import './nav.scss'
import { usePage } from '../../../../contexts/page-context/page-context'
import { NavCategory, navData, NavType } from './nav-data'
import useSiteMetadata from '../../../../hooks/use-site-metadata/use-site-metadata'
import Anchor from '../../../anchor/anchor'
import Loadable from '@loadable/component'

type NavProps = {}
const LoadLanguage = Loadable(
  () => import('../../../language-preference/language-preference')
)

const Nav: React.FC<NavProps> = () => {
  const page = usePage()

  const props = useMemo(
    () => ({
      activePathname: page?.location.pathname || ``,
      primaries: navData.filter((nav) => nav.category === NavCategory.PRIMARY),
      foreigners: navData.filter((nav) => nav.category === NavCategory.FOREIGN),
    }),
    [page]
  )

  return (
    <nav className="margin-auto nav">
      <div className="nav-l-container">
        <NavL {...props} />
      </div>
      <div className="nav-s-container">
        <NavS {...props} />
      </div>
    </nav>
  )
}

//
// NavL:
//

type NavLProps = {
  activePathname: string
  primaries: NavType[]
  foreigners: NavType[]
}

const NavL: React.FC<NavLProps> = ({
  activePathname,
  primaries,
  foreigners,
}) => {
  return (
    <div className="nav-l">
      {primaries.map((nav, i) => (
        <Anchor
          key={i}
          className={`nav-l-link${
            activePathname.replace(/\/$/, '') === nav.url.replace(/\/$/, '')
              ? ' nav-l-link-active'
              : ''
          }`}
          to={nav.url}
        >
          {nav.name}
        </Anchor>
      ))}

      {primaries.length && foreigners.length ? (
        <div className="nav-l-separator padding-top-small">|</div>
      ) : null}

      {foreigners.map((nav, i) => (
        <Anchor
          key={i}
          className={`nav-l-link${
            activePathname.replace(/\/$/, '') === nav.url.replace(/\/$/, '')
              ? ' nav-l-link-active'
              : ''
          }`}
          to={nav.url}
          target="_blank"
          rel="noopener nofollow"
        >
          <span className="inline-block middle font-L padding-top-small">
            {nav.icon}
          </span>
          <span className="inline-block middle padding-left-normal">
            {nav.name}
          </span>
        </Anchor>
      ))}
    </div>
  )
}

//
// NavS:
//

type NavSProps = {
  activePathname: string
  primaries: NavType[]
  foreigners: NavType[]
}

export const NavS: React.FC<NavSProps> = ({
  activePathname,
  primaries,
  foreigners,
}) => {
  const [open, setOpen] = useState(false)

  const siteMetadata = useSiteMetadata()
  return (
    <>
      <div className="nav-s">
        {primaries
          .filter((nav) => !!nav.showOnBottomTab)
          .map((nav, i) => (
            <Anchor
              key={i}
              className={`nav-s-link-tab${
                activePathname.replace(/\/$/, '') === nav.url.replace(/\/$/, '')
                  ? ' nav-s-link-tab-active'
                  : ''
              }`}
              to={nav.url}
            >
              <span className="nav-s-link-tab-icon">{nav.icon}</span>
              <span className="nav-s-link-tab-name">{nav.name}</span>
            </Anchor>
          ))}
        <Button className="nav-s-toggle" onClick={() => setOpen(!open)}>
          <FiMenu />
        </Button>
      </div>

      {!open ? null : (
        <div className="nav-s-underlay">
          {/* eslint-disable */}
          <div
            className="nav-s-overlay-closer"
            onClick={() => setOpen(false)}
          />
          {/* eslint-enable */}

          <Content size="S" transparent className="nav-s-overlay-content">
            <Block>
              <Flex>
                <h5 className="padding-top-big">{siteMetadata.title}</h5>

                <FlexSpacer />

                <Button
                  className="nav-s-close-button"
                  onClick={() => setOpen(false)}
                >
                  <MdClose />
                </Button>
              </Flex>

              <hr className="nav-s-separator" />
            </Block>

            <Block first={!primaries.length} className={'nav-s-foreigners'}>
              {foreigners.map((nav, i) => (
                <Anchor
                  key={i}
                  className={`nav-s-link${
                    activePathname.replace(/\/$/, '') ===
                    nav.url.replace(/\/$/, '')
                      ? ' nav-l-link-active'
                      : ''
                  }`}
                  to={nav.url}
                  target="_blank"
                  rel="noopener nofollow"
                >
                  <span className="inline-block margin-top-small font-L">
                    {nav.icon}
                  </span>
                  <h6
                    className="padding-top-small font-S light fg-blackish"
                    style={{ textTransform: `none` }}
                  >
                    {nav.name}
                  </h6>
                </Anchor>
              ))}
            </Block>

            {primaries.length && foreigners.length ? (
              <Block className="padding-vertical-none">
                <hr className="nav-s-separator" />
              </Block>
            ) : null}

            <Block first={false}>
              {primaries.map((nav, i) => (
                <Anchor
                  key={i}
                  className={`nav-s-link${
                    activePathname.replace(/\/$/, '') ===
                    nav.url.replace(/\/$/, '')
                      ? ' nav-l-link-active'
                      : ''
                  }`}
                  to={nav.url}
                >
                  <div>{nav.name}</div>
                  <h6
                    className="padding-top-none font-S light fg-black"
                    style={{ textTransform: `none` }}
                  >
                    {nav.description}
                  </h6>
                </Anchor>
              ))}
            </Block>
            <Block className="padding-vertical-none">
              <hr className="nav-s-separator" />
            </Block>
            <Block
              first
              last
              className={'padding-top-big padding-bottom-big'}
              style={{ width: '150px' }}
            >
              <LoadLanguage />
            </Block>
          </Content>
        </div>
      )}
    </>
  )
}

export default Nav
