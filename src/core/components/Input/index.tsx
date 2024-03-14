import type { TextInputProps } from '@fruits-chain/react-native-xiaoshu'
import { Cell, TextInput } from '@fruits-chain/react-native-xiaoshu'
import React from 'react'
import { create } from '@/core/styleSheet'

interface Props extends TextInputProps {
  title: string
}

function Input(props: Props) {
  const { title, ...textInputProps } = props

  return (
    <Cell
      titleStyle={styles.title}
      title={`${title}:`}
      extra={(
        <TextInput
          bordered
          size="l"
          {...textInputProps}
        />
      )}
    />
  )
}

const styles = create({
  title: {
    marginLeft: -20,
    marginBottom: 20,
  },
})

export default Input
