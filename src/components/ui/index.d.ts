export type Breadcrumb = {
  title: string
  disabled: boolean
  href: string
}

export interface FieldConfig {
  label: string
  type?: 'text' | 'textarea' | 'number'
}
