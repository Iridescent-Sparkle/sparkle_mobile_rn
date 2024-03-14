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
      title={`${title}:`}
      vertical
      divider={false}
      value={(
        <TextInput
          bordered
          size="l"
          {...textInputProps}
          fixGroupStyle={styles.fixGroup}
          style={styles.input}
        />
      )}
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
