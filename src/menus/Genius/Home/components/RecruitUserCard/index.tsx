import Feather from 'react-native-vector-icons/Feather'
import React from 'react'
import { Pressable, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { Space } from '@fruits-chain/react-native-xiaoshu'
import { StackActions, useNavigation } from '@react-navigation/native'
import { create, pxToDp } from '@/core/styleSheet'
import { IMAGE_PREFIX } from '@/core/constants'
import { themeColor } from '@/core/styleSheet/themeColor'
import { useUserStore } from '@/store/user'

function UserCard() {
  const userStore = useUserStore()

  const navigation = useNavigation()

  const tip = (function () {
    const date = new Date()
    const hours = date.getHours()

    if (hours >= 6 && hours < 12)
      return '早上好'
    else if (hours >= 12 && hours < 18)
      return '下午好'
    else
      return '晚上好'
  })()

  const handleSettingClick = () => {
    navigation.dispatch(StackActions.push('Setting'))
  }
  return (
    <View style={styles.container}>
      <Space direction="horizontal">
        <FastImage style={styles.avatar} source={{ uri: `${IMAGE_PREFIX}/stars.png` }}></FastImage>
        <View>
          <Text style={styles.tip}>{tip}</Text>
          <Text style={styles.name}>{userStore.userInfo.nickname}</Text>
        </View>
      </Space>
      <Pressable style={styles.button} onPress={handleSettingClick}>
        <Feather name="settings" size={pxToDp(46)} color={themeColor.black85} />
      </Pressable>
    </View>
  )
}

const styles = create({
  container: {
    flexDirection: 'row',
    height: 164,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  tip: {
    fontSize: 30,
    color: themeColor.black65,
  },
  name: {
    fontSize: 36,
    fontWeight: '700',
    color: themeColor.black85,
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default UserCard
