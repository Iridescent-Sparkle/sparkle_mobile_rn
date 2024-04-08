import { Button, Form, NavBar, PasswordInput, Toast } from '@fruits-chain/react-native-xiaoshu'
import { StackActions, useNavigation, useRoute } from '@react-navigation/native'
import React, { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import Feather from 'react-native-vector-icons/Feather'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { create, pxToDp } from '@/core/styleSheet'
import { IMAGE_PREFIX } from '@/core/constants'
import { request } from '@/core/api'
import { themeColor } from '@/core/styleSheet/themeColor'

function ResetPassword() {
  const insets = useSafeAreaInsets()

  const [form] = Form.useForm()

  const navigation = useNavigation()

  const route = useRoute<{ key: any, name: any, params: { phone: string } }>()

  const [loading, setLoading] = useState(false)

  const handleConfrimClick = async () => {
    try {
      const formValues = await form.validateFields()
      setLoading(true)
      if (formValues.password !== formValues.confirmPassword) {
        return Toast.fail({
          message: '两次输入的密码不一致',
          duration: 1000,
        })
      }
      await request.post({
        username: route.params.phone,
        password: formValues.password,
      }, {
        url: '/user/resetPassword',
      })
      Toast.success({
        message: '密码重置成功',
        duration: 1000,
        onClose: () => {
          navigation.dispatch(StackActions.replace('Login'))
        },
      })
    }
    catch (error: any) {
      if (error.code)
        Toast.fail('密码重置失败，请稍后再试')
    }
    finally {
      setLoading(false)
    }
  }

  const onPressBackArrow = () => {
    navigation.goBack()
  }

  return (
    <View style={[styles.container, { padding: insets.top, bottom: insets.bottom || 12 }]}>
      <NavBar title="忘记密码" onPressBackArrow={onPressBackArrow} />
      <ScrollView style={styles.content}>
        <View style={styles.bannerWrapper}>
          <FastImage
            style={styles.banner}
            source={{
              uri: `${IMAGE_PREFIX}/authentication.png`,
            }}
          >
          </FastImage>
        </View>
        <Text style={styles.title}>创建您的新密码</Text>
        <Form form={form}>
          <View style={styles.formItem}>
            <Feather name="lock" size={pxToDp(48)} color="#A9A9A9" style={styles.icon} />
            <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }, { pattern: /^[a-zA-Z0-9]{6,20}$/, message: '请输入6-20位字母或数字' }]}>
              <PasswordInput style={styles.input} placeholder="请输入密码" inputWidth={pxToDp(420)} />
            </Form.Item>
          </View>
          <View style={styles.formItem}>
            <Feather name="lock" size={pxToDp(48)} color="#A9A9A9" style={styles.icon} />
            <Form.Item name="confirmPassword" rules={[{ required: true, message: '请确认密码' }, { pattern: /^[a-zA-Z0-9]{6,20}$/, message: '请输入6-20位字母或数字' }]}>
              <PasswordInput style={styles.input} placeholder="确认你的密码" inputWidth={pxToDp(420)} />
            </Form.Item>
          </View>
        </Form>
        <Button style={styles.button} onPress={handleConfrimClick} loading={loading} loadingText="提交">提交</Button>
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
    paddingHorizontal: 40,
  },
  bannerWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  banner: {
    width: 630,
    height: 540,
    marginVertical: 100,
  },
  title: {
    color: themeColor.black85,
    fontSize: 40,
    fontWeight: '700',
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
  button: {
    width: '100%',
    borderRadius: 40,
    marginVertical: 80,
  },
})

export default ResetPassword
