import { Search } from '@fruits-chain/react-native-xiaoshu'
import React from 'react'
import { StackActions, useNavigation } from '@react-navigation/native'
import { create } from '@/core/styleSheet'
import { useUserStore } from '@/store/user'

interface Props {
  onSearch: (value: string) => void
}
function RecruitSearchBar(props: Props) {
  const { onSearch } = props

  return (
    <Search
      key="keyword"
      placeholder="请输入关键词搜索"
      onSearch={onSearch}
      style={styles.search}
      showSearchButton={true}
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
