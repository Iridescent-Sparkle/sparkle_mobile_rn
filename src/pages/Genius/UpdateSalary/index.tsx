import { request } from '@/core/api'
import Form from '@/core/components/Form'
import Input from '@/core/components/Input'
import Page from '@/core/components/Page'
import { create } from '@/core/styleSheet'
import { useUserStore } from '@/store/user'
import { Button, Notify, Toast } from '@fruits-chain/react-native-xiaoshu'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { View } from 'react-native'

export default function GeniusUpdateSalary() {
  const form = Form.useForm()

  const navigation = useNavigation()

  const userStore = useUserStore()

  const [loading, setLoading] = useState(false)

  const route = useRoute<{ key: any, name: any, params: { isEdit: string } }>()
  
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
    route.params.isEdit && getInitData()
  }, [route.params.isEdit])

  return (
    <Page isScrollView={false} title='期望薪资'>
      <View style={styles.container}>
        <View>
          <Form form={form}>
            <Form.Item name="minSalary" title="最低薪资 千元/月" rules={[{ required: true, message: '请输入最低薪资' }]}>
              <Input placeholder='请输入最低薪资'/>
            </Form.Item>
            <Form.Item name="maxSalary" title="最高薪资 千元/月" rules={[{ required: true, message: '请输入最高薪资' }]}>
              <Input placeholder='请输入最高薪资'/>
            </Form.Item>
          </Form>
        </View>
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
