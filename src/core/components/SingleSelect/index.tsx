import type { SelectorOption } from '@fruits-chain/react-native-xiaoshu'
import { Cell, Selector } from '@fruits-chain/react-native-xiaoshu'
import React, { useState } from 'react'
import { create } from '@/core/styleSheet'

interface Props {
  title: string
  options: SelectorOption[]
}

function SingleSelect(props: Props) {
  const { title, options = [] } = props

  const [value, setValue] = useState()

  for (let index = 0; index < 3; index++) {
    options.push({
      label: `文案_文案_文案_文案_文案_文案_文案_文案_文案_文案_文案_文案_文案_文案_文案_文案_文案_文案_文案_文案_${index}`,
      value: index,
    })
  }

  return (
    <Cell
      title={`${title}:`}
      vertical
      divider={false}
      value={(
        <Cell
          title={options.find(item => item.value === value)?.label}
          isLink
          arrowDirection="down"
          style={styles.title}
          innerStyle={styles.inner}
          titleTextNumberOfLines={1}
          divider={false}
          onPress={() => {
            Selector({
              title: '测试选项',
              options,
              value: 1,
            })
              .then((value: any) => {
                setValue(value)
              })
              .catch(() => {})
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

export default SingleSelect
