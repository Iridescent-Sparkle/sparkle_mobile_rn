import { create } from 'zustand'
import { request } from '@/core/api'
import { login, register } from '@/core/api/request/auth'

interface State {
  token: string
  userInfo: object
}

interface Action {
  register: (params: { username: string, captcha: string, confirmPassword: string, password: string, phone: string }) => void
  login: (params: { username: string, password: string }) => void
}

export const useAppStore = create<State & Action>(set => ({
  token: '',
  userInfo: {},
  register: async (params) => {
    await register(params)
  },
  login: async (params) => {
    const res = await login(params)

    return set(state => ({
      ...state,
      token: res.data.accessToken,
      userInfo: res.data.userInfo,
    }))
  },
}))
