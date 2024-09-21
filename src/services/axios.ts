import axios from 'axios'

export const PublicAxiosService = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

const Axios = (contentType?: string) =>
  axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
      'Content-Type': contentType || 'application/json',
      Authorization:
        'Bearer ' + JSON.parse(localStorage.getItem('token') ?? ''),
    },
  })

export const AxiosForPayment = (token?: string) =>
  axios.create({
    baseURL: import.meta.env.VITE_PAYMENT_API_URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  })

export const AxiosService = Axios
