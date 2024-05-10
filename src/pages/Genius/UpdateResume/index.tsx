import { request } from '@/core/api'
import Form from '@/core/components/Form'
import Page from '@/core/components/Page'
import DocumentPicker from '@/core/components/PdfPicker'
import { create } from '@/core/styleSheet'
import { useUserStore } from '@/store/user'
import { Button, Notify, Toast } from '@fruits-chain/react-native-xiaoshu'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { View } from 'react-native'

export default function GeniusUpdateResume() {
  const form = Form.useForm()

  const navigation = useNavigation()

  const userStore = useUserStore()

  const route = useRoute<{ key: any, name: any, params: { isEdit: string } }>()

  const [loading, setLoading] = useState(false)
  
  const handleComfirmClick = async () => {
    const { close } = Toast.loading({
      forbidPress: true,
      duration: 0
    })

    try {
      setLoading(true)
      const values = await form.validateFields()

      await request.post({
        id: userStore.userInfo.id,
        ...values,
      }, {
        url: '/genius/profile/update',
      })
      
      Notify({
        type: 'success',
        duration: 1000,
        message: '保存成功',
      })
      navigation.goBack()
    }
    catch (error) {
      Notify({
        type: 'error',
        duration: 1000,
        message: '保存失败',
      })
    }
    finally {
      close()
      setLoading(false)
    }
  }

  const getInitData = async () => {
    try {
      const { data: profileData } = await request.get({}, {
        url: '/genius/profile/user',
      })
      form.setFieldsValue({
        resume: profileData.resume,
      })
    }
    catch (error) {
      Toast.fail('获取数据失败')
    }
  }

  useEffect(() => {
    route.params.isEdit && getInitData()
  }, [route.params.isEdit])

  return (
    <Page isScrollView={false} title='附件简历'>
      <View style={styles.container}>
        <View>
          <Form form={form}>
            <Form.Item name="resume" title="" rules={[
              { required: true, message: '请上传简历' },
            ]}>
              <DocumentPicker />
            </Form.Item>
          </Form>
        </View>
        <Button loading={loading} onPress={handleComfirmClick} style={styles.button} loadingText='提交'>提交</Button>
      </View>
    </Page>
  )
}

const styles = create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  button: {
    borderRadius: 24,
    marginBottom: 24,
  },
})
