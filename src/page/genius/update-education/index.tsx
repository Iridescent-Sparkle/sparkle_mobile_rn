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

export default function GeniusUpdateEducation() {
  const form = Form.useForm()
  const insets = useSafeAreaInsets()
  const navigation = useNavigation()
  const route = useRoute<{ key: any, name: any, params: { id: number, isEdit: string } }>()
  const [loading, setLoading] = useState(false)
  const userStore = useUserStore()
  const handleComfirmClick = async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()
      route.params.isEdit
        ? await request.post({
          ...values,
          id: route.params.id,
          userId: userStore.userInfo.id,
          startTime: values.studyTime[0],
          endTime: values.studyTime[1],
        }, {
          url: '/genius/education/update',
        })
        : await request.post({
          ...values,
          startTime: values.studyTime[0],
          endTime: values.studyTime[1],
        }, {
          url: '/genius/education/create',
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
      const { data: educationData } = await request.get({
        id: route.params.id,
      }, {
        url: '/genius/education/single',
      })

      form.setFieldsValue({
        school: educationData.school,
        profession: educationData.profession,
        studyTime: [new Date(educationData.startTime), new Date(educationData.endTime)],
        gpa: educationData.gpa,
        description: educationData.description,
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
          <Form.Item name="school" title="学校">
            <Input />
          </Form.Item>
          <Form.Item name="profession" title="专业">
            <Input />
          </Form.Item>
          <Form.Item name="studyTime" title="起止时间">
            <RangeDatePicker />
          </Form.Item>
          <Form.Item name="gpa" title="绩点(满绩点：5.0)">
            <Input />
          </Form.Item>
          <Form.Item name="description" title="经历描述">
            <TextArea />
          </Form.Item>
        </Form>
      </View>
      <Button loading={loading} style={styles.button} onPress={handleComfirmClick}>提交</Button>
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
