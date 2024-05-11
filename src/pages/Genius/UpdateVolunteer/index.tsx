import { request } from '@/core/api'
import Form from '@/core/components/Form'
import Input from '@/core/components/Input'
import Page from '@/core/components/Page'
import RangeDatePicker from '@/core/components/RangeDatePicker'
import TextArea from '@/core/components/TextArea'
import { create } from '@/core/styleSheet'
import { useUserStore } from '@/store/user'
import { Button, Notify, Toast } from '@fruits-chain/react-native-xiaoshu'
import { useNavigation, useRoute } from '@react-navigation/native'
import omit from 'lodash/omit'
import { useEffect, useState } from 'react'
import { ScrollView, View } from 'react-native'

export default function GeniusUpdateVolunteer() {
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
        ? await request.post(omit({
          ...values,
          id: route.params.id,
          userId: userStore.userInfo.id,
          startTime: values.activityTime[0],
          endTime: values.activityTime[1],
        }, 'activityTime'), {
          url: '/genius/volunteer/update',
        })
        : await request.post({
          ...values,
          startTime: values.activityTime[0],
          endTime: values.activityTime[1],
        }, {
          url: '/genius/volunteer/create',
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
      Toast.fail('获取数据失败')
    }
  }

  useEffect(() => {
    if (route.params.isEdit) {
      getInitData()
    } else {
      form.setFieldsValue(
        {
          activityName: "三下乡",
          role: "队长",
          activityTime: [new Date("2021-05-01T07:23:40.000Z"), new Date("2021-08-31T07:23:40.000Z")],
          description: "参观成都博物馆",
        }
      )
    }
  }, [route.params.isEdit])

  return (
    <Page isScrollView={false} title='志愿活动信息'>
      <View style={styles.container}>
        <ScrollView>
          <Form form={form}>
            <Form.Item name="activityName" title="活动名称" rules={[{ required: true, message: '请输入活动名称' }]}>
              <Input placeholder='请输入活动名称' />
            </Form.Item>
            <Form.Item name="role" title="承担角色" rules={[{ required: true, message: '请输入承担角色' }]}>
              <Input placeholder='请输入承担角色' />
            </Form.Item>
            <Form.Item name="activityTime" title="起止时间" rules={[{ required: true, message: '请选择起止时间' }]}>
              <RangeDatePicker />
            </Form.Item>
            <Form.Item name="description" title="经历描述" rules={[{ required: true, message: '请输入经历描述' }]}>
              <TextArea placeholder='请输入经历描述' />
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
