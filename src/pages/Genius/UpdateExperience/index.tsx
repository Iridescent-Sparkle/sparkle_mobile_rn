import { Button } from '@fruits-chain/react-native-xiaoshu'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useUserStore } from '../../../store/user/index'
import { request } from '@/core/api'
import Form from '@/core/components/Form'
import Input from '@/core/components/Input'
import RangeDatePicker from '@/core/components/RangeDatePicker'
import Switch from '@/core/components/Switch'
import TextArea from '@/core/components/TextArea'
import { create } from '@/core/styleSheet'

export default function GeniusUpdateExperience() {
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
          startTime: values.workTime[0],
          endTime: values.workTime[1],
        }, {
          url: '/genius/experience/update',
        })
        : await request.post({
          ...values,
          startTime: values.workTime[0],
          endTime: values.workTime[1],
        }, {
          url: '/genius/experience/create',
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
      const { data: experienceData } = await request.get({
        id: route.params.id,
      }, {
        url: '/genius/experience/single',
      })
      form.setFieldsValue({
        profession: experienceData.profession,
        companyName: experienceData.companyName,
        workTime: [new Date(experienceData.startTime), new Date(experienceData.endTime)],
        isWork: experienceData.isWork,
        description: experienceData.description,
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
          <Form.Item name="profession" title="职位">
            <Input />
          </Form.Item>
          <Form.Item name="companyName" title="公司">
            <Input />
          </Form.Item>
          <Form.Item name="workTime" title="起止时间">
            <RangeDatePicker />
          </Form.Item>
          <Form.Item name="isWork" title="是否在职">
            <Switch />
          </Form.Item>
          <Form.Item name="description" title="工作描述">
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
