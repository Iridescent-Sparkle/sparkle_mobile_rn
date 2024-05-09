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
const initUserInfo = {
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
  createTime: '',
  updateTime: '',
  integral: 0,
  profileId: 0,
  contactId: [],
  profile: {
    id: 0,
    occupation: '',
    address: '',
    phone: '',
    email: '',
    minSalary: '',
    maxSalary: '',
    summary: '',
    isDelete: false,
    createTime: '',
    updateTime: '',
    eduction: [],
    experience: [],
    project: [],
    volunteer: [],
  },
  company: {
    user: [],
    id: 0,
    companyName: '',
    companyAvatar: '',
    companyLicense: '',
    companyDesc: '',
    status: 0,
    isDelete: false,
    createTime: '',
    updateTime: '',
  },
}

export const useUserStore = create<State & Action>(set => ({
  token: '',
  role: 'genius',
  userInfo: initUserInfo,
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
  },
  logout: async () => {
    await AsyncStorage.setItem('token', '')
    await AsyncStorage.setItem('role', 'genius')

    set(state => ({
      ...state,
      userInfo: initUserInfo,
      token: '',
      role: 'genius',
    }))
  },
  getUserInfo: async () => {
    const userInfo = await request.post({}, {
      url: '/user/info',
    })
    await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo.data))

    return set(state => ({
      ...state,
      userInfo: userInfo.data,
    }))
  },
}))
