import { Button, Form, NumberInput, PasswordInput, TextInput } from '@fruits-chain/react-native-xiaoshu'
import React, { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import { StackActions, useNavigation } from '@react-navigation/native'
import VerifyCode from '../../core/components/VerifyCodeButton'
import { create, pxToDp } from '@/core/styleSheet'
import { themeColor } from '@/core/styleSheet/themeColor'
import { getSmsCode } from '@/core/api/request/auth'
import { useAppStore } from '@/store'

function Register() {
  const [form] = Form.useForm()
  const navigation = useNavigation()
  const [phone, setPhone] = useState('')
  const appStore = useAppStore()

  const handleLoginClick = () => {
    const pushAction = StackActions.replace('Login')
    navigation.dispatch(pushAction)
  }

  const handleForgetPassword = () => {
    const pushAction = StackActions.push('ForgetGuide')
    navigation.dispatch(pushAction)
  }

  const handlePhoneChange = (value: number) => {
    setPhone(String(value))
    return value
  }

  const getVerifyCode = async () => {
    const phone = form.getFieldValue('phone')
    const data = await getSmsCode({ phone })
    return data.countDown
  }

  const handleRegisterClick = async () => {
    const formValues = await form.validateFields()
    // await appStore.register({
    //   phone: String(formValues.phone),
    //   username: String(formValues.phone),
    //   captcha: String(formValues.captcha),
    //   password: String(formValues.password),
    //   confirmPassword: String(formValues.confirmPassword),
    // })
    await appStore.login({
      username: String(formValues.phone),
      password: String(formValues.password),
    })
  }

  return (
    <ScrollView style={styles.container}>
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
            ]}
          >
            <NumberInput style={styles.input} placeholder="请输入手机号" inputWidth={pxToDp(420)} onChange={handlePhoneChange} />
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
                message: '请确认你的密码',
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
            ]}
          >
            <TextInput style={styles.input} placeholder="请输入验证码" inputWidth={pxToDp(400)} />
          </Form.Item>
          <VerifyCode tel={phone} getVerifyCode={getVerifyCode} />
        </View>
      </Form>
      <View style={styles.passwordTipWrapper}>
        <Text style={styles.passwordTip} onPress={handleForgetPassword}>忘记了密码？</Text>
      </View>
      <Button type="primary" style={styles.button} onPress={handleRegisterClick}>注册</Button>
      <View style={styles.accountTipWrapper}>
        <Text style={styles.accountTip}>已拥有账户？</Text>
      </View>
      <Button style={styles.button} onPress={handleLoginClick}>登录</Button>
    </ScrollView>
  )
}

const styles = create({
  container: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 60,
    backgroundColor: '#fff',
  },
  title: {
    marginTop: 48,
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
