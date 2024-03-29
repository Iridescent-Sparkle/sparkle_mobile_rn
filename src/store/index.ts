import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { Toast } from '@fruits-chain/react-native-xiaoshu'
import { request } from '@/core/api'

interface UserInfo {
  id: number
  username: string
  password: string
  nickName: string
  avatar: string
  email: string
  contactIdToB: string
  contactIdToC: string
  contactPassword: string
  isFrozen: boolean
  isAdmin: boolean
  createTime: string
  updateTime: string
}
interface State {
  token: string
  userInfo: UserInfo
}

interface Action {
  getUserInfo: () => void
  setData: (params: Partial<State>) => void
  register: (params: { username: string, captcha: string, confirmPassword: string, password: string }) => void
  login: (params: { username: string, password: string }) => void
  logout: () => Promise<void>
}

export const useAppStore = create<State & Action>(set => ({
  token: '',
  userInfo: {
    id: 0,
    username: '',
    password: '',
    nickName: '',
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

      await AsyncStorage.setItem('token', loginRes.data.accessToken)

      return set((state) => {
        state.getUserInfo()
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
    set(state => ({
      ...state,
      token: '',
    }))
  },
  getUserInfo: async () => {
    const token = await AsyncStorage.getItem('token') || ''

    if (token) {
      const userInfo = await request.get({}, {
        url: '/user/info',
      })
      await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo.data))

      return set(state => ({
        ...state,
        token,
        userInfo: userInfo.data,
      }))
    }
  },
}))
