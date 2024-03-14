import type { SelectorOption } from '@fruits-chain/react-native-xiaoshu'
import { Cell, DatePicker, Toast } from '@fruits-chain/react-native-xiaoshu'
import React, { useState } from 'react'
import { create } from '@/core/styleSheet'

interface Props {
  title: string
}

function RangeDatePicker(props: Props) {
  const { title } = props

  const [startTime, setStartTime] = useState<any>()
  const [endTime, setEndTime] = useState<any>()

  return (
    <Cell
      title={`${title}:`}
      vertical
      divider={false}
      value={(
        <Cell
          title={startTime ? `${startTime?.toLocaleDateString?.()}-${endTime?.toLocaleDateString?.()}` : '请选择时间段'}
          isLink
          arrowDirection="down"
          style={styles.title}
          innerStyle={styles.inner}
          titleTextNumberOfLines={1}
          divider={false}
          onPress={() => {
            DatePicker.range({
              title: '什么时间',
              beforeClose: (_, value) => {
                if (!value[0]) {
                  Toast({
                    message: '请选择起始时间',
                    forbidPress: true,
                  })
                  return false
                }
                if (!value[1]) {
                  Toast({
                    message: '请选择结束时间',
                    forbidPress: true,
                  })
                  return false
                }
                return true
              },
            }).then(({ values }) => {
              setStartTime(values[0])
              setEndTime(values[1])
            })
          }}
        />
      )}
    >
    </Cell>
  )
}

const styles = create({
  title: {
    borderRadius: 24,
    backgroundColor: '#FAFAFA',
    marginVertical: 24,
  },
  inner: {
    height: 88,
  },
})

export default RangeDatePicker
