import { Switch as XiaoshuSwitch } from '@fruits-chain/react-native-xiaoshu'
import React from 'react'
import { Text, View } from 'react-native'
import { create } from '@/core/styleSheet'

interface Props {
  title: string
  onChange: (value: any) => void
}

function Switch(props: Props) {
  const { title, onChange } = props

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{`${title}:`}</Text>
      <XiaoshuSwitch
        defaultValue
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
