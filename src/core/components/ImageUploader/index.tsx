import type { UploaderValue } from '@fruits-chain/react-native-xiaoshu'
import { Toast, Uploader } from '@fruits-chain/react-native-xiaoshu'
import React, { useState } from 'react'
import { View } from 'react-native'
import { pick, types } from 'react-native-document-picker'
import RNFS from 'react-native-fs'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { themeColor } from '@/core/styleSheet/themeColor'
import { create, pxToDp } from '@/core/styleSheet'
import { request } from '@/core/api'

interface Props {

}
function ImageUploader(props: Props) {
  const [list1, setList1] = useState<UploaderValue[]>([
    {
      key: new Date().getTime().toString(),
      filepath: 'https://img.yzcdn.cn/vant/leaf.jpg',
      deletable: false,
    },

  ])

  const handleEditAvatar = async () => {
    try {
      const [result] = await pick({
        mode: 'import',
        type: types.images,
      })
      const base64Data = await RNFS.readFile(result.uri, 'base64')

      const stsToken = await request.get({}, {
        url: '/user/sts',
      })
      console.log(base64Data)
    }
    catch (err) {
      Toast.fail('图片上传失败')
    }
  }
  return (
    <View style={styles.container}>
      <Uploader
        list={list1}
        maxCount={1}
        style={styles.card}
        onPressImage={handleEditAvatar}
      />
      <MaterialIcons name="edit-square" size={pxToDp(32)} color={themeColor.primary} style={styles.icon} onPress={handleEditAvatar} />
    </View>
  )
}

const styles = create({
  container: {
    position: 'relative',
  },
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
    marginVertical: 24,
    borderRadius: 24,
  },
  icon: {
    position: 'absolute',
    bottom: 32,
    left: '53%',
  },
})

export default ImageUploader
