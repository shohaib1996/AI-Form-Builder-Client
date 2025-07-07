import api from "@/lib/axios"

export interface FormsPerMonthData {
  month: string
  count: number
}

export interface ResponsesOverTimeData {
  count: number
  date: string
}

export interface ResponsesByFormData {
  formName: string
  count: number
}

export interface FormStatusData {
  count: number
  status: boolean
}

export interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
}

export const dashboardApi = {
  getFormsPerMonth: async (): Promise<FormsPerMonthData[]> => {
    const response = await api.get<ApiResponse<FormsPerMonthData[]>>("/dashboard/forms-per-month")
    return response.data.data
  },

  getResponsesOverTime: async (): Promise<ResponsesOverTimeData[]> => {
    const response = await api.get<ApiResponse<ResponsesOverTimeData[]>>("/dashboard/responses-over-time")
    return response.data.data
  },

  getResponsesByForm: async (): Promise<ResponsesByFormData[]> => {
    const response = await api.get<ApiResponse<ResponsesByFormData[]>>("/dashboard/responses-by-form")
    return response.data.data
  },

  getFormStatus: async (): Promise<FormStatusData[]> => {
    const response = await api.get<ApiResponse<FormStatusData[]>>("/dashboard/form-status")
    return response.data.data
  },
}
