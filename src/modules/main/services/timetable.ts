import { AxiosService } from '@/services/axios'

export class TimeTableService {
  static async get() {
    return await AxiosService().get(`/timetable/fetch`)
  }

  static async generate() {
    return await AxiosService().get(`/timetable`)
  }
}
