import { Space } from '@fruits-chain/react-native-xiaoshu'
import { StackActions, useNavigation } from '@react-navigation/native'
import React from 'react'
import { Modal, Pressable, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import ImageViewer from 'react-native-image-zoom-viewer'
import { useUserStore } from '../../../../../store/user/index'
import { themeColor } from '@/core/styleSheet/themeColor'
import { create, pxToDp } from '@/core/styleSheet'
import { IMAGE_PREFIX } from '@/core/constants'
import ImagePreview from '@/core/components/ImagePreview'

function MemberUserCard() {
  const userStore = useUserStore()
  const navigation = useNavigation()

  const handleSettingClick = () => {
    navigation.dispatch(StackActions.push('Setting'))
  }
  const handleEditClick = () => {
    navigation.dispatch(StackActions.push('GeniusUpdateProfile'))
  }
  return (
    <View style={styles.container}>
      <View style={styles.nameWrapper}>
        <ImagePreview style={styles.avatar} url={userStore.userInfo.avatar || `${IMAGE_PREFIX}/stars.png`} />
        <Space>
          <Text style={styles.name}>{userStore.userInfo.nickname}</Text>
          <Text style={styles.work}>{userStore.userInfo.occupation}</Text>
        </Space>
        <Pressable onPress={handleEditClick} hitSlop={20}>
          <FontAwesome6 name="pen-to-square" size={pxToDp(30)} color={themeColor.primary} />
        </Pressable>
      </View>
      <Pressable style={styles.button} onPress={handleSettingClick}>
        <Feather name="settings" size={pxToDp(46)} color={themeColor.black85} />
      </Pressable>
    </View>
  )
}

const styles = create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 168,
    marginHorizontal: 32,
    borderBottomWidth: 4,
    borderBottomColor: '#F2F2F2',
  },
  avatar: {
    width: 108,
    height: 108,
    borderRadius: 54,
  },
  nameWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  name: {
    fontSize: 38,
    fontWeight: '700',
    color: themeColor.black85,
  },
  work: {
    fontSize: 28,
    color: themeColor.black65,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 80,
  },
})

export default MemberUserCard
