import { request } from '../..'

export async function register(params: { username: string, captcha: string, confirmPassword: string, password: string, phone: string }) {
  const res = await request.post(params, {
    url: '/user/register',
  })
  return res
}
export async function login(params: { username: string, password: string }) {
  const res = await request.post(params, {
    url: '/user/login',
  })
  return res
}

export async function getSmsCode(params: { phone: string }) {
  const res = await request.get({
    phone: params.phone,
  }, {
    url: '/user/register-smsCode',
  })

  return res.data
}
export async function validateSmsCode(params: { phone: string, code: string }) {
  const res = await request.post(params, {
    url: '/user/validateSmsCode',
  })

  return res.data
}
export async function resetPassword(params: { username: string, password: string }) {
  const res = await request.post(params, {
    url: '/user/resetPassword',
  })

  return res.data
}
