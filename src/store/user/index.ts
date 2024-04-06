import { Toast } from '@fruits-chain/react-native-xiaoshu'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { request } from '@/core/api'

interface State {
  token: string
  role: 'boss' | 'genius'
  userInfo: User
}

interface Action {
  initData: () => Promise<void>
  getUserInfo: () => Promise<void>
  changeUser: (role: 'boss' | 'genius') => Promise<void>
  setData: (params: Partial<State>) => void
  register: (params: { username: string, captcha: string, confirmPassword: string, password: string }) => void
  login: (params: { username: string, password: string }) => void
  logout: () => Promise<void>
}

export const useUserStore = create<State & Action>(set => ({
  token: '',
  role: 'genius',
  userInfo: {
    id: 0,
    username: '',
    password: '',
    nickname: '',
    avatar: '',
    email: '',
    contactIdToB: '',
    contactIdToC: '',
    contactPassword: '',
    isFrozen: false,
    isAdmin: false,
    createTime: '',
    updateTime: '',
  },
  setData: (params) => {
    set(state => ({
      ...state,
      ...params,
    }))
  },
  initData: async () => {
    const token = await AsyncStorage.getItem('token') || ''
    const role = <'boss' | 'genius'>(await AsyncStorage.getItem('role') || 'genius')
    set(state => ({
      ...state,
      token,
      role,
    }))
  },
  changeUser: async (role: 'boss' | 'genius') => {
    await AsyncStorage.setItem('role', role)
    set(state => ({
      ...state,
      role,
    }))
  },
  register: async (params) => {
    await request.post(params, {
      url: '/user/register',
    })
  },
  login: async (params) => {
    try {
      const loginRes = await request.post(params, {
        url: '/user/login',
      })

      await AsyncStorage.setItem('token', loginRes.data.accessToken || '')

      return set((state) => {
        return {
          ...state,
          token: loginRes.data.accessToken,
        }
      })
    }
    catch (error) {
      Toast.fail('登录失败')
      console.error(error)
    }
  },
  logout: async () => {
    await AsyncStorage.setItem('token', '')
    console.log(1)
    set(state => ({
      ...state,
      token: '',
    }))
  },
  getUserInfo: async () => {
    const userInfo = await request.get({}, {
      url: '/user/info',
    })
    console.log(userInfo)
    await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo.data))

    return set(state => ({
      ...state,
      userInfo: userInfo.data,
    }))
  },
}))
