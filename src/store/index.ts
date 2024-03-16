import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { login, register } from '@/core/api/request/auth'

interface State {
  token: string
  userInfo: object
}

interface Action {
  initData: () => void
  setData: (params: Partial<State>) => void
  register: (params: { username: string, captcha: string, confirmPassword: string, password: string, phone: string }) => void
  login: (params: { username: string, password: string }) => void
}

export const useAppStore = create<State & Action>(set => ({
  token: '',
  userInfo: {},
  setData: (params) => {
    set(state => ({
      ...state,
      ...params,
    }))
  },
  initData: async () => {
    const token = JSON.parse(await AsyncStorage.getItem('token') || '')
    const userInfo = JSON.parse(await AsyncStorage.getItem('userInfo') || '{}')
    return set(state => ({
      ...state,
      token,
      userInfo,
    }))
  },
  register: async (params) => {
    await register(params)
  },
  login: async (params) => {
    const res = await login(params)
    await AsyncStorage.setItem('token', JSON.stringify(res.data.accessToken))
    await AsyncStorage.setItem('userInfo', JSON.stringify(res.data.userInfo))

    return set(state => ({
      ...state,
      token: res.data.accessToken,
      userInfo: res.data.userInfo,
    }))
  },
}))
