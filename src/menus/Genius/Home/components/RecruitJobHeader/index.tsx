import { Space } from '@fruits-chain/react-native-xiaoshu'
import FastImage from 'react-native-fast-image'
import React from 'react'
import { Text, View } from 'react-native'
import { create } from '@/core/styleSheet'
import { IMAGE_PREFIX } from '@/core/constants'
import { themeColor } from '@/core/styleSheet/themeColor'

interface Props {
  title: string
}

function RecruitListHeader(props: Props) {
  const { title } = props
  return (
    <View style={styles.container}>
      <Space direction="horizontal">
        <FastImage style={styles.logo} source={{ uri: `${IMAGE_PREFIX}/stars.png` }}></FastImage>
        <Text style={styles.title}>
          {title}
        </Text>
      </Space>
      {/* <View style={styles.button}>
        <Feather name="bell" size={pxToDp(48)} color="black" />
      </View> */}
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
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  title: {
    height: 80,
    lineHeight: 80,
    fontSize: 42,
    fontWeight: '700',
    color: themeColor.black85,
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

export default RecruitListHeader
