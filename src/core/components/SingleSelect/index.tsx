import type { SelectorOption } from '@fruits-chain/react-native-xiaoshu'
import { Cell, Selector } from '@fruits-chain/react-native-xiaoshu'
import React, { useState } from 'react'
import { create } from '@/core/styleSheet'

interface Props {
  options: SelectorOption[]
  onChange?: (value: any) => void
  value?: any
}

function SingleSelect(props: Props) {
  const { value, onChange, options = [] } = props

  return (
    <Cell
      title={options.find(item => item.value === value)?.label}
      isLink
      arrowDirection="down"
      style={styles.title}
      innerStyle={styles.inner}
      titleTextNumberOfLines={1}
      divider={false}
      onPress={() => {
        Selector({
          title: '测试选项',
          options,
          value,
        })
          .then((value: any) => {
            onChange?.(value)
          })
          .catch(() => {})
      }}
    />
  )
}

const styles = create({
  title: {
    borderRadius: 24,
    backgroundColor: '#FAFAFA',
    marginVertical: 24,
  },
  inner: {
    height: 88,
  },
})

export default SingleSelect
