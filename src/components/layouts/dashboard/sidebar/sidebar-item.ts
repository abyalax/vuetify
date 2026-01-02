import {
  BookOutlined,
  DashboardOutlined,
  LoginOutlined,
  ProfileOutlined,
} from '@ant-design/icons-vue'
import { HorseToyIcon, TieIcon, UsersGroupIcon } from 'vue-tabler-icons'

export interface menu {
  header?: string
  title?: string
  icon?: object
  to?: string
  divider?: boolean
  chip?: string
  chipColor?: string
  chipVariant?: string
  chipIcon?: string
  children?: menu[]
  disabled?: boolean
  type?: string
  subCaption?: string
}

const sidebarItem: menu[] = [
  { header: 'Navigation' },
  {
    title: 'Dashboard',
    icon: DashboardOutlined,
    to: '/dashboard',
  },
  { header: 'Management' },
  {
    title: 'Curriculum Vitae',
    icon: BookOutlined,
    to: '/cv',
  },
  {
    title: 'Job Post',
    icon: TieIcon,
    to: '/job-post',
  },
  {
    title: 'Candidate',
    icon: UsersGroupIcon,
    to: '/candidate',
  },
  {
    title: 'Nested Table',
    icon: TieIcon,
    to: '/job-post-nested',
  },
  { header: 'Board Playground' },
  {
    title: 'Playground',
    icon: HorseToyIcon,
    to: '/playground',
  },
  { header: 'Authentication' },
  {
    title: 'Login',
    icon: LoginOutlined,
    to: '/auth/login',
  },
  {
    title: 'Register',
    icon: ProfileOutlined,
    to: '/auth/register',
  },
]

export default sidebarItem
