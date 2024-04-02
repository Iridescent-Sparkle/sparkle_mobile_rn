import { Toast } from '@fruits-chain/react-native-xiaoshu'
import AsyncStorage from '@react-native-async-storage/async-storage'
import type { AxiosInstance, AxiosRequestConfig, CreateAxiosDefaults } from 'axios'
import axios from 'axios'

interface CustomConfig {
  showMsg?: boolean
}

export class Request {
  private readonly axios: AxiosInstance

  constructor(params: CreateAxiosDefaults) {
    this.axios = axios.create(params)

    this.axios.interceptors.request.use((config) => {
      return config
    }, (error) => {
      return Promise.reject(error)
    })

    this.axios.interceptors.response.use((response) => {
      return response
    }, (error) => {
      return Promise.reject(error)
    })
  }

  private async request<T extends Record<string, any>>(requestConfig: AxiosRequestConfig, customConfig: CustomConfig = { showMsg: false }) {
    const token = await AsyncStorage.getItem('token')

    return new Promise<T>((resolve, reject) => {
      this.axios<T>({
        ...requestConfig,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        if (!String(res.data.code).startsWith('20')) {
          customConfig.showMsg && Toast.fail(res.data.message)
          reject(res.data)
        }
        else {
          resolve(res.data)
        }
      }).catch((error) => {
        customConfig.showMsg && Toast.fail(error.message)
        reject(error)
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
  baseURL: 'http://10.254.0.148:3000',
  // baseURL: 'http://192.168.1.3:3000',
})
