import type { UploaderValue } from '@fruits-chain/react-native-xiaoshu'
import { Button, Popup, Toast, Uploader } from '@fruits-chain/react-native-xiaoshu'
import AliyunOSS from 'aliyun-oss-react-native'
import React, { useState } from 'react'
import { PermissionsAndroid, View } from 'react-native'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useUserStore } from '../../../store/user/index'
import OverlayLoading from '../OverlayLoading'
import { themeColor } from '@/core/styleSheet/themeColor'
import { create, pxToDp } from '@/core/styleSheet'
import { request } from '@/core/api/index'
import { IMAGE_PREFIX } from '@/core/constants'

interface Props {
  onChange?: (value: any) => void
  value?: string
}
function ImageUploader(props: Props) {
  const userStore = useUserStore()

  const { onChange, value } = props

  const [loading, setLoading] = useState(false)
  const [popupVisible, setPopupVisible] = useState(false)

  const initOssClient = async () => {
    try {
      const { data: stsToken } = await request.get({}, {
        url: '/user/sts',
      })

      const endPoint = 'oss-cn-chengdu.aliyuncs.com'

      const configuration = {
        maxRetryCount: 3,
        timeoutIntervalForRequest: 30,
        timeoutIntervalForResource: 24 * 60 * 60,
      }

      AliyunOSS.initWithSecurityToken(stsToken.securityToken, stsToken.accessKeyId, stsToken.accessKeySecret, endPoint, configuration)
      return AliyunOSS
    }
    catch (error) {
      Toast.fail('网络错误')
    }
  }

  const putMediaToOss = async (filePath: string) => {
    try {
      setLoading(true)
      const AliyunOSSClient = await initOssClient()
      const fileName = `sparkle-mobile/avatar/${userStore.userInfo.username}/${new Date().getTime()}.png`
      const accessUrl = `https://sparkle-cdn.oss-cn-chengdu.aliyuncs.com/${fileName}`

      await AliyunOSSClient.asyncUpload('sparkle-cdn', fileName, filePath)

      onChange!(accessUrl)
      Toast.success('头像上传成功')
    }
    catch (error) {
      Toast.fail('头像上传失败')
      return Promise.reject(error)
    }
    finally {
      setLoading(false)
    }
  }

  const handleImageLaunch = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    } as const

    launchImageLibrary(options, async (response: any) => {
      if (response.didCancel) {
        Toast.fail('取消选择')
      }
      else if (response.error) {
        Toast.fail('头像上传失败')
      }
      else {
        const imageUri = response.uri || response.assets?.[0]?.uri
        await putMediaToOss(imageUri)
        handlePopupClose()
      }
    })
  }

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED)
        return Promise.resolve()
      else
        return Promise.reject(new Error('Camera permission denied'))
    }
    catch (err) {
      return Promise.reject(err)
    }
  }

  const handleCameraLaunch = async () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    } as const

    // 在启动相机之前调用请求权限函数
    await requestCameraPermission()

    launchCamera(options, async (response: any) => {
      if (response.didCancel) {
        Toast.fail('取消选择')
      }
      else if (response.error) {
        Toast.fail('头像上传失败')
      }
      else {
        const imageUri = response.uri || response.assets?.[0]?.uri
        await putMediaToOss(imageUri)
        handlePopupClose()
      }
    })
  }
  const handleEditAvatar = () => {
    setPopupVisible(true)
  }

  const handlePopupClose = () => {
    setPopupVisible(false)
  }
  return (
    <View style={styles.container}>
      <Uploader
        list={[{
          key: new Date().getTime().toString(),
          filepath: value || `${IMAGE_PREFIX}/stars.png`,
          deletable: false,
        }]}
        maxCount={1}
        style={styles.card}
        onPressImage={handleEditAvatar}
      />
      {loading && (<OverlayLoading />)}
      <MaterialIcons name="edit-square" size={pxToDp(32)} color={themeColor.primary} style={styles.icon} onPress={handleEditAvatar} />
      <Popup
        safeAreaInsetBottom
        visible={popupVisible}
        position="bottom"
        round
      >
        <Popup.Header onClose={handlePopupClose} title="是否要投递该职位" showClose={true} style={styles.popupHeader} titleTextStyle={styles.popupHeaderText} divider={true} />
        <View style={styles.popupWrapper}>
          <Button style={styles.popupButton} onPress={handleCameraLaunch} type="hazy">拍照</Button>
          <Button style={styles.popupButton} onPress={handleImageLaunch} loadingText="投递">从相册选择</Button>
        </View>
      </Popup>
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
  popupHeader: {
    height: 180,
  },
  popupHeaderText: {
    fontSize: 36,
  },
  popupWrapper: {
    flexDirection: 'row',
    paddingHorizontal: 40,
    justifyContent: 'space-between',
    paddingBottom: 40,
  },
  popupButton: {
    width: 320,
    borderRadius: 40,
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default ImageUploader
