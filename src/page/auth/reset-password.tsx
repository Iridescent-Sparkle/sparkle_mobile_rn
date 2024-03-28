import { Button, Form, PasswordInput } from '@fruits-chain/react-native-xiaoshu'
import { StackActions, useNavigation, useRoute } from '@react-navigation/native'
import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import Feather from 'react-native-vector-icons/Feather'
import { create, pxToDp } from '@/core/styleSheet'
import { IMAGE_PREFIX } from '@/core/constants'
import { request } from '@/core/api'

function ResetPassword() {
  const [form] = Form.useForm()
  const route = useRoute()
  const navigation = useNavigation()
  const handleConfrimClick = async () => {
    const formValues = await form.validateFields()

    await request.post({
      username: route.params!.phone,
      password: formValues.password,
    }, {
      url: '/user/resetPassword',
    })
    navigation.dispatch(StackActions.replace('Login'))
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
          <Form.Item name="confirmPassword">
            <PasswordInput style={styles.input} placeholder="确认你的密码" inputWidth={pxToDp(420)} />
          </Form.Item>
        </View>
      </Form>
      <Button style={styles.button} onPress={handleConfrimClick}>提交</Button>
    </ScrollView>
  )
}

const styles = create({
  container: {
    flex: 1,
    paddingHorizontal: 40,
    backgroundColor: '#fff',
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
