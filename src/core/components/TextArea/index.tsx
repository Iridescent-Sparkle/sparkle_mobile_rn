import type { TextInputProps } from '@fruits-chain/react-native-xiaoshu'
import { Cell, TextInput } from '@fruits-chain/react-native-xiaoshu'
import React from 'react'

interface Props extends TextInputProps {
  title: string
}

function TextArea(props: Props) {
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
          type="textarea"
          {...textInputProps}
        />
      )}
    />
  )
}

export default TextArea
