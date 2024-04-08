import { Button, Popup, Toast } from '@fruits-chain/react-native-xiaoshu'
import React, { useState } from 'react'
import { PermissionsAndroid, Pressable, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import OverlayLoading from '@/core/components/OverlayLoading'
import { IMAGE_PREFIX } from '@/core/constants'
import { create, pxToDp } from '@/core/styleSheet'
import { initOssClient } from '@/core/tools/oss'
import { useUserStore } from '@/store/user'
import { themeColor } from '@/core/styleSheet/themeColor'

interface Props {
  onChange?: (value: any) => void
  value?: any
}
function LicenseUploader(props: Props) {
  const { onChange, value } = props
  const userStore = useUserStore()
  const [loading, setLoading] = useState(false)
  const [popupVisible, setPopupVisible] = useState(false)

  const putMediaToOss = async (filePath: string) => {
    try {
      setLoading(true)
      const AliyunOSSClient = await initOssClient()
      const fileName = `sparkle-mobile/avatar/${userStore.userInfo.username}/${new Date().getTime()}.png`
      const accessUrl = `https://sparkle-cdn.oss-cn-chengdu.aliyuncs.com/${fileName}`
      await AliyunOSSClient.asyncUpload('sparkle-cdn', fileName, filePath)
      onChange!(accessUrl)
      Toast.success('上传成功')
    }
    catch (error) {
      Toast.fail('上传失败')
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
        Toast.fail('上传失败')
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
        Toast.fail('上传失败')
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
      <FastImage source={{ uri: value || `${IMAGE_PREFIX}/license.png` }} style={styles.license} resizeMode="contain"></FastImage>
      <View style={styles.mask}>
        {
          value
            ? (
              <Pressable style={styles.uploadedButton} onPress={handleEditAvatar}>
                <Text style={styles.buttonText}>重新上传</Text>
              </Pressable>
              )
            : (
              <Pressable
                style={styles.button}
                onPress={handleEditAvatar}

              >
                <Text style={styles.buttonText}>
                  点击上传营业执照
                </Text>
              </Pressable>
              )
        }
      </View>
      {loading && (<OverlayLoading />)}
      <Popup
        safeAreaInsetBottom
        visible={popupVisible}
        position="bottom"
        round
      >
        <Popup.Header onClose={handlePopupClose} title="选择营业执照" showClose={true} style={styles.popupHeader} titleTextStyle={styles.popupHeaderText} divider={true} />
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
  license: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 340,
    marginVertical: 24,
    borderRadius: 24,
  },
  mask: {
    position: 'absolute',
    width: '100%',
    height: 388,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  button: {
    marginTop: 48,
    paddingHorizontal: 24,
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: themeColor.primary,
    borderRadius: 16,
  },
  uploadedButton: {
    marginTop: 48,
    paddingHorizontal: 24,
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000073',
    borderRadius: 16,
  },
  buttonText: {
    color: themeColor.white,
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

export default LicenseUploader
