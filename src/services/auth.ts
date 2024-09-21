import { PublicAxiosService } from '@/services/axios'

export class AuthService {
  static async login(user: any) {
    return await PublicAxiosService.post(`/auth/login`, {
      phone: user.login,
      password: user.password,
    })
  }

  static logout() {
    localStorage.clear()
  }
}
