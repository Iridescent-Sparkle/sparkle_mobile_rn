import { request } from '@/core/api'
import Form from '@/core/components/Form'
import ImageUploader from '@/core/components/ImageUploader'
import Input from '@/core/components/Input'
import { create } from '@/core/styleSheet'
import { useUserStore } from '@/store/user'
import { Button } from '@fruits-chain/react-native-xiaoshu'
import { useNavigation } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { ScrollView, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import LicenseUploader from './components/LicenseUploader'

export default function CompanyAuth() {
  const form = Form.useForm()
  const insets = useSafeAreaInsets()
  const navigation = useNavigation()
  const userStore = useUserStore()
  const [loading, setLoading] = useState(false)

  const handleComfirmClick = async () => {
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
      navigation.goBack()
    }
    catch (error) {

    }
    finally {
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

    }
  }

  useEffect(() => {
    userStore.userInfo.company && getInitData()
  }, [])

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom || 16 }]}>
      <ScrollView>
        <Form form={form}>
          <Form.Item name="companyAvatar" title="企业头像">
            <ImageUploader />
          </Form.Item>
          <Form.Item name="companyName" title="企业名称">
            <Input />
          </Form.Item>
          <Form.Item name="companyLicense" title="上传营业执照">
            <LicenseUploader />
          </Form.Item>
          <Form.Item name="companyDesc" title="企业描述">
            <Input />
          </Form.Item>
        </Form>
      </ScrollView>
      <Button loading={loading} onPress={handleComfirmClick} style={styles.button}>提交</Button>
    </View>
  )
}

const styles = create({
  container: {
    flex: 1,
    paddingHorizontal: 44,
    backgroundColor: '#FFF',
    justifyContent: 'space-between',
  },
  button: {
    borderRadius: 24,
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
