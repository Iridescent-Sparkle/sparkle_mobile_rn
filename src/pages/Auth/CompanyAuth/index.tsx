import { request } from '@/core/api'
import Form from '@/core/components/Form'
import ImageUploader from '@/core/components/ImageUploader'
import Input from '@/core/components/Input'
import Page from '@/core/components/Page'
import { create } from '@/core/styleSheet'
import { useUserStore } from '@/store/user'
import { Button, Notify, Toast } from '@fruits-chain/react-native-xiaoshu'
import { useNavigation } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { ScrollView, View } from 'react-native'
import LicenseUploader from './components/LicenseUploader'

export default function CompanyAuth() {
  const form = Form.useForm()

  const navigation = useNavigation()

  const userStore = useUserStore()

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
        status: 0,
        ...values,
      }, {
        url: '/user/company/create',
      })
      await userStore.getUserInfo()
      Notify({
        type: 'success',
        duration: 1000,
        message: '保存成功',
      })
      navigation.goBack()
    }
    catch (error: any) {
      if (error.code) {
        Notify({
          type: 'error',
          duration: 1000,
          message: '保存失败',
        })
      }
    }
    finally {
      close()
      setLoading(false)
    }
  }

  const getInitData = async () => {
    try {
      await userStore.getUserInfo()

      form.setFieldsValue({
        companyAvatar: userStore.userInfo.company.companyAvatar,
        companyName: userStore.userInfo.company.companyName,
        companyLicense: userStore.userInfo.company.companyLicense,
      })
    }
    catch (error) {
      Toast.fail('获取数据失败')
    }
  }

  useEffect(() => {
    userStore.userInfo.company && getInitData()
  }, [])

  return (
    <Page isScrollView={false} title='企业信息'>
      <View style={styles.container}>
        <ScrollView>
          <Form form={form}>
            <Form.Item name="companyAvatar" title="企业头像" rules={[{ required: true, message: '请上传企业头像' }]}>
              <ImageUploader />
            </Form.Item>
            <Form.Item name="companyName" title="企业名称" rules={[{ required: true, message: '请输入企业名称' }]}>
              <Input placeholder='请输入企业名称' />
            </Form.Item>
            <Form.Item name="companyAddress" title="企业地址" rules={[{ required: true, message: '请输入企业地址' }]}>
              <Input placeholder='请输入企业地址' />
            </Form.Item>
            <Form.Item name="companyDesc" title="企业描述" rules={[{ required: true, message: '请输入企业描述' }]}>
              <Input placeholder='请输入企业描述' />
            </Form.Item>
            <Form.Item name="companyLicense" title="上传营业执照" rules={[{ required: true, message: '请上传营业执照' }]}>
              <LicenseUploader />
            </Form.Item>
          </Form>
        </ScrollView>
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
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
    marginVertical: 24,
    borderRadius: 24,
  },
  img: {
    height: 200,
  },
})
