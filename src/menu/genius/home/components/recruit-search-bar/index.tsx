import { Search } from '@fruits-chain/react-native-xiaoshu'
import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { create } from '@/core/styleSheet'

interface Ref {
  setValue: (value: string) => void
}

interface Props {
  onSearch: (value: string) => void
}
const RecruitSearchBar: React.ForwardRefRenderFunction<Ref, Props> = (props, ref) => {
  const { onSearch } = props

  const [value, setValue] = useState('')

  useImperativeHandle(ref, () => ({
    setValue,
  }))

  return (
    <Search
      key="keyword"
      placeholder="请输入关键词搜索"
      onSearch={onSearch}
      style={styles.search}
      value={value}
      onChangeText={setValue}
      showSearchButton={true}
    />
  )
}

const ForwardRecruitSearchBar = forwardRef(RecruitSearchBar)

const styles = create({
  search: {
    width: '100%',
    height: 96,
    borderRadius: 24,
    paddingRight: 16,
  },
})

export default ForwardRecruitSearchBar
