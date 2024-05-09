import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { request } from '@/core/api'

interface State {
  accessToken: string
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
  accessToken: '',
  role: 'genius',
  userInfo: initUserInfo,
  setData: (params) => {
    set(state => ({
      ...state,
      ...params,
    }))
  },
  initData: async () => {
    const accessToken = await AsyncStorage.getItem('accessToken') || ''
    const role = <'boss' | 'genius'>(await AsyncStorage.getItem('role') || 'genius')
    set(state => ({
      ...state,
      accessToken,
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

    await AsyncStorage.setItem('accessToken', loginRes.data.accessToken || '')
    await AsyncStorage.setItem('refreshToken', loginRes.data.refreshToken || '')

    return set((state) => {
      return {
        ...state,
        accessToken: loginRes.data.accessToken,
      }
    })
  },
  logout: async () => {
    await AsyncStorage.setItem('accessToken', '')
    await AsyncStorage.setItem('role', 'genius')
    await AsyncStorage.setItem('refreshToken', '')

    set(state => ({
      ...state,
      userInfo: initUserInfo,
      accessToken: '',
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
