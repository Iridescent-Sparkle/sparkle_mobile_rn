import { Button } from '@fruits-chain/react-native-xiaoshu'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { request } from '@/core/api'
import Form from '@/core/components/Form'
import Input from '@/core/components/Input'
import RangeDatePicker from '@/core/components/RangeDatePicker'
import TextArea from '@/core/components/TextArea'
import { create } from '@/core/styleSheet'
import { useUserStore } from '@/store/user'

export default function GeniusUpdateVolunteer() {
  const form = Form.useForm()
  const insets = useSafeAreaInsets()
  const navigation = useNavigation()
  const userStore = useUserStore()
  const route = useRoute<{ key: any, name: any, params: { id: number, isEdit: string } }>()
  const [loading, setLoading] = useState(false)
  const handleComfirmClick = async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()
      route.params.isEdit
        ? await request.post({
          ...values,
          id: route.params.id,
          userId: userStore.userInfo.id,
          startTime: values.activityTime[0],
          endTime: values.activityTime[1],
        }, {
          url: '/genius/volunteer/update',
        })
        : await request.post({
          ...values,
          startTime: values.activityTime[0],
          endTime: values.activityTime[1],
        }, {
          url: '/genius/volunteer/create',
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
      const { data: volunteerData } = await request.get({ id: route.params.id }, {
        url: '/genius/volunteer/single',
      })
      form.setFieldsValue({
        activityName: volunteerData.activityName,
        role: volunteerData.role,
        activityTime: [new Date(volunteerData.startTime), new Date(volunteerData.endTime)],
        description: volunteerData.description,
      })
    }
    catch (error) {

    }
  }

  useEffect(() => {
    route.params.isEdit && getInitData()
  }, [route.params.isEdit])

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom || 16 }]}>
      <View>
        <Form form={form}>
          <Form.Item name="activityName" title="活动名称">
            <Input />
          </Form.Item>
          <Form.Item name="role" title="承担角色">
            <Input />
          </Form.Item>
          <Form.Item name="activityTime" title="起止时间">
            <RangeDatePicker />
          </Form.Item>
          <Form.Item name="description" title="经历描述">
            <TextArea />
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
