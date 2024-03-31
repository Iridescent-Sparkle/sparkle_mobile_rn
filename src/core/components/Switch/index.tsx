import { Switch as XiaoshuSwitch } from '@fruits-chain/react-native-xiaoshu'
import React from 'react'
import { View } from 'react-native'
import { create } from '@/core/styleSheet'

interface Props {
  onChange?: (value: any) => void
  value?: any
}
function Switch(props: Props) {
  const { value, onChange } = props

  return (
    <View style={styles.container}>
      <XiaoshuSwitch
        value={!!value}
        onChange={onChange}
      />
    </View>
  )
}

const styles = create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
    height: 88,
  },
  title: {
    fontSize: 32,
  },
})

export default Switch
