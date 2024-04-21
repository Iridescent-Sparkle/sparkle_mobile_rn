import type { SelectorOption, SelectorProps } from '@fruits-chain/react-native-xiaoshu'
import { Cell, Selector } from '@fruits-chain/react-native-xiaoshu'
import React, { useState } from 'react'
import type { TreeValue } from '@fruits-chain/react-native-xiaoshu/lib/typescript/tree/interface'
import { create } from '@/core/styleSheet'
import { themeColor } from '@/core/styleSheet/themeColor'

interface Props extends SelectorProps {
  options: SelectorOption[]
  onChange?: (value: any) => void
  value?: any
}

function MultiSelect(props: Props) {
  const { value, onChange, options = [], placeholder, ...rest } = props

  const title = value?.map((item: TreeValue) => {
    return options.find(option => item === option.value)?.label
  }).join('、') || placeholder

  return (
    <Cell
      title={title}
      isLink
      arrowDirection="down"
      style={styles.title}
      titleTextStyle={title === placeholder && styles.titleTextStyle}
      titleTextNumberOfLines={1}
      divider={false}
      onPress={() => {
        Selector({
          options,
          value,
          multiple: true,
          ...rest,
        })
          .then((k: any) => {
            onChange?.(k)
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
  titleTextStyle: {
    color: themeColor.black25,
  },
})

export default MultiSelect
