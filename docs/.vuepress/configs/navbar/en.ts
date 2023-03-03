import type { NavbarConfig } from '@vuepress/theme-default'
import { version } from '../meta'

export const navbarEn: NavbarConfig = [
  {
    text: 'Home',
    link: 'https://airdb.wiki/',
  },
  {
    text: 'OKR',
    link: '/okr/',
  },
  {
    text: 'Weekly ',
    link: '/weekly/',
  },
  { text: 'Team', link: '/team/', },
  { text: 'Roles', link: '/roles/', }
]
