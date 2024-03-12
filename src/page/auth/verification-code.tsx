import { Button, Space } from '@fruits-chain/react-native-xiaoshu'
import React, { useEffect } from 'react'
import { KeyboardAvoidingView, Text } from 'react-native'
import VerifyCodeCard from '../../core/components/VerifyCodeCard'
import { create, pxToDp } from '@/core/styleSheet'

function VerificationCode() {
  // const router = useRouter()
  // const navigation = useNavigation()

  useEffect(() => {
    // navigation.setOptions({
    //   headerTitle: '验证码',
    // })
  }, [])

  const handleContinueClick = () => {
    // router.replace('/(auth)/(password)/reset-password')
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Space gap={pxToDp(112)} style={styles.code}>
        <Text style={styles.text}>验证码已发送至+86 18398527538</Text>
        <VerifyCodeCard></VerifyCodeCard>
        <Space direction="horizontal" style={styles.textWrapper}>
          <Text style={styles.seconds}>55</Text>
          <Text style={styles.text}>秒后重新获取</Text>
        </Space>
      </Space>
      <Button style={styles.button} onPress={handleContinueClick}>确认</Button>
    </KeyboardAvoidingView>
  )
}

const styles = create({
  container: {
    flex: 1,
    paddingHorizontal: 40,
    justifyContent: 'space-between',
  },
  code: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontSize: 32,
    textAlign: 'center',
  },
  textWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  seconds: {
    fontSize: 32,
    color: '#296EFD',
  },
  button: {
    width: '100%',
    borderRadius: 40,
    marginBottom: 140,
  },
})

export default VerificationCode
