import {
  BookOutlined,
  DashboardOutlined,
  LoginOutlined,
  ProfileOutlined,
} from '@ant-design/icons-vue'
import { HorseToyIcon, TieIcon, UsersGroupIcon } from 'vue-tabler-icons'
import { PERMISSION } from '@/common/permission'

export interface Menu {
  header?: string
  title?: string
  icon?: object
  to?: string
  divider?: boolean
  chip?: string
  chipColor?: string
  chipVariant?: string
  chipIcon?: string
  children?: Menu[]
  disabled?: boolean
  type?: string
  subCaption?: string
  permissions?: string[]
}

const sidebarItem: Menu[] = [
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
    permissions: [PERMISSION.ADMIN.cv_read],
  },
  {
    title: 'Job Post',
    icon: TieIcon,
    to: '/job-post',
    permissions: [PERMISSION.ADMIN.job_read],
  },
  {
    title: 'Candidate',
    icon: UsersGroupIcon,
    to: '/candidates',
    permissions: [PERMISSION.ADMIN.candidate_read],
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
    permissions: [PERMISSION.CANDIDATE.PLAYGROUND],
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
