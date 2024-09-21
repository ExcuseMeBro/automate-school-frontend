import { AxiosService } from '@/services/axios'

export class TeacherService {
  static async getAll() {
    return await AxiosService().post(`/teacher/fetch`, {})
  }

  static async add(form: any) {
    return await AxiosService().post(`/teacher`, form)
  }

  static async delete(id: any) {
    return await AxiosService().delete(`/teacher/delete/${id}`)
  }

  static async edit(form: any) {
    return await AxiosService().post(`/teacher/update`, form)
  }
}
