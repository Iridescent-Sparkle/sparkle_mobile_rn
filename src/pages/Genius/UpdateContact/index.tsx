import { request } from '@/core/api'
import Form from '@/core/components/Form'
import Input from '@/core/components/Input'
import Page from '@/core/components/Page'
import { create } from '@/core/styleSheet'
import { useUserStore } from '@/store/user'
import { Button, Notify, Toast } from '@fruits-chain/react-native-xiaoshu'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { ScrollView, View } from 'react-native'

export default function GeniusUpdateContact() {
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
      const { data: profileData } = await request.get({}, {
        url: '/genius/profile/user',
      })
      form.setFieldsValue({
        address: profileData.address,
        phone: profileData.phone,
        email: profileData.email,
      })
    }
    catch (error) {
      Toast.fail('获取数据失败')
    }
  }

  useEffect(() => {
    if (route.params.isEdit) {
      getInitData()
    } else {
      form.setFieldsValue(
        {
          "address": "成都",
          "phone": "18398527538",
          "email": "2389504513@qq.com",
        }
      )
    }
  }, [route.params.isEdit])

  return (
    <Page isScrollView={false} title='联系信息'>
      <View style={styles.container}>
        <ScrollView>
          <Form form={form}>
            <Form.Item name="address" title="地址" rules={[{ required: true, message: '请输入地址' }]}>
              <Input placeholder='请输入地址'/>
            </Form.Item>
            <Form.Item name="phone" title="电话" rules={[{ required: true, message: '请输入电话' }]}>
              <Input placeholder='请输入电话'/>
            </Form.Item>
            <Form.Item name="email" title="邮箱" rules={[{ required: true, message: '请输入邮箱' }]}>
              <Input placeholder='请输入邮箱'/>
            </Form.Item>
          </Form>
        </ScrollView>
        <Button loading={loading} style={styles.button} onPress={handleComfirmClick} loadingText='提交'>提交</Button>
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
