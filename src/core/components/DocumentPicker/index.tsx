import React from 'react'
import { Pressable, Text } from 'react-native'
import { pick } from 'react-native-document-picker'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { Cell } from '@fruits-chain/react-native-xiaoshu'
import { themeColor } from '@/core/styleSheet/themeColor'
import { create, pxToDp } from '@/core/styleSheet'

interface Props {
  title: string
}
function DocumentPicker(props: Props) {
  const { title = '' } = props

  return (
    <Cell
      title={`${title}:`}
      vertical
      divider={false}
      value={(
        <Pressable
          style={styles.card}
          onPress={async () => {
            try {
              const [pickResult] = await pick()
            }
            catch (err: unknown) {

            }
          }}
        >
          <FontAwesome5 name="file-upload" size={pxToDp(64)} color={themeColor.primary} />
          <Text style={styles.text}>选择文件</Text>
        </Pressable>
      )}
    />
  )
}

const styles = create({
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
    height: 240,
    marginVertical: 24,
    borderStyle: 'dashed',
    borderWidth: 2,
    borderRadius: 24,
    borderColor: '#EAEAEA',
    backgroundColor: '#FAFAFA',
  },
  text: {
    color: themeColor.black65,
  },
})

export default DocumentPicker
