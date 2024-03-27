import type { TextInputProps } from '@fruits-chain/react-native-xiaoshu'
import { TextInput } from '@fruits-chain/react-native-xiaoshu'
import React from 'react'
import { create } from '@/core/styleSheet'

interface Props extends TextInputProps {
  onChange?: (value: any) => void
  value?: any
}

function Input(props: Props) {
  const { ...textInputProps } = props

  return (
    <TextInput
      bordered
      size="l"
      {...textInputProps}
      fixGroupStyle={styles.fixGroup}
      style={styles.input}
    />
  )
}

const styles = create({
  fixGroup: {
    height: 88,
    backgroundColor: '#FAFAFA',
    borderWidth: 0,
  },
  input: {
    backgroundColor: '#FAFAFA',
  },
})
export default Input
