import Feather from 'react-native-vector-icons/Feather'
import { Button, Form, NumberInput } from '@fruits-chain/react-native-xiaoshu'
import React, { useEffect } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { create, pxToDp } from '@/core/styleSheet'

function ForgetGuide() {
  const navigation = useNavigation()
  const [form] = Form.useForm()

  useEffect(() => {
    navigation.setOptions({
      headerTitle: '忘记密码',
    })
  }, [])

  const handleContinueClick = () => {
    // router.push('/(auth)/(password)/verification-code')
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>现在重置你的密码</Text>
      <Form form={form}>
        <View style={styles.formItem}>
          <Feather name="phone" size={pxToDp(48)} color="#A9A9A9" style={styles.icon} />
          <Form.Item name="phone">
            <NumberInput inputWidth={pxToDp(420)} placeholder="请输入手机号" />
          </Form.Item>
        </View>
      </Form>
      <Button style={styles.button} onPress={handleContinueClick}>发送验证码</Button>
    </ScrollView>
  )
}

const styles = create({
  container: {
    flex: 1,
    paddingHorizontal: 40,
  },
  title: {
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
})

export default ForgetGuide
