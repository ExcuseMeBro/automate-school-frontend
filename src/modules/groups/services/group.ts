import { AxiosService } from '@/services/axios'

export class GroupService {
  static async getAll() {
    return await AxiosService().get(`/group`)
  }

  static async add(form: any) {
    return await AxiosService().post(`/group`, form)
  }
}
