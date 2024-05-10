import { Cell, DatePicker, Toast } from '@fruits-chain/react-native-xiaoshu'
import React from 'react'
import { create } from '@/core/styleSheet'

interface Props {
  onChange?: (value: any) => void
  value?: any
}

function RangeDatePicker(props: Props) {
  const { value = [], onChange } = props

  return (
    <Cell
      title={value[0] ? `${value[0]?.toLocaleDateString?.()}-${value[1]?.toLocaleDateString?.()}` : '请选择时间段'}
      isLink
      arrowDirection="down"
      style={styles.title}
      titleTextNumberOfLines={1}
      divider={false}
      onPress={() => {
        DatePicker.range({
          title: '',
          beforeClose: (action, value) => {
            if (action === 'confirm') {
              if (!value[0]) {
                Toast({
                  message: '请选择起始时间',
                  forbidPress: true,
                  duration: 200,
                })
                return false
              }
              if (!value[1]) {
                Toast({
                  message: '请选择结束时间',
                  forbidPress: true,
                  duration: 200,
                })
                return false
              }
              return true
            }
            return true
          },
        }).then(({ action, values }) => {
          if (action === 'confirm')
            onChange?.(values)
        })
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
})

export default RangeDatePicker
