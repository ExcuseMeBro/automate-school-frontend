import { defineStore } from 'pinia'
import { ref } from 'vue'
import { AuthService } from '@/services/auth'
import { toast } from 'vue-sonner'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const isLoading = ref(false)
  const isLoggedIn = ref(false)

  user.value =
    localStorage.getItem('token') &&
    localStorage.getItem('token') !== 'null' &&
    localStorage.getItem('token') !== 'undefined'
      ? JSON.parse(localStorage.getItem('token') ?? '{}')
      : null

  function login(login: string, password: string) {
    isLoading.value = true
    AuthService.login({
      login: login,
      password: password,
    })
      .then((res: any) => {
        localStorage.clear()
        localStorage.setItem('token', JSON.stringify(res?.data?.accessToken))
        localStorage.setItem('user', JSON.stringify(res?.data?.user))
        localStorage.setItem('role', res?.data?.user?.role)
        isLoggedIn.value = true
        window.location.href = '/'
      })
      .catch(() => {
        toast.error('Login yoki parol noto`g`ri!')
      })
      .finally(() => {
        isLoading.value = false
      })
  }

  function logout() {
    AuthService.logout()
    user.value = null
    window.location.reload()
  }

  return {
    user,
    login,
    logout,
    isLoading,
    isLoggedIn,
  }
})
