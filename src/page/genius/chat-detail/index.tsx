import { Portal, Toast } from '@fruits-chain/react-native-xiaoshu'
import { CameraRoll } from '@react-native-camera-roll/camera-roll'
import { useNavigation, useRoute } from '@react-navigation/native'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { BackHandler, PermissionsAndroid, Platform, Pressable, Text, View } from 'react-native'
import { ChatMessageType } from 'react-native-chat-sdk'
import type { MessageModel, SystemMessageModel, TimeMessageModel } from 'react-native-chat-uikit'
import { ConversationDetail } from 'react-native-chat-uikit'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import ImageViewer from 'react-native-image-zoom-viewer'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Video from 'react-native-video'
import { themeColor } from '@/core/styleSheet/themeColor'
import { create, pxToDp } from '@/core/styleSheet'

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

async function savePicture(url: string) {
  if (Platform.OS === 'android' && !(await hasAndroidPermission()))
    return
  try {
    await CameraRoll.saveAsset(url, { type: 'photo' })
    Toast.success('保存成功')
  }
  catch (error) {
    Toast.fail('保存失败')
  }
};

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
export default function GeniusChatDetail() {
  const insets = useSafeAreaInsets()

  const navigation = useNavigation()

  const route = useRoute<{ key: any, name: any, params: { convId: string, convType: number } }>()

  const [imageUrl, setImageUrl] = useState('')

  const [videoUrl, setVideoUrl] = useState('')

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        return true
      },
    )

    return () => backHandler.remove()
  }, [])

  const handleImageClose = () => {
    setImageUrl('')
  }
  const handleVideoClose = () => {
    setVideoUrl('')
  }
  return (
    <Fragment>
      <GestureHandlerRootView style={{ flex: 1, paddingTop: insets.top, backgroundColor: '#FFF' }}>
        <ConversationDetail
          containerStyle={{
            flexGrow: 1,
            backgroundColor: '#FFF',
          }}
          convId={route.params.convId}
          convType={route.params.convType}
          list={{
            props: {
              onClickedItem: (
                id: string,
                model: SystemMessageModel | TimeMessageModel | MessageModel,
              ) => {
                if (model.modelType !== 'message')
                  return
                const msgModel = model as MessageModel
                if (msgModel.msg.body.type === ChatMessageType.IMAGE) {
                  setImageUrl(`file://${msgModel.msg.body.localPath}`)
                }
                else if (msgModel.msg.body.type === ChatMessageType.VIDEO) {
                  setVideoUrl(`file://${msgModel.msg.body.localPath}`)
                }
                else if (msgModel.msg.body.type === ChatMessageType.FILE) {
                  // navigation.push('FileMessagePreview', {
                  //   params: {
                  //     msgId: msgModel.msg.msgId,
                  //     localMsgId: msgModel.msg.localMsgId,
                  //   },
                  // })
                }
              },
            },
          }}
          onBack={() => {
            navigation.goBack()
          }}
        />
      </GestureHandlerRootView>
      {
        imageUrl && (
          <Portal>
            <ImageViewer
              imageUrls={[{ url: imageUrl }]}
              onClick={handleImageClose}
              menus={Menu}
              enablePreload
              onSave={savePicture}
              onCancel={handleImageClose}
            />
          </Portal>
        )
      }
      {
        videoUrl && (
          <Portal>
            <View style={styles.videoHeader}>
              <AntDesign name="close" size={pxToDp(48)} color="white" onPress={handleVideoClose} />
            </View>
            <Video
              style={styles.backgroundVideo}
              source={{ uri: videoUrl }}
              controls
              resizeMode="stretch"
            />
          </Portal>
        )
      }
    </Fragment>
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
  videoHeader: {
    justifyContent: 'center',
    paddingLeft: 32,
    width: '100%',
    height: 90,
    backgroundColor: '#0B0B15',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 90,
    left: 0,
    bottom: 0,
    right: 0,
  },
})
