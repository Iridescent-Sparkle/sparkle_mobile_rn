import { Button, Form, NavBar, NumberInput, PasswordInput, Toast } from '@fruits-chain/react-native-xiaoshu'
import { StackActions, useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Feather from 'react-native-vector-icons/Feather'
import { useUserStore } from '@/store/user'
import { useJobStore } from '@/store/job'
import { themeColor } from '@/core/styleSheet/themeColor'
import { create, pxToDp } from '@/core/styleSheet'
import { IMAGE_PREFIX } from '@/core/constants'

function Login() {
  const [form] = Form.useForm()

  const navigation = useNavigation()

  const userStore = useUserStore()

  const jobStore = useJobStore()

  const insets = useSafeAreaInsets()

  const [loading, setLoading] = useState(false)

  const onPressBackArrow = () => {
    navigation.goBack()
  }

  const handleRegisterClick = () => {
    const replaceAction = StackActions.replace('Register')
    navigation.dispatch(replaceAction)
  }

  const handleForgetPassword = () => {
    const pushAction = StackActions.push('ForgetGuide')
    navigation.dispatch(pushAction)
  }

  const handleLoginClick = async () => {
    try {
      const formValues = await form.validateFields()

      setLoading(true)

      await userStore.login(formValues)

      await userStore.getUserInfo()
      await jobStore.getJobOptions()
    }
    catch (error: any) {
      if (error.code)
        Toast.fail('登录失败，请检查用户名和密码是否正确')
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <View style={[styles.container, { padding: insets.top, bottom: insets.bottom || 12 }]}>
      <NavBar title="登录" onPressBackArrow={onPressBackArrow} />
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <FastImage
            style={styles.logo}
            source={{
              uri: `${IMAGE_PREFIX}/stars.png`,
            }}
          >
          </FastImage>
          <Text style={styles.title}>请登录</Text>
        </View>
        <Form form={form}>
          <View style={styles.formItem}>
            <Feather name="phone" size={pxToDp(48)} color="#A9A9A9" style={styles.icon} />
            <Form.Item name="username" rules={[{ required: true, message: '请输入手机号' }, { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' }]}>
              <NumberInput inputWidth={pxToDp(420)} placeholder="请输入手机号" />
            </Form.Item>
          </View>
          <View style={styles.formItem}>
            <Feather name="lock" size={pxToDp(48)} color="#A9A9A9" style={styles.icon} />
            <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }, { pattern: /^[a-zA-Z0-9]{6,20}$/, message: '请输入6-20位字母或数字' }]}>
              <PasswordInput inputWidth={pxToDp(420)} placeholder="请输入密码" />
            </Form.Item>
          </View>
        </Form>
        <View style={styles.passwordTipWrapper}>
          <Text style={styles.passwordTip} onPress={handleForgetPassword}>忘记了密码？</Text>
        </View>
        <Button type="primary" style={styles.button} onPress={handleLoginClick} loading={loading} loadingText="登录">登录</Button>
        <View style={styles.accountTipWrapper}>
          <Text style={styles.accountTip}>未拥有账户？</Text>
        </View>
        <Button style={styles.button} onPress={handleRegisterClick}>注册</Button>
      </ScrollView>
    </View>
  )
}

const styles = create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    paddingHorizontal: 60,
  },
  header: {
    paddingTop: 60,
    alignItems: 'center',
  },
  title: {
    alignItems: 'center',
    color: themeColor.black85,
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
    color: themeColor.black65,
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
