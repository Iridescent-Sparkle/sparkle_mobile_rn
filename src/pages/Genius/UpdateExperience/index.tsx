import { request } from '@/core/api'
import Form from '@/core/components/Form'
import Input from '@/core/components/Input'
import Page from '@/core/components/Page'
import RangeDatePicker from '@/core/components/RangeDatePicker'
import Switch from '@/core/components/Switch'
import TextArea from '@/core/components/TextArea'
import { create } from '@/core/styleSheet'
import { Button, Notify, Toast } from '@fruits-chain/react-native-xiaoshu'
import { useNavigation, useRoute } from '@react-navigation/native'
import omit from 'lodash/omit'
import { useEffect, useState } from 'react'
import { ScrollView, View } from 'react-native'
import { useUserStore } from '../../../store/user/index'

export default function GeniusUpdateExperience() {
  const form = Form.useForm()

  const navigation = useNavigation()

  const userStore = useUserStore()

  const route = useRoute<{ key: any, name: any, params: { id: number, isEdit: string } }>()

  const [loading, setLoading] = useState(false)

  const handleComfirmClick = async () => {
    const { close } = Toast.loading({
      forbidPress: true,
      duration: 0
    })
    try {
      setLoading(true)
      const values = await form.validateFields()
      route.params.isEdit
        ? await request.post(omit(
          {
            ...values,
            id: route.params.id,
            userId: userStore.userInfo.id,
            startTime: values.workTime[0],
            endTime: values.workTime[1],
          }, 'workTime'
        ), {
          url: '/genius/experience/update',
        })
        : await request.post({
          ...values,
          startTime: values.workTime[0],
          endTime: values.workTime[1],
        }, {
          url: '/genius/experience/create',
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
      Toast.fail('获取数据失败')
    }
  }

  useEffect(() => {
    route.params.isEdit && getInitData()
  }, [route.params.isEdit])

  return (
    <Page isScrollView={false} title='工作经历'>
      <View style={styles.container}>
        <ScrollView>
          <Form form={form}>
            <Form.Item name="profession" title="职位" rules={[{ required: true, message: '请输入职位' }]}>
              <Input placeholder='请输入职位' />
            </Form.Item>
            <Form.Item name="companyName" title="公司" rules={[{ required: true, message: '请输入公司' }]}>
              <Input placeholder='请输入公司' />
            </Form.Item>
            <Form.Item name="workTime" title="起止时间" rules={[{ required: true, message: '请选择起止时间' }]}>
              <RangeDatePicker />
            </Form.Item>
            <Form.Item name="isWork" title="是否在职" rules={[{ required: true, message: '请选择是否在职' }]}>
              <Switch />
            </Form.Item>
            <Form.Item name="description" title="工作描述" rules={[{ required: true, message: '请输入工作描述' }]}>
              <TextArea placeholder='请输入工作描述' />
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

