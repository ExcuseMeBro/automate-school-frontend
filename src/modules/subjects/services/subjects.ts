import { AxiosService } from '@/services/axios'

export class SubjectService {
  static async getAll() {
    return await AxiosService().get(`/subject`)
  }
}
