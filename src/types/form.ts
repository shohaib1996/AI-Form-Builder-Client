export interface FieldOption {
  name: string
  label: string
  type: "text" | "email" | "number" | "select" | "radio" | "checkbox"
  required: boolean
  options?: string[]
}

export interface Fields {
  fields: FieldOption[]
}

export interface Form {
  _id: string
  userId: string
  title: string
  description: string
  fields: Fields
  isPublished: boolean
  templateId: string
  createdAt: string // or Date if you want to parse
  updatedAt: string // or Date if you want to parse
  __v: number
}

export interface FormMeta {
  page: number
  limit: number
  total: number
}

export interface FormResponse {
  success: boolean
  data: Form[]
  meta: FormMeta
}
