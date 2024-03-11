import { Toast } from '@fruits-chain/react-native-xiaoshu'
import React, { useMemo } from 'react'
import type { TextInputProps } from 'react-native'
import { Text } from 'react-native'
import useCountDown from './useCountDown'
import { isPhone } from '@/core/tools/validator'
import { c, create } from '@/core/styleSheet'
import { useRefState } from '@/core/hooks/useRefState'
import TouchView from '@/core/components/TouchView'

type Props = TextInputProps & {
  tel: string
  getVerifyCode: () => Promise<any>
}

function VerifyCode(props: Props) {
  const { getVerifyCode, tel } = props
  const [countDown, setCountDown, $countDown] = useCountDown()
  const [loading, setLoading, $loading] = useRefState(false)

  async function fetchVerifyCode() {
    if (getVerifyCode && !$loading() && $countDown() <= 0) {
      if (!isPhone(tel)) {
        Toast.fail('请输入正确的手机号')
        return
      }
      try {
        setLoading(true)
        const data = await getVerifyCode()
        setCountDown(data)
      }
      finally {
        setLoading(false)
      }
    }
  }

  const disabled = loading || !!countDown
  const buttonText = useMemo(() => {
    if (loading)
      return '获取中...'

    return countDown ? `${countDown}秒后重新获取` : '获取验证码'
  }, [loading, countDown])

  return (
    <TouchView onPress={fetchVerifyCode}>
      <Text style={[styles.text, disabled && styles.disabled]}>
        {buttonText}
      </Text>
    </TouchView>
  )
}

const styles = create({
  container: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: 30,
    fontWeight: '400',
    justifyContent: 'center',
    alignItems: 'center',
    color: c.black85,
    includeFontPadding: false,
  },
  text: {
    fontSize: 28,
    color: c.primary,
    lineHeight: 44,
    fontWeight: '400',
  },
  disabled: {
    color: c.placeholder,
  },
  rightBox: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  closeIcon: {
    width: 32,
    height: 32,
    marginRight: 24,
  },
})

export default VerifyCode
