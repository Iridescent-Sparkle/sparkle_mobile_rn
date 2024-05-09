import { Button, Form, TextInput, Toast } from '@fruits-chain/react-native-xiaoshu'
import React, { Fragment, useState } from 'react'
import { Text, View } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import VerifyCode from '../../../core/components/VerifyCodeButton'
import { useUserStore } from '@/store/user'
import { create, pxToDp } from '@/core/styleSheet'
import Page from '@/core/components/Page'
import { request } from '@/core/api'
import { themeColor } from '@/core/styleSheet/themeColor'

function BindEmail() {
  const [form] = Form.useForm()

  const userStore = useUserStore()

  const [email, setEmail] = useState('')

  const [loading, setLoading] = useState(false)

  const handlePhoneChange = (value: string) => {
    setEmail(value)
    return value
  }

  const getVerifyCode = async (email: string) => {
    const { data } = await request.get({ email }, {
      url: '/user/register-emailCode',
    })

    return data.countDown
  }

  const handleRegisterClick = async () => {
    try {
      const formValues = await form.validateFields()
      setLoading(true)
      await request.post(formValues, {
        url: '/user/email/bind',
      })
      await userStore.getUserInfo()
      Toast.success('绑定成功')
    }
    catch (error: any) {
      if (error.code)
        Toast.fail('绑定失败')
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <Page title="绑定邮箱">
      {
      userStore.userInfo.email
        ? (
          <Text style={styles.email}>{`您已绑定邮箱 ${userStore.userInfo.email}，暂不支持修改`}</Text>
          )
        : (
          <Fragment>
            <Form form={form}>
              <View style={styles.formItem}>
                <MaterialCommunityIcons name="email-outline" color="#A9A9A9" size={pxToDp(48)} style={styles.icon} />
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: '请输入邮箱',
                    },
                    {
                      pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
                      message: '请输入正确的邮箱',
                    },
                  ]}
                >
                  <TextInput style={styles.input} placeholder="请输入邮箱" inputWidth={pxToDp(420)} onChange={value => handlePhoneChange(String(value))} />
                </Form.Item>
              </View>
              <View style={styles.formItem}>
                <Feather name="code" size={pxToDp(48)} color="#A9A9A9" style={styles.icon} />
                <Form.Item
                  name="code"
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
                <VerifyCode value={email} type="email" getVerifyCode={getVerifyCode} />
              </View>
            </Form>
            <Button type="primary" style={styles.button} onPress={handleRegisterClick} loading={loading} loadingText="添加绑定">添加绑定</Button>
          </Fragment>
          )
    }
    </Page>
  )
}

const styles = create({
  email: {
    textAlign: 'center',
    fontSize: 32,
    color: themeColor.black85,
    marginTop: 72,
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
    marginTop: 32,
  },
})
export default BindEmail
