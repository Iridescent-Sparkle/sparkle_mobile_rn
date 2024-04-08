import { Platform } from 'react-native'

/**
 * @params: null
 * @return: boolean
 * @description:  判断当前机型是否是ios设备
 */
export function isIos() {
  return Platform.OS === 'ios'
}

/**
 * @params: null
 * @return: boolean
 * @description:  判断当前机型是否是Android设备
 */
export function isAndroid() {
  return Platform.OS === 'android'
}

/**
 * @name: isPhone for jsxin
 * @params: tel: string 当前需要验证的手机号
 * @return: boolean
 * @description: 验证传入的手机号是否为真
 */
export function isPhone(tel: string | undefined): boolean {
  if (!tel)
    return false

  const reg = /^1[3-9]\d{9}$/
  return reg.test(tel)
}

export function isEmail(email: string | undefined): boolean {
  if (!email)
    return false

  const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  return reg.test(email)
}

/**
 * @name: isNumber for jsxin
 * @params: num: any 当前需要验证的数据
 * @return: boolean
 * @description: 验证传入的数据是否是数字
 */
export function isNumber(num: any): boolean {
  const reg = /^[0-9]+$/
  return reg.test(num)
}

/**
 * @name: isChinese for jsxin
 * @params: str: string 需要被验证的字符串
 * @return: boolean
 * @description: 验证当前字符串中是否包含了中文
 */
export function isChinese(str: string): boolean {
  const reg = /[\u4E00-\u9FFF]+/g
  return reg.test(str)
}

/**
 * @name: 获取汉字个数
 * @params: str: string 需要被验证的字符串
 * @params: reg: 正则
 * @return: number
 * @description: 返回汉字的个数
 */
export function chineseCount(str: string) {
  const reg = /[\u4E00-\u9FFF]+/g
  let len = 0
  for (let i = 0; i < str.length; i++) {
    const a = str.charAt(i)
    if (a.match(reg) != null)
      len += 1
  }
  return len
}

/**
 * @name: allChinese for jsxin
 * @params: str: string 需要被验证的字符串
 * @return: boolean
 * @description: 当前字符串是否是2-5个全中文
 */
export function allChinese(str: string): boolean {
  const reg = /^[\u4E00-\u9FA5]{2,5}$/
  return reg.test(str)
}
