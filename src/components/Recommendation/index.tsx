import { Text, View } from 'react-native'
import React from 'react'
import { Space } from '@fruits-chain/react-native-xiaoshu'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { create } from '@/core/styleSheet'

interface props {
  title?: string
  record?: any
}
export default function index(props: props) {
  const { title, record } = props
  return (
    <View style={styles.box}>
      <Text style={styles.title}>{title}</Text>
      {
        record?.map((item: any, index: number) => (
          <Space key={index} direction="horizontal" style={styles.TCard}>
            <View style={styles.content}>
              <View style={styles.HeaderBody}>
                <View style={styles.Header}>
                  <View style={styles.img}></View>
                  <View style={styles.desc}>
                    <Text>{item.title}</Text>
                    <Text>{item.desc}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.area}>
                <AntDesign name="rest" size={18} color="black" />
                <Text>{item.area}</Text>
              </View>
              <View style={styles.money}>
                <View style={styles.moneyLeft}>
                  <AntDesign name="rest" size={18} color="black" />
                  <Text>{item.money}</Text>
                </View>
                <View>
                  <Text>121</Text>
                </View>
              </View>
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
  TCard: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#F7F7F7',
    height: 256,
    marginBottom: 30,
    padding: 10,
  },
  content: {
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  HeaderBody: {
    height: 124,
    justifyContent: 'center',
  },
  Header: {
    flexDirection: 'row',
  },
  img: {

    width: 90,
    height: 90,
    borderRadius: 25,
    backgroundColor: '#666',
  },
  desc: {
    justifyContent: 'center',
    marginLeft: 20,
  },
  area: {
    flexDirection: 'row',
    height: 68,
  },
  money: {
    width: '100%',
    height: 68,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  moneyLeft: {
    flexDirection: 'row',
    justifyContent: 'center',
    verticalAlign: 'bottom',
  },
})
