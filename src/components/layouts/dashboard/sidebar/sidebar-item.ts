import {
  BookOutlined,
  DashboardOutlined,
  LoginOutlined,
  ProfileOutlined,
} from '@ant-design/icons-vue'
import { HorseToyIcon, TieIcon, UsersGroupIcon } from 'vue-tabler-icons'
import { PERMISSION_NAMES } from '@/common/permission'

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
  permissions?: string[]
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
    permissions: [PERMISSION_NAMES.ADMIN.cv_read],
  },
  {
    title: 'Job Post',
    icon: TieIcon,
    to: '/job-post',
    permissions: [PERMISSION_NAMES.ADMIN.job_read],
  },
  {
    title: 'Candidate',
    icon: UsersGroupIcon,
    to: '/candidates',
    permissions: [PERMISSION_NAMES.ADMIN.candidate_read],
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
    permissions: [PERMISSION_NAMES.CANDIDATE.PLAYGROUND],
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
