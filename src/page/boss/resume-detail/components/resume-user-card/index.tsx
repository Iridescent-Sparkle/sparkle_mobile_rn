import { Space } from '@fruits-chain/react-native-xiaoshu'
import { NavigationContext } from '@react-navigation/native'
import React, { useContext } from 'react'
import { Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { themeColor } from '@/core/styleSheet/themeColor'
import { create } from '@/core/styleSheet'
import { IMAGE_PREFIX } from '@/core/constants'

function ResumeUserCard() {
  return (
    <View style={styles.container}>
      <Space>
        <Text style={styles.name}>Andrew</Text>
        <Text style={styles.work}>UI/UX Designer</Text>
      </Space>
      <FastImage style={styles.avatar} source={{ uri: `${IMAGE_PREFIX}/stars.png` }}></FastImage>
    </View>
  )
}

const styles = create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 168,

    borderBottomWidth: 4,

    borderBottomColor: '#F2F2F2',
  },
  avatar: {
    width: 108,
    height: 108,
    borderRadius: 54,
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

export default ResumeUserCard
