import { Button, NavBar, NumberInput, Space, Toast } from '@fruits-chain/react-native-xiaoshu'
import { StackActions, useNavigation } from '@react-navigation/native'
import { Fragment, useState } from 'react'
import { KeyboardAvoidingView, ScrollView, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Feather from 'react-native-vector-icons/Feather'
import VerifyCodeCard from '../../../core/components/VerifyCodeCard'
import { isPhone } from '@/core/tools/validator'
import { themeColor } from '@/core/styleSheet/themeColor'
import { create, pxToDp } from '@/core/styleSheet'
import useCountDown from '@/core/components/VerifyCodeButton/useCountDown'
import { request } from '@/core/api'

function ForgetGuide() {
  const insets = useSafeAreaInsets()

  const navigation = useNavigation()

  const [phone, setPhone] = useState('')

  const [code, setCode] = useState('')

  const [showVerificationCode, setShowVerificationCode] = useState(false)

  const [getCodeLoading, setGetCodeLoading] = useState(false)

  const [confrimLoading, setConfrimLoading] = useState(false)

  const [countDown, setCountDown, $countDown] = useCountDown()

  const onPressBackArrow = () => {
    if (showVerificationCode)
      setShowVerificationCode(false)
    else
      navigation.goBack()
  }

  const handleGetSmsCode = async () => {
    if ($countDown() <= 0) {
      if (!isPhone(phone)) {
        Toast.fail('请输入正确的手机号')
        return
      }
      try {
        setGetCodeLoading(true)

        const { data } = await request.get({
          phone,
        }, {
          url: '/user/register-smsCode',
        })

        setCountDown(Number(data.countDown))

        setShowVerificationCode(true)
      }
      catch {
        Toast.fail('获取验证码失败，请稍后再试')
      }
      finally {
        setGetCodeLoading(false)
      }
    }
    else {
      setShowVerificationCode(true)
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

      await request.post({ phone, code }, {
        url: '/user/validate/sms',
      })

      navigation.dispatch(StackActions.replace('ResetPassword', { phone }))
    }
    catch (error) {
      Toast.fail('验证码错误')
    }
    finally {
      setConfrimLoading(false)
    }
  }

  return (
    <Fragment>
      {showVerificationCode
        ? (
          <View style={[styles.container, { padding: insets.top, bottom: insets.bottom || 12 }]}>
            <NavBar title="忘记密码" onPressBackArrow={onPressBackArrow} />
            <KeyboardAvoidingView style={styles.body}>
              <Space gap={pxToDp(112)} style={styles.code}>
                <Text style={styles.text}>
                  {` 验证码已发送至 ${phone}`}
                </Text>
                <VerifyCodeCard onChange={value => setCode(value)}></VerifyCodeCard>
                <Space direction="horizontal" style={styles.textWrapper}>
                  <Text style={styles.seconds} onPress={handleGetSmsCode}>
                    {countDown ? `${countDown}秒后重新获取` : '点击重新获取验证码'}
                  </Text>
                </Space>
              </Space>
              <Button style={styles.button} onPress={handleConfrimClick} loading={confrimLoading} loadingText="确认">确认</Button>
            </KeyboardAvoidingView>
          </View>
          )
        : (
          <View style={[styles.container, { padding: insets.top, bottom: insets.bottom || 12 }]}>
            <NavBar title="验证码" onPressBackArrow={onPressBackArrow} />
            <ScrollView style={styles.body}>
              <Text style={styles.title}>现在重置你的密码</Text>
              <View style={styles.formItem}>
                <Feather name="phone" size={pxToDp(48)} color="#A9A9A9" style={styles.icon} />
                <NumberInput inputWidth={pxToDp(420)} placeholder="请输入手机号" onChange={value => setPhone(String(value))} />
              </View>
              <Button style={styles.button} onPress={handleGetSmsCode} loading={getCodeLoading} loadingText="发送验证码">发送验证码</Button>
            </ScrollView>
          </View>
          ) }
    </Fragment>
  )
}

const styles = create({
  container: {
    flex: 1,
    paddingHorizontal: 0,
    backgroundColor: '#fff',
  },
  body: {
    paddingHorizontal: 44,
    flex: 1,
    backgroundColor: '#fff',
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

export default ForgetGuide
