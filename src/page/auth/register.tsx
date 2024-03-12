import { Button, Form, NumberInput, PasswordInput } from '@fruits-chain/react-native-xiaoshu'
import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import VerifyCode from '../../core/components/VerifyCodeButton'
import { create, pxToDp } from '@/core/styleSheet'
import { themeColor } from '@/core/styleSheet/themeColor'

function Register() {
  const [form] = Form.useForm()

  const handleLoginClick = () => {
    // router.replace('/(auth)/login')
  }

  const getVerifyCode = async () => {}

  const handleForgetPassword = () => {
    // router.push({
    //   pathname: '/(auth)/(password)/forget-guide',
    // })
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>创建一个免费的账户</Text>
      <Form form={form}>
        <View style={styles.formItem}>
          <Feather name="phone" size={pxToDp(48)} color="#A9A9A9" style={styles.icon} />
          <Form.Item name="phone">
            <NumberInput style={styles.input} placeholder="请输入手机号" inputWidth={pxToDp(420)} />
          </Form.Item>
        </View>
        <View style={styles.formItem}>
          <Feather name="lock" size={pxToDp(48)} color="#A9A9A9" style={styles.icon} />
          <Form.Item name="password">
            <PasswordInput style={styles.input} placeholder="请输入密码" inputWidth={pxToDp(420)} />
          </Form.Item>
        </View>
        <View style={styles.formItem}>
          <Feather name="lock" size={pxToDp(48)} color="#A9A9A9" style={styles.icon} />
          <Form.Item name="password">
            <PasswordInput style={styles.input} placeholder="确认你的密码" inputWidth={pxToDp(420)} />
          </Form.Item>
        </View>
        <View style={styles.formItem}>
          <Feather name="code" size={pxToDp(48)} color="#A9A9A9" style={styles.icon} />
          <Form.Item name="phone">
            <NumberInput style={styles.input} placeholder="请输入验证码" inputWidth={pxToDp(400)} />
          </Form.Item>
          <VerifyCode tel="" getVerifyCode={getVerifyCode} />
        </View>
      </Form>
      <View style={styles.passwordTipWrapper}>
        <Text style={styles.passwordTip} onPress={handleForgetPassword}>忘记了密码？</Text>
      </View>
      <Button type="primary" style={styles.button}>注册</Button>
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
