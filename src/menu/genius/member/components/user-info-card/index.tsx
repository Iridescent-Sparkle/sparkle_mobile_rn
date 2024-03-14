import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import React, { useContext } from 'react'
import { Pressable, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { Space } from '@fruits-chain/react-native-xiaoshu'
import Feather from 'react-native-vector-icons/Feather'
import { NavigationContext } from '@react-navigation/native'
import { create, pxToDp } from '@/core/styleSheet'
import { IMAGE_PREFIX } from '@/core/constants'
import { themeColor } from '@/core/styleSheet/themeColor'

function MemberUserCard() {
  const navigation = useContext(NavigationContext)

  const handleUserClick = () => {
    navigation!.navigate('GeniusUpdateProfile')
  }

  const handleSettingClick = () => {
    navigation!.navigate('Setting')
  }

  return (
    <View style={styles.container}>
      <Pressable style={styles.nameWrapper} onPress={handleUserClick}>
        <FastImage style={styles.avatar} source={{ uri: `${IMAGE_PREFIX}/stars.png` }}></FastImage>
        <Space>
          <Text style={styles.name}>Andrew</Text>
          <Text style={styles.work}>UI/UX Designer</Text>
        </Space>
        <FontAwesome6 name="pen-to-square" size={pxToDp(30)} color={themeColor.primary} />
      </Pressable>
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
