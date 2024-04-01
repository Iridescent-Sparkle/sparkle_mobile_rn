import { Card, Space, Toast } from '@fruits-chain/react-native-xiaoshu'
import React, { useState } from 'react'
import { Pressable, Text } from 'react-native'
import { pick, types } from 'react-native-document-picker'
import RNFS from 'react-native-fs'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { StackActions, useNavigation } from '@react-navigation/native'
import OverlayLoading from '../OverlayLoading'
import { useUserStore } from '@/store/user'
import { initOssClient } from '@/core/tools/oss'
import { themeColor } from '@/core/styleSheet/themeColor'
import { create, pxToDp } from '@/core/styleSheet'

interface Props {
  onChange?: (value: any) => void
  value?: {
    accessUrl: string
    fileName: string
    fileSize: number
  }
}
function PdfPicker(props: Props) {
  const { onChange, value } = props
  const [loading, setLoading] = useState(false)
  const userStore = useUserStore()
  const navigation = useNavigation()
  const putMediaToOss = async ({
    filePath,
    fileName,
    fileSize,
  }: { filePath: string, fileName: string, fileSize: number }) => {
    try {
      setLoading(true)
      const AliyunOSSClient = await initOssClient()
      const remoteFileName = `sparkle-mobile/avatar/${userStore.userInfo.username}/${new Date().getTime()}.pdf`
      const accessUrl = `https://sparkle-cdn.oss-cn-chengdu.aliyuncs.com/${remoteFileName}`

      await AliyunOSSClient.asyncUpload('sparkle-cdn', remoteFileName, filePath)

      onChange!({
        accessUrl,
        fileName,
        fileSize,
      })

      Toast.success('简历上传成功')
    }
    catch (error) {
      return Promise.reject(new Error('简历上传失败'))
    }
    finally {
      setLoading(false)
    }
  }

  const handlePickPdf = async () => {
    try {
      const [file] = await pick(
        {
          mode: 'import',
          type: [types.pdf],
        },
      )

      if (!file.name?.endsWith('.pdf'))
        return Promise.reject(new Error('请选择PDF文件'))
      setLoading(true)
      if (file.uri.startsWith('content://')) {
        const urlComponents = file.uri.split('/')
        const fileNameAndExtension = urlComponents[urlComponents.length - 1]
        const destPath = `${RNFS.TemporaryDirectoryPath}/${fileNameAndExtension}`
        await RNFS.copyFile(file.uri, destPath)

        await putMediaToOss({
          fileName: file.name,
          filePath: decodeURIComponent(`file://${destPath}`),
          fileSize: (file.size || 0) / 1024,
        })
      }
    }
    catch (error: any) {
      Toast.fail(error.message)
    }
    finally {
      setLoading(false)
    }
  }
  const handleResumeClick = () => {
    navigation.dispatch(StackActions.push('ResumePreview', value))
  }
  return (
    <>
      <Pressable style={styles.card} onPress={handlePickPdf}>
        <FontAwesome5 name="file-upload" size={pxToDp(64)} color={themeColor.primary} />
        <Text style={styles.text}>选择文件</Text>
      </Pressable>
      {loading && (<OverlayLoading />)}
      {
      !!value?.accessUrl && (
        <Pressable onPress={handleResumeClick}>
          <Card style={styles.pdfCard}>
            <Space direction="horizontal" style={styles.header}>
              <Space direction="horizontal" gap={pxToDp(32)}>
                <AntDesign name="pdffile1" size={pxToDp(84)} color="#F75555" />
                <Space gap={pxToDp(20)}>
                  <Text style={styles.title}>{value?.fileName}</Text>
                  <Text style={styles.size}>
                    {value?.fileSize}
                    KB
                  </Text>
                </Space>
              </Space>
              <AntDesign name="close" size={pxToDp(32)} color="#F76564" onPress={() => onChange!({})} />
            </Space>
          </Card>
        </Pressable>
      )
     }
    </>
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
  pdfCard: {
    backgroundColor: '#FFF2F2',
    borderRadius: 32,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: themeColor.black85,
  },
  size: {
    fontSize: 24,
    color: themeColor.black65,
  },
  logo: {
    width: 116,
    height: 116,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: themeColor.black12,
  },
})

export default PdfPicker
