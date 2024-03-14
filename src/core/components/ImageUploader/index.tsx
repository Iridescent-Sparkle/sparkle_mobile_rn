import type { UploaderValue } from '@fruits-chain/react-native-xiaoshu'
import { Cell, Dialog, Toast, Uploader } from '@fruits-chain/react-native-xiaoshu'
import React, { useState } from 'react'
import { View } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { themeColor } from '@/core/styleSheet/themeColor'
import { create, pxToDp } from '@/core/styleSheet'

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

  return (
    <View style={styles.container}>
      <Uploader
        list={list1}
        maxCount={1}
        style={styles.card}
        onPressUpload={() => {
          Toast('TODO 实现选择文件')

          const key = new Date().getTime().toString()

          setList1(s => [
            ...s,
            {
              key,
              filepath: 'https://img.yzcdn.cn/vant/leaf.jpg',
              status: 'loading',
            },
          ])

          setTimeout(() => {
            setList1(s =>
              s.map((item) => {
                if (item.key === key)
                  item.status = 'done'

                return item
              }),
            )
          }, 3000)
        }}
        onPressDelete={(item, _, list) => {
          Dialog.confirm({
            title: '提示',
            message: '确定要删除？',
          })
            .then((action) => {
              if (action === 'confirm')
                setList1(list.filter(img => img.key !== item.key))
            })
            .catch(() => {})
        }}
        onPressImage={() => {
          Toast('TODO 实现预览文件')
        }}
        onPressError={(item) => {
          Toast('TODO 实现上传文件')

          setList1(s =>
            s.map((l) => {
              if (l.key === item.key)
                l.status = 'loading'

              return l
            }),
          )

          setTimeout(() => {
            setList1(s =>
              s.map((l) => {
                if (l.key === item.key)
                  l.status = 'error'

                return l
              }),
            )
          }, 2000)
        }}
      />
      <MaterialIcons name="edit-square" size={pxToDp(32)} color={themeColor.primary} style={styles.icon} />
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
