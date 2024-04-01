import { CameraRoll } from '@react-native-camera-roll/camera-roll'
import React, { useState } from 'react'
import type { StyleProp } from 'react-native'
import { Modal, PermissionsAndroid, Platform, Pressable, Text, View } from 'react-native'
import type { ImageStyle } from 'react-native-fast-image'
import FastImage from 'react-native-fast-image'
import ImageViewer from 'react-native-image-zoom-viewer'
import RNFetchBlob from 'rn-fetch-blob'
import { themeColor } from '@/core/styleSheet/themeColor'
import { create } from '@/core/styleSheet'

async function hasAndroidPermission() {
  const getCheckPermissionPromise = () => {
    if (Number(Platform.Version) >= 33) {
      return Promise.all([
        PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES),
        PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO),
      ]).then(
        ([hasReadMediaImagesPermission, hasReadMediaVideoPermission]) =>
          hasReadMediaImagesPermission && hasReadMediaVideoPermission,
      )
    }
    else {
      return PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE)
    }
  }

  const hasPermission = await getCheckPermissionPromise()
  if (hasPermission)
    return true

  const getRequestPermissionPromise = () => {
    if (Number(Platform.Version) >= 33) {
      return PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
      ]).then(
        statuses =>
          statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES]
          === PermissionsAndroid.RESULTS.GRANTED
          && statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO]
          === PermissionsAndroid.RESULTS.GRANTED,
      )
    }
    else {
      return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE).then(status => status === PermissionsAndroid.RESULTS.GRANTED)
    }
  }

  return await getRequestPermissionPromise()
}
interface Props {
  url: string
  style: StyleProp<ImageStyle>
}
function Menu({ cancel, saveToLocal }: any) {
  return (
    <View style={styles.menu}>
      <Pressable style={styles.button} onPress={saveToLocal}>
        <Text style={styles.text}>保存图片到本地</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={cancel}>
        <Text style={styles.text}>取消</Text>
      </Pressable>
    </View>
  )
}

function ImagePreview(props: Props) {
  const { url, style } = props

  const [visible, setVisible] = useState(false)

  const handleModalClose = () => {
    setVisible(false)
  }

  async function savePicture(url: string) {
    if (Platform.OS === 'android' && !(await hasAndroidPermission()))
      return
    try {
      const { data } = await RNFetchBlob.config({
        fileCache: true,
        appendExt: 'png',
      })
        .fetch('GET', url)

      await CameraRoll.saveAsset(data, { type: 'photo' })
    }
    catch (error) {

    }
  };

  return (
    <>
      <Pressable onPress={() => setVisible(true)}>
        <FastImage style={style} source={{ uri: url }}></FastImage>
      </Pressable>
      <Modal visible={visible} transparent={true} onRequestClose={handleModalClose}>
        <ImageViewer imageUrls={[{ url }]} onClick={handleModalClose} menus={Menu} enablePreload onSave={savePicture} />
      </Modal>
    </>
  )
}
const styles = create({
  menu: {
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 32,
  },
  text: {
    fontSize: 36,
    color: 'black',
    fontWeight: '700',
    textAlign: 'center',
  },
  button: {
    justifyContent: 'center',
    width: '100%',
    height: 110,
    paddingHorizontal: 44,
    borderBottomWidth: 1,
    borderColor: themeColor.black12,
  },
})
export default ImagePreview
