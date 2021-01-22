import React, { ReactNode } from 'react'
import {
  AiOutlineGift,
  FaPodcast,
  FaRegNewspaper,
  GoHome,
  IoMdTv,
} from 'react-icons/all'
import { FormattedMessage } from 'gatsby-plugin-intl'

export enum NavCategory {
  PRIMARY,
  FOREIGN,
  SECONDARY,
}

export type NavType = {
  category: NavCategory
  name: string | ReactNode
  url: string
  description: string | ReactNode
  icon?: JSX.Element
  showOnBottomTab?: boolean
}

export const navData: NavType[] = [
  {
    category: NavCategory.PRIMARY,
    name: <FormattedMessage id={'nav.home.name'} />,
    url: `/`,
    description: <FormattedMessage id={'nav.home.description'} />,
    icon: <GoHome />,
    showOnBottomTab: true,
  },
  {
    category: NavCategory.PRIMARY,
    name: <FormattedMessage id={'nav.blog.name'} />,
    url: `/blog`,
    description: <FormattedMessage id={'nav.blog.description'} />,
    icon: <FaRegNewspaper />,
    showOnBottomTab: true,
  },
  {
    category: NavCategory.PRIMARY,
    name: <FormattedMessage id={'nav.podcasts.name'} />,
    url: `/podcasts`,
    description: <FormattedMessage id={'nav.podcasts.description'} />,
    icon: <FaPodcast />,
    showOnBottomTab: true,
  },
  {
    category: NavCategory.PRIMARY,
    name: <FormattedMessage id={'nav.videos.name'} />,
    url: `/videos`,
    description: <FormattedMessage id={'nav.videos.description'} />,
    icon: <IoMdTv />,
    showOnBottomTab: true,
  },
  {
    category: NavCategory.PRIMARY,
    name: <FormattedMessage id={'nav.about.name'} />,
    url: `/about`,
    description: <FormattedMessage id={'nav.about.description'} />,
  },

  {
    category: NavCategory.FOREIGN,
    name: <FormattedMessage id={'nav.live.name'} />,
    url: `https://live.zetseat.church/`,
    description: <FormattedMessage id={'nav.live.description'} />,
    icon: <IoMdTv />,
  },
  {
    category: NavCategory.FOREIGN,
    name: <FormattedMessage id={'nav.give.name'} />,
    url: `https://www.gofundme.com/f/praise-and-offering-day`,
    description: <FormattedMessage id={'nav.give.description'} />,
    icon: <AiOutlineGift />,
  },

  {
    category: NavCategory.SECONDARY,
    name: <FormattedMessage id={'nav.youth.name'} />,
    url: `/youth`,
    description: <FormattedMessage id={'nav.youth.description'} />,
  },
  {
    category: NavCategory.SECONDARY,
    name: <FormattedMessage id={'nav.kids.name'} />,
    url: `/kids`,
    description: <FormattedMessage id={'nav.kids.description'} />,
  },
]
