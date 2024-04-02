import { Text, View } from 'react-native'
import React from 'react'
import { Space } from '@fruits-chain/react-native-xiaoshu'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { create } from '@/core/styleSheet'

interface props {
  title?: string
  record?: any[]
}
export default function index(props: props) {
  const { title, record } = props
  return (
    <View style={styles.box}>
      <Text style={styles.title}>{title}</Text>
      {
        record?.map((text, index) => (
          <Space key={index} direction="horizontal" style={styles.Tlist}>
            <View style={styles.TOlist}>
              <Text style={styles.rTitle}>{text?.title}</Text>
              <Text style={styles.desc}>{text?.desc}</Text>
            </View>
            <View>
              <AntDesign name="right" size={20} color="#ADADAD" />
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
  Tlist: {
    justifyContent: 'space-between',
  },
  TOlist: {
    flexDirection: 'column',
    height: 100,
    alignContent: 'space-between',
  },
  rTitle: {
    color: '#2A3A49',
  },
  desc: {
    fontSize: 18,
  },
})
