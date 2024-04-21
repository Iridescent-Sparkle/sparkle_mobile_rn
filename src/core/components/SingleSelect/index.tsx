import type { SelectorOption, SelectorProps } from '@fruits-chain/react-native-xiaoshu'
import { Cell, Selector } from '@fruits-chain/react-native-xiaoshu'
import React, { useState } from 'react'
import { create } from '@/core/styleSheet'
import { themeColor } from '@/core/styleSheet/themeColor'

interface Props extends SelectorProps {
  options: SelectorOption[]
  onChange?: (value: any) => void
  value?: any
}

function SingleSelect(props: Props) {
  const { value, onChange, options = [], placeholder, ...rest } = props

  const title = options.find(item => item.value === value)?.label || placeholder

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
          ...rest,
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
    padding: 0,
    marginVertical: 24,
    color: themeColor.black12,
  },
  titleTextStyle: {
    color: themeColor.black25,
  },
})

export default SingleSelect
