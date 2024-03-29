import { Search, Toast } from '@fruits-chain/react-native-xiaoshu'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { create } from '@/core/styleSheet'
import { themeColor } from '@/core/styleSheet/themeColor'

function RecruitSearchBar() {
  const [value, setValue] = useState('')

  const onSearch = () => {
    const { close } = Toast.loading('加载中')
    setTimeout(() => {
      close()
    }, 800)
  }

  return (
    <Search
      key="keyword"
      placeholder="请输入关键词搜索"
      value={value}
      onChangeText={setValue}
      onSearch={onSearch}
      style={styles.search}
      showSearchButton={false}
      extra={<Ionicons name="options-outline" size={24} color={themeColor.primary} />}
    />
  )
}

const styles = create({
  search: {
    width: '100%',
    height: 96,
    borderRadius: 24,
    paddingRight: 16,
  },
})

export default RecruitSearchBar
