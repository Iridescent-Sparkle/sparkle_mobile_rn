import type { TextInputProps } from '@fruits-chain/react-native-xiaoshu'
import { TextInput } from '@fruits-chain/react-native-xiaoshu'
import React from 'react'

interface Props extends TextInputProps {
  onChange?: (value: any) => void
  value?: any
}

function TextArea(props: Props) {
  const { ...textInputProps } = props

  return (
    <TextInput
      bordered
      size="l"
      type="textarea"
      {...textInputProps}
    />
  )
}

export default TextArea
