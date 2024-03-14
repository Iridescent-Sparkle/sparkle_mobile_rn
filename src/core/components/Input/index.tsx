import type { TextInputProps } from '@fruits-chain/react-native-xiaoshu'
import { Cell, TextInput } from '@fruits-chain/react-native-xiaoshu'
import React from 'react'

interface Props extends TextInputProps {
  title: string
}

function Input(props: Props) {
  const { title, ...textInputProps } = props

  return (
    <Cell
      title={`${title}:`}
      vertical
      divider={false}
      value={(
        <TextInput
          bordered
          size="l"
          {...textInputProps}
        />
      )}
    />
  )
}

export default Input
