import {useState} from 'react';
import {Text} from 'react-native';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {create} from '@/core/styleSheet';

const CELL_COUNT = 4;

function App() {
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  return (
    <>
      <CodeField
        ref={ref}
        {...props}
        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({index, symbol, isFocused}) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}>
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />
    </>
  );
}

const styles = create({
  codeFieldRoot: {marginTop: 20},
  cell: {
    width: 144,
    height: 108,
    lineHeight: 96,
    fontSize: 48,
    borderWidth: 4,
    borderColor: '#00000030',
    textAlign: 'center',
    borderRadius: 20,
    backgroundColor: '#FAFAFA',
  },
  focusCell: {
    borderColor: '#5288FB',
    backgroundColor: '#EEF4FF',
  },
});

export default App;
