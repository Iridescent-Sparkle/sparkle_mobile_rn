import { Button } from '@fruits-chain/react-native-xiaoshu'
import { StackActions, useNavigation } from '@react-navigation/native'
import React from 'react'
import { Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { create } from '@/core/styleSheet'
import { IMAGE_PREFIX } from '@/core/constants'
import { themeColor } from '@/core/styleSheet/themeColor'

function Guide() {
  const navigation = useNavigation()

  const handleRegisterClick = () => {
    const pushAction = StackActions.push('Register')
    navigation.dispatch(pushAction)
  }

  const handleLoginClick = () => {
    const pushAction = StackActions.push('Login')
    navigation.dispatch(pushAction)
  }

  return (
    <View style={styles.container}>
      <FastImage style={styles.banner} source={{ uri: `${IMAGE_PREFIX}/mobile_login.png` }}></FastImage>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>欢迎</Text>
        <Text style={styles.subTitle}>
          搜索职位找到你梦想中的职业!
        </Text>
      </View>
      <View style={styles.buttonWrapper}>
        <Button style={styles.button} onPress={handleRegisterClick}>注册</Button>
        <Button style={styles.button} onPress={handleLoginClick}>登录</Button>
      </View>
    </View>
  )
}

const styles = create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 200,
    paddingHorizontal: 48,
    backgroundColor: '#fff',
  },
  banner: {
    width: 630,
    height: 540,
  },
  titleWrapper: {
    marginBottom: 96,
  },
  title: {
    textAlign: 'left',
    fontSize: 40,
    color: themeColor.black85,
    fontWeight: '700',
    marginBottom: 42,
  },
  subTitle: {
    textAlign: 'left',
    fontSize: 36,
    color: themeColor.black85,
    fontWeight: '700',
  },
  buttonWrapper: {
    width: '100%',
    paddingHorizontal: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: 244,
  },
})

export default Guide
