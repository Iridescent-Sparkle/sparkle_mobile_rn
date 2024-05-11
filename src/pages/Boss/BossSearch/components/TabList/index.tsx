import { Dialog, Space } from '@fruits-chain/react-native-xiaoshu'
import React from 'react'
import { Pressable, Text, View } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { create, pxToDp } from '@/core/styleSheet'
import Visible from '@/core/components/Visible'

interface props {
  title: string
  data: any[]
  onClearSearchHistory: () => void
  onClickItem: (keyword: string) => void
}
export default function TabList(props: props) {
  const { title, data, onClearSearchHistory, onClickItem } = props
  const handleClearSearchHistory = () => {
    Dialog({
      title: '搜索历史',
      message: '请确认是否要清空搜索历史',
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      showCancelButton: true,
    }).then(async (action) => {
      if (action === 'confirm')

        onClearSearchHistory()
    })
  }
  return (
    <View style={styles.box}>
      <Visible visible={data.length}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <Pressable hitSlop={pxToDp(20)} onPress={handleClearSearchHistory}>
            <EvilIcons name="trash" size={pxToDp(36)} color="#B8B8B8" />
          </Pressable>
        </View>
      </Visible>
      {
        data?.map((item, index) => (
          <Pressable key={index} style={styles.listWrapper} onPress={() => onClickItem(item)}>
            <View style={styles.titleWrapper}>
              <Text style={styles.itemTitle}>{item}</Text>
            </View>
            <View>
              <AntDesign name="right" size={20} color="#2A3A49" />
            </View>
          </Pressable>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  title: {
    fontSize: 26,
    color: '#B8B8B8',
    marginBottom: 20,
  },
  listWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
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
