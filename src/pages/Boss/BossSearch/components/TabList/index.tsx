import { Text, View } from 'react-native'
import React from 'react'
import { Space } from '@fruits-chain/react-native-xiaoshu'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { create } from '@/core/styleSheet'

interface props {
  title: string
  data: any[]
}
export default function TabList(props: props) {
  const { title, data } = props
  return (
    <View style={styles.box}>
      {!!data.length && <Text style={styles.title}>{title}</Text>}
      {
        data?.map((item, index) => (
          <Space key={index} direction="horizontal" style={styles.listWrapper}>
            <View style={styles.titleWrapper}>
              <Text style={styles.itemTitle}>{item}</Text>
            </View>
            <View>
              <AntDesign name="right" size={20} color="#2A3A49" />
            </View>
          </Space>
        ))
      }
    </View>
  )
}
const styles = create({
  box: {
    width: 624,
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    color: '#B8B8B8',
    marginBottom: 20,
  },
  listWrapper: {
    justifyContent: 'space-between',
  },
  titleWrapper: {
    flexDirection: 'column',
    height: 100,
    alignContent: 'space-between',
  },
  itemTitle: {
    color: '#2A3A49',
    fontWeight: '700',
    fontSize: 32,
  },
  desc: {
    fontSize: 18,
  },
})
