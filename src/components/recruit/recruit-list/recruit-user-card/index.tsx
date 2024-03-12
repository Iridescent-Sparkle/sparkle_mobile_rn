import Feather from 'react-native-vector-icons/Feather'
import React from 'react'
import { Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { Space } from '@fruits-chain/react-native-xiaoshu'
import { create, pxToDp } from '@/core/styleSheet'
import { IMAGE_PREFIX } from '@/core/constants'
import { themeColor } from '@/core/styleSheet/themeColor'

function UserCard() {
  return (
    <View style={styles.container}>
      <Space direction="horizontal">
        <FastImage style={styles.avatar} source={{ uri: `${IMAGE_PREFIX}/stars.png` }}></FastImage>
        <View>
          <Text style={styles.tip}>早上好</Text>
          <Text style={styles.name}>Andrew</Text>
        </View>
      </Space>
      <View style={styles.button}>
        <Feather name="bell" size={pxToDp(48)} color="black" />
      </View>
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
