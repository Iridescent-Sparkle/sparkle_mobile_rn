import { Button, Form, NumberInput, PasswordInput } from '@fruits-chain/react-native-xiaoshu'
import React from 'react'
import { Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import Feather from 'react-native-vector-icons/Feather'
import { IMAGE_PREFIX } from '@/core/constants'
import { create, pxToDp } from '@/core/styleSheet'
import { themeColor } from '@/core/styleSheet/themeColor'

function Login() {
  const [form] = Form.useForm()

  const handleRegisterClick = () => {
    // router.replace('/(auth)/register')
  }

  const handleForgetPassword = () => {
    // router.push({
    //   pathname: '/(auth)/(password)/reset-guide',
    //   params: {
    //     title: '修改密码',
    //   },
    // })
  }

  return (
    <View style={styles.container}>
      <FastImage
        style={styles.logo}
        source={{
          uri: `${IMAGE_PREFIX}/stars.png`,
        }}
      >
      </FastImage>
      <Text style={styles.title}>请登录</Text>
      <Form form={form}>
        <View style={styles.formItem}>
          <Feather name="phone" size={pxToDp(48)} color="#A9A9A9" style={styles.icon} />
          <Form.Item name="phone">
            <NumberInput inputWidth={pxToDp(420)} placeholder="请输入手机号" />
          </Form.Item>
        </View>
        <View style={styles.formItem}>
          <Feather name="lock" size={pxToDp(48)} color="#A9A9A9" style={styles.icon} />
          <Form.Item name="password">
            <PasswordInput inputWidth={pxToDp(420)} placeholder="请输入密码" />
          </Form.Item>
        </View>
      </Form>
      <View style={styles.passwordTipWrapper}>
        <Text style={styles.passwordTip} onPress={handleForgetPassword}>忘记了密码？</Text>
      </View>
      <Button type="primary" style={styles.button}>登录</Button>
      <View style={styles.accountTipWrapper}>
        <Text style={styles.accountTip}>未拥有账户？</Text>
      </View>
      <Button style={styles.button} onPress={handleRegisterClick}>注册</Button>
    </View>
  )
}

const styles = create({
  container: {
    flex: 1,
    paddingTop: 200,
    paddingHorizontal: 60,
    alignItems: 'center',
  },
  title: {
    marginTop: 16,
    fontSize: 40,
    fontWeight: '700',
  },
  logo: {
    width: 160,
    height: 160,
  },
  formItem: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 64,
    padding: 24,
    borderWidth: 4,
    borderColor: '#F4F4F4',
    borderRadius: 28,
  },
  icon: {
    marginRight: 24,
  },
  passwordTipWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 48,
    marginBottom: 72,
  },
  passwordTip: {
    fontSize: 24,
  },
  accountTipWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 64,
    marginBottom: 44,
  },
  accountTip: {
    fontSize: 24,
    color: themeColor.black45,
  },
  button: {
    width: '100%',
  },
})
export default Login
