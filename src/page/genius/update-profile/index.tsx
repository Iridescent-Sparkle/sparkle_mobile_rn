import { Button } from '@fruits-chain/react-native-xiaoshu'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { request } from '@/core/api'
import Form from '@/core/components/Form'
import Input from '@/core/components/Input'
import { create } from '@/core/styleSheet'
import { useUserStore } from '@/store/user'
import SingleSelect from '@/core/components/SingleSelect'

export default function GeniusUpdateProfile() {
  const form = Form.useForm()
  const insets = useSafeAreaInsets()
  const navigation = useNavigation()
  const userStore = useUserStore()
  const route = useRoute<{ key: any, name: any, params: { isEdit: string } }>()
  const [loading, setLoading] = useState(false)
  const handleComfirmClick = async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()

      await request.post({
        id: userStore.userInfo.id,
        ...values,
      }, {
        url: '/genius/profile/update',
      })
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

    }
  }

  useEffect(() => {
    route.params.isEdit && getInitData()
  }, [route.params.isEdit])

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <View>
        <Form form={form}>
          <Form.Item name="nickname" title="昵称">
            <Input />
          </Form.Item>
          <Form.Item name="nickname" title="职业">
            <SingleSelect options={[]} />
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
