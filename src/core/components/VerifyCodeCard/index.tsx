import { Fragment, useState } from 'react'
import { Text } from 'react-native'
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field'
import { themeColor } from '@/core/styleSheet/themeColor'
import { create } from '@/core/styleSheet'

const CELL_COUNT = 4

interface Prop {
  onChange: (value: any) => void
}
function VerifyCodeCard(prop: Prop) {
  const { onChange } = prop

  const [value, setValue] = useState('')

  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT })

  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  })

  return (
    <Fragment>
      <CodeField
        ref={ref}
        value={value}
        onChangeText={(value) => {
          onChange(value)
          setValue(value)
        }}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}
          >
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
        {...props}
      />
    </Fragment>
  )
}

const styles = create({
  codeFieldRoot: { marginTop: 20 },
  cell: {
    width: 144,
    height: 108,
    lineHeight: 108,
    fontSize: 48,
    borderWidth: 4,
    borderColor: '#00000030',
    textAlign: 'center',
    borderRadius: 20,
    color: themeColor.black85,
    backgroundColor: '#FAFAFA',
  },
  focusCell: {
    borderColor: '#5288FB',
    backgroundColor: '#EEF4FF',
  },
})

export default VerifyCodeCard
