// icons
import {
  BookOutlined,
  DashboardOutlined,
  LoginOutlined,
  ProfileOutlined,
  UserAddOutlined,
} from '@ant-design/icons-vue'
import { UsersGroupIcon } from 'vue-tabler-icons'

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
    title: 'Candidate',
    icon: UsersGroupIcon,
    to: '/candidate',
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
