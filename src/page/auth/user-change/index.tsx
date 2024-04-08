import { Button } from '@fruits-chain/react-native-xiaoshu'
import FastImage from 'react-native-fast-image'
import React from 'react'
import { Text, View } from 'react-native'
import { StackActions, useNavigation } from '@react-navigation/native'
import { useChatContext } from 'react-native-chat-uikit'
import { IMAGE_PREFIX } from '@/core/constants'
import { create } from '@/core/styleSheet'
import { useUserStore } from '@/store/user'

const GUIDE_DATA = {
  genius: {
    title: '你当前的身份是"牛人"',
    button: '切换为"Boss"身份',
    img: 'job_offers.png',
  },
  boss: {
    title: '你当前的身份是"Boss"',
    button: '切换为"牛人"身份',
    img: 'job_hunt.png',
  },
} as const

function UserChange() {
  const userStore = useUserStore()
  const navigation = useNavigation()
  const im = useChatContext()
  const handleContinueClick = async () => {
    if (userStore.userInfo.company && userStore.userInfo.company.status === 1) {
      await im.logout({})

      await userStore.changeUser(userStore.role === 'genius' ? 'boss' : 'genius')

      navigation.dispatch(StackActions.replace(userStore.role === 'genius' ? 'Boss' : 'Genius'))
    }
    else if (userStore.userInfo.company && userStore.userInfo.company.status === 0) {
      navigation.dispatch(StackActions.replace('CompanyInfo'))
    }
    else {
      navigation.dispatch(StackActions.replace('CompanyAuth'))
    }
  }

  return (
    <View style={styles.container}>
      <FastImage
        style={styles.banner}
        source={{
          uri: `${IMAGE_PREFIX}/${GUIDE_DATA[userStore.role]?.img}`,
        }}
      >
      </FastImage>
      <Text style={styles.title}>{GUIDE_DATA[userStore.role]?.title}</Text>
      <Button style={styles.button} onPress={handleContinueClick}>{GUIDE_DATA[userStore.role]?.button}</Button>
    </View>
  )
}

const styles = create({
  container: {
    position: 'relative',
    flex: 1,
    paddingHorizontal: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  banner: {
    width: 630,
    height: 540,
  },
  title: {
    fontSize: 40,
    fontWeight: '700',
  },
  button: {
    width: '90%',
    borderRadius: 40,
    marginTop: 42,
  },
})

export default UserChange
