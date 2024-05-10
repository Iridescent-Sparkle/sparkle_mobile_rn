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

export default function GeniusUpdateProfile() {
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
        ...values,
      }, {
        url: '/user/update',
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
        avatar: userStore.userInfo.avatar,
        nickname: userStore.userInfo.nickname,
        occupation: userStore.userInfo.occupation,
      })
    }
    catch (error) {
      Toast.fail('获取数据失败')
    }
  }

  useEffect(() => {
    getInitData()
  }, [])

  return (
    <Page isScrollView={false} title='修改个人信息'>
      <View style={styles.container}>
        <ScrollView>
          <Form form={form}>
            <Form.Item name="avatar">
              <ImageUploader />
            </Form.Item>
            <Form.Item name="nickname" title="昵称" rules={[{ required: true, message: '请输入昵称' }]} >
              <Input placeholder='请输入昵称' />
            </Form.Item>
            <Form.Item name="occupation" title="职业" rules={[{ required: true, message: '请输入职业' }]}>
              <Input placeholder='请输入职业' />
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
})
