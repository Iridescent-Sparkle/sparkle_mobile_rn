import { request } from '@/core/api'
import Page from '@/core/components/Page'
import useCountDown from '@/core/components/VerifyCodeButton/useCountDown'
import { create, pxToDp } from '@/core/styleSheet'
import { themeColor } from '@/core/styleSheet/themeColor'
import { useUserStore } from '@/store/user'
import { Button, Space, Toast } from '@fruits-chain/react-native-xiaoshu'
import { StackActions, useNavigation, useRoute } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { KeyboardAvoidingView, Text } from 'react-native'
import VerifyCodeCard from '../../../core/components/VerifyCodeCard'

function VerifyCodeForm() {
  const navigation = useNavigation()

  const userStore = useUserStore()

  const route = useRoute<{ key: any, name: any, params: { value: string, type: 'email' | 'phone' } }>()

  const [code, setCode] = useState('')

  const [confrimLoading, setConfrimLoading] = useState(false)

  const [countDown, setCountDown] = useCountDown()

  useEffect(() => {
    handleGetVerifyCode()
  }, [route.params.type, route.params.value])

  const handleGetVerifyCode = async () => {
    try {
      const { data } = route.params.type === 'phone'
        ? await request.get({
          phone: route.params.value,
        }, {
          url: '/user/register-smsCode',
        })
        : await request.get({
          email: route.params.value,
        }, {
          url: '/user/register-emailCode',
        })

      setCountDown(Number(data.countDown))
    }
    catch {
      Toast.fail('获取验证码失败，请稍后再试')
    }
  }

  const handleConfrimClick = async () => {
    try {
      if (!code) {
        Toast.fail('请输入验证码')
        return
      }

      if (code.length !== 4) {
        Toast.fail('请输入4位验证码')
        return
      }
      setConfrimLoading(true)

      route.params.type === 'phone'
        ? await request.post({
          phone: route.params.value,
          code,
        }, {
          url: '/user/validate/sms',
        })
        : await request.post({
          email: route.params.value,
          code,
        }, {
          url: '/user/validate/email',
        })

      navigation.dispatch(StackActions.replace('ResetPassword', { phone: userStore.userInfo.username }))
    }
    catch (error) {
      Toast.fail('验证码错误')
    }
    finally {
      setConfrimLoading(false)
    }
  }

  return (
    <Page title="验证码">
      <KeyboardAvoidingView style={styles.body}>
        <Space gap={pxToDp(112)} style={styles.code}>
          <Text style={styles.text}>
            {` 验证码已发送至 ${route.params.value}`}
          </Text>
          <VerifyCodeCard onChange={value => setCode(value)}></VerifyCodeCard>
          <Space direction="horizontal" style={styles.textWrapper}>
            <Text style={styles.seconds} onPress={handleGetVerifyCode}>
              {countDown ? `${countDown}秒后重新获取` : '点击重新获取验证码'}
            </Text>
          </Space>
        </Space>
        <Button style={styles.button} onPress={handleConfrimClick} loading={confrimLoading} loadingText="确认">确认</Button>
      </KeyboardAvoidingView>
    </Page>
  )
}

const styles = create({
  body: {
    height: '100%',
    paddingVertical: 48,
  },
  title: {
    color: themeColor.black85,
    fontSize: 40,
    fontWeight: '700',
    marginTop: 48,
    textAlign: 'center',
  },
  formItem: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 48,
    padding: 24,
    borderWidth: 4,
    borderColor: '#F4F4F4',
    borderRadius: 28,
  },
  input: {
    width: 460,
  },
  icon: {
    marginRight: 24,
  },
  button: {
    width: '100%',
    borderRadius: 40,
    marginTop: 48,
  },
  code: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontSize: 32,
    color: themeColor.black85,
    textAlign: 'center',
    fontWeight: '700',
  },
  textWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  seconds: {
    fontSize: 32,
    color: themeColor.primary,
  },
})

export default VerifyCodeForm
