import { Button } from '@fruits-chain/react-native-xiaoshu'
import { useNavigation } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { request } from '@/core/api'
import Form from '@/core/components/Form'
import ImageUploader from '@/core/components/ImageUploader'
import Input from '@/core/components/Input'
import { create } from '@/core/styleSheet'
import { useUserStore } from '@/store/user'
import { IMAGE_PREFIX } from '@/core/constants'

export default function GeniusUpdateProfile() {
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
        ...values,
      }, {
        url: '/user/update',
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
        avatar: userStore.userInfo.avatar,
        nickname: userStore.userInfo.nickname,
        occupation: userStore.userInfo.occupation,
      })
    }
    catch (error) {

    }
  }

  useEffect(() => {
    getInitData()
  }, [])

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <View>
        <Form form={form}>
          <Form.Item name="avatar">
            <ImageUploader />
          </Form.Item>
          <Form.Item name="nickname" title="昵称">
            <Input />
          </Form.Item>
          <Form.Item name="occupation" title="职业">
            <Input />
          </Form.Item>
        </Form>
      </View>
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
})
