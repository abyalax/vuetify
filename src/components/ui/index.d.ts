export type Breadcrumb = {
  title: string
  disabled: boolean
  href: string
}

export interface FieldConfig {
  label: string
  type?: 'text' | 'textarea' | 'number'
}

export { default as PermissionGuard } from './permission-guard.vue'
