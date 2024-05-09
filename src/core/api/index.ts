import { Toast } from '@fruits-chain/react-native-xiaoshu'
import AsyncStorage from '@react-native-async-storage/async-storage'
import type { AxiosInstance, AxiosRequestConfig, CreateAxiosDefaults } from 'axios'
import axios from 'axios'
import { useUserStore } from '@/store/user'

const baseUrl = 'http://10.254.0.148:3000'
// baseURL: 'http://192.168.1.5:3000',
// baseURL: 'https://api.iridescent.icu',
// baseURL: 'http://101.42.153.172:3000',

interface CustomConfig {
  showMsg?: boolean
}
interface PendingTask {
  config: AxiosRequestConfig
  resolve: Function
}
let refreshing = false

const queue: PendingTask[] = []
async function refreshToken() {
  const refreshToken = await AsyncStorage.getItem('refreshToken')
  console.log('refresh', `${baseUrl}/user/refresh`)
  const { data } = await axios.get(`${baseUrl}/user/refresh`, {
    params: {
      refreshToken,
    },
  })

  await AsyncStorage.setItem('accessToken', data.data.accessToken || '')
  await AsyncStorage.setItem('refreshToken', data.data.refreshToken || '')

  return data
}
export class Request {
  private readonly axios: AxiosInstance

  constructor(params: CreateAxiosDefaults) {
    this.axios = axios.create(params)

    this.axios.interceptors.request.use((config) => {
      console.log(`请求${config.url}`)
      return config
    }, (error) => {
      return Promise.reject(error)
    })

    this.axios.interceptors.response.use((response) => {
      return response
    }, async (error) => {
      return Promise.reject(error)
    })
  }

  private async request<T extends Record<string, any>>(requestConfig: AxiosRequestConfig, customConfig: CustomConfig = { showMsg: false }) {
    const accessToken = await AsyncStorage.getItem('accessToken')

    return new Promise<T>((resolve, reject) => {
      this.axios<T>({
        ...requestConfig,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }).then((res) => {
        if (!String(res.data.code).startsWith('20')) {
          customConfig.showMsg && Toast.fail(res.data.message)
          reject(res.data)
        }
        else {
          resolve(res.data)
        }
      }).catch(async (error) => {
        const { data, config } = error.response

        if (refreshing) {
          return new Promise((resolve) => {
            queue.push({
              config,
              resolve,
            })
          })
        }

        if (data.code === 401 && !config.url.includes('/user/refresh')) {
          refreshing = true

          const data = await refreshToken()

          refreshing = false

          if (data.code === 200) {
            const accessToken = await AsyncStorage.getItem('accessToken')

            queue.forEach(({ config, resolve }: any) => {
              config.headers.Authorization = `Bearer ${accessToken}`
              resolve(axios(config))
            })
            queue.length = 0
            config.headers.Authorization = `Bearer ${accessToken}`
            return axios(config)
          }
          else {
            Toast.fail('登录过期，请重新登录')
            await AsyncStorage.setItem('role', 'genius')
            await AsyncStorage.setItem('refreshToken', '')
            await AsyncStorage.setItem('accessToken', '')
            useUserStore.getState().logout()
            return reject(error)
          }
        }
        else {
          return reject(error)
        }
      })
    })
  }

  public post<T extends Record<string, any>, K extends Record<string, any>>(data: K, requestConfig: Omit<AxiosRequestConfig, 'method' | 'data'>, customConfig?: CustomConfig) {
    return this.request<T>({
      method: 'POST',
      data,
      ...requestConfig,
    }, customConfig)
  }

  public get<T extends Record<string, any>, K extends Record<string, any>>(data: K, requestConfig: Omit<AxiosRequestConfig, 'method' | 'params'>, customConfig?: CustomConfig) {
    return this.request<T>({
      method: 'GET',
      params: data,
      ...requestConfig,
    }, customConfig)
  }

  public delete<T extends Record<string, any>, K extends Record<string, any>>(data: K, requestConfig: Omit<AxiosRequestConfig, 'method' | 'params'>, customConfig?: CustomConfig) {
    return this.request<T>({
      method: 'DELETE',
      params: data,
      ...requestConfig,
    }, customConfig)
  }

  public put<T extends Record<string, any>, K extends Record<string, any>>(data: K, requestConfig: Omit<AxiosRequestConfig, 'method' | 'params'>, customConfig?: CustomConfig) {
    return this.request<T>({
      method: 'PUT',
      params: data,
      ...requestConfig,
    }, customConfig)
  }
}

export const request = new Request({
  baseURL: baseUrl,
  httpsAgent: {
    rejectUnauthorized: false,
  },
})
