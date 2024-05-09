import { Button, Form, NavBar, NumberInput, PasswordInput, TextInput, Toast } from '@fruits-chain/react-native-xiaoshu'
import { StackActions, useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Feather from 'react-native-vector-icons/Feather'
import VerifyCode from '../../../core/components/VerifyCodeButton'
import { useUserStore } from '@/store/user'
import { themeColor } from '@/core/styleSheet/themeColor'
import { create, pxToDp } from '@/core/styleSheet'
import { request } from '@/core/api'

function Register() {
  const [form] = Form.useForm()

  const insets = useSafeAreaInsets()

  const navigation = useNavigation()

  const userStore = useUserStore()

  const [phone, setPhone] = useState('')

  const [loading, setLoading] = useState(false)

  const onPressBackArrow = () => {
    navigation.goBack()
  }

  const handleLoginClick = () => {
    const pushAction = StackActions.replace('Login')
    navigation.dispatch(pushAction)
  }

  const handleForgetPassword = () => {
    const pushAction = StackActions.push('ForgetGuide')
    navigation.dispatch(pushAction)
  }

  const handlePhoneChange = (value: string) => {
    setPhone(value)
    return value
  }

  const getVerifyCode = async (phone: string) => {
    const { data } = await request.get({
      phone,
    }, {
      url: '/user/register-smsCode',
    })

    return data.countDown
  }

  const handleRegisterClick = async () => {
    try {
      const formValues = await form.validateFields()
      setLoading(true)
      if (formValues.password !== formValues.confirmPassword) {
        return Toast.fail({
          message: '两次输入的密码不一致',
          duration: 1000,
        })
      }
      await userStore.register({
        username: String(formValues.phone),
        captcha: String(formValues.captcha),
        password: String(formValues.password),
        confirmPassword: String(formValues.confirmPassword),
      })

      await userStore.login({
        username: String(formValues.phone),
        password: String(formValues.password),
      })
    }
    catch (error: any) {
      if (error.code)
        Toast.fail('注册失败')
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <View style={[styles.container, { padding: insets.top, bottom: insets.bottom || 12 }]}>
      <NavBar title="注册账户" onPressBackArrow={onPressBackArrow} />
      <ScrollView style={styles.content}>
        <Text style={styles.title}>创建一个免费的账户</Text>
        <Form form={form}>
          <View style={styles.formItem}>
            <Feather name="phone" size={pxToDp(48)} color="#A9A9A9" style={styles.icon} />
            <Form.Item
              name="phone"
              rules={[
                {
                  required: true,
                  message: '请输入手机号',
                },
                {
                  pattern: /^1[3-9]\d{9}$/,
                  message: '请输入正确的手机号',
                },
              ]}
            >
              <NumberInput style={styles.input} placeholder="请输入手机号" inputWidth={pxToDp(420)} onChange={value => handlePhoneChange(String(value))} />
            </Form.Item>
          </View>
          <View style={styles.formItem}>
            <Feather name="lock" size={pxToDp(48)} color="#A9A9A9" style={styles.icon} />
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: '请输入密码',
                },
                {
                  pattern: /^[a-zA-Z0-9]{6,20}$/,
                  message: '请输入6-20位字母或数字',
                },
              ]}
            >
              <PasswordInput style={styles.input} placeholder="请输入密码" inputWidth={pxToDp(420)} />
            </Form.Item>
          </View>
          <View style={styles.formItem}>
            <Feather name="lock" size={pxToDp(48)} color="#A9A9A9" style={styles.icon} />
            <Form.Item
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: '请确认密码',
                },
                {
                  pattern: /^[a-zA-Z0-9]{6,20}$/,
                  message: '请输入6-20位字母或数字',
                },
              ]}
            >
              <PasswordInput style={styles.input} placeholder="确认你的密码" inputWidth={pxToDp(420)} />
            </Form.Item>
          </View>
          <View style={styles.formItem}>
            <Feather name="code" size={pxToDp(48)} color="#A9A9A9" style={styles.icon} />
            <Form.Item
              name="captcha"
              rules={[
                {
                  required: true,
                  message: '请输入验证码',
                },
                {
                  pattern: /^\d{4}$/,
                  message: '请输入4位数字验证码',
                },
              ]}
            >
              <TextInput style={styles.input} placeholder="请输入验证码" inputWidth={pxToDp(400)} />
            </Form.Item>
            <VerifyCode value={phone} type="phone" getVerifyCode={getVerifyCode} />
          </View>
        </Form>
        <View style={styles.passwordTipWrapper}>
          <Text style={styles.passwordTip} onPress={handleForgetPassword}>忘记了密码？</Text>
        </View>
        <Button type="primary" style={styles.button} onPress={handleRegisterClick} loading={loading} loadingText="注册">注册</Button>
        <View style={styles.accountTipWrapper}>
          <Text style={styles.accountTip}>已拥有账户？</Text>
        </View>
        <Button style={styles.button} onPress={handleLoginClick}>登录</Button>
      </ScrollView>
    </View>
  )
}

const styles = create({
  container: {
    flex: 1,
  },
  content: {
    paddingTop: 60,
    paddingHorizontal: 60,
    backgroundColor: '#fff',
  },
  title: {
    color: themeColor.black85,
    fontSize: 40,
    fontWeight: '700',
    textAlign: 'center',
  },
  logo: {
    width: 160,
    height: 160,
  },
  formItem: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 48,
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
  passwordTipWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 48,
  },
  passwordTip: {
    fontSize: 24,
    color: themeColor.black65,
  },
  accountTipWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 48,
  },
  accountTip: {
    fontSize: 24,
    color: themeColor.black45,
  },
  button: {
    width: '100%',
  },
})
export default Register
