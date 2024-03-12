import { Button, Form, PasswordInput } from '@fruits-chain/react-native-xiaoshu'
import React, { useEffect } from 'react'
import { ScrollView, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import Feather from 'react-native-vector-icons/Feather'
import { IMAGE_PREFIX } from '@/core/constants'
import { create, pxToDp } from '@/core/styleSheet'

function ResetPassword() {
  const [form] = Form.useForm()

  useEffect(() => {
    // navigation.setOptions({
    //   headerTitle: '创建新密码',
    // })
  }, [])

  const handleContinueClick = () => {
    // router.push('/(auth)/(password)/verification-code')
  }

  return (
    <ScrollView style={styles.container}>
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
      </Form>
      <Button style={styles.button} onPress={handleContinueClick}>继续</Button>
    </ScrollView>
  )
}

const styles = create({
  container: {
    flex: 1,
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
