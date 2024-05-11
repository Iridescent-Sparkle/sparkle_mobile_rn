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

export default function GeniusUpdateProject() {
  const form = Form.useForm()

  const navigation = useNavigation()

  const route = useRoute<{ key: any, name: any, params: { id: number, isEdit: string } }>()

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

      route.params.isEdit
        ? await request.post(omit({
          ...values,
          id: route.params.id,
          userId: userStore.userInfo.id,
          startTime: values.projectTime[0],
          endTime: values.projectTime[1],
        }, 'projectTime'), {
          url: '/genius/project/update',
        })
        : await request.post({
          ...values,
          startTime: values.projectTime[0],
          endTime: values.projectTime[1],
        }, {
          url: '/genius/project/create',
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
      const { data: projectData } = await request.get({
        id: route.params.id,
      }, {
        url: '/genius/project/single',
      })
      form.setFieldsValue({
        projectName: projectData.projectName,
        role: projectData.role,
        projectTime: [new Date(projectData.startTime), new Date(projectData.endTime)],
        website: projectData.website,
        description: projectData.description,
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
          projectName: "招聘app",
          role: "前端，后端",
          projectTime: [new Date("2024-01-01T07:03:47.000Z"), new Date("2024-05-12T07:03:47.000Z")],
          website: "manage.iridescent.icu",
          description: "完成招聘app从零到一开发到上线",
        }
      )
    }
  }, [route.params.isEdit])

  return (
    <Page isScrollView={false} title='项目经历'>
      <View style={styles.container}>
        <ScrollView>
          <Form form={form}>
            <Form.Item name="projectName" title="项目名称" rules={[{ required: true, message: '请输入项目名称' }]}>
              <Input placeholder='请输入项目名称' />
            </Form.Item>
            <Form.Item name="role" title="承担角色" rules={[{ required: true, message: '请输入承担角色' }]}>
              <Input placeholder='请输入承担角色' />
            </Form.Item>
            <Form.Item name="projectTime" title="起止时间" rules={[{ required: true, message: '请选择起止时间' }]}>
              <RangeDatePicker />
            </Form.Item>
            <Form.Item name="description" title="经历描述" rules={[{ required: true, message: '请输入经历描述' }]}>
              <TextArea placeholder='请输入经历描述' />
            </Form.Item>
            <Form.Item name="website" title="项目地址">
              <TextArea placeholder='请输入项目地址' />
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
