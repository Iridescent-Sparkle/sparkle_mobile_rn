import { request } from '@/core/api'
import Form from '@/core/components/Form'
import Input from '@/core/components/Input'
import Page from '@/core/components/Page'
import RangeDatePicker from '@/core/components/RangeDatePicker'
import SingleSelect from '@/core/components/SingleSelect'
import TextArea from '@/core/components/TextArea'
import { create } from '@/core/styleSheet'
import { useJobStore } from '@/store/job'
import { useUserStore } from '@/store/user'
import { Button, Notify, Toast } from '@fruits-chain/react-native-xiaoshu'
import { useNavigation, useRoute } from '@react-navigation/native'
import omit from 'lodash/omit'
import { useEffect, useState } from 'react'
import { ScrollView, View } from 'react-native'

export default function GeniusUpdateEducation() {
  const form = Form.useForm()

  const navigation = useNavigation()

  const route = useRoute<{ key: any, name: any, params: { id: number, isEdit: string } }>()

  const [loading, setLoading] = useState(false)

  const userStore = useUserStore()

  const jobStore = useJobStore()

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
            startTime: values.studyTime[0],
            endTime: values.studyTime[1],
          }
          , 'studyTime'), {
          url: '/genius/education/update',
        })
        : await request.post({
          ...values,
          startTime: values.studyTime[0],
          endTime: values.studyTime[1],
        }, {
          url: '/genius/education/create',
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
      const { data: educationData } = await request.get({
        id: route.params.id,
      }, {
        url: '/genius/education/single',
      })

      form.setFieldsValue({
        school: educationData.school,
        profession: educationData.profession,
        studyTime: [new Date(educationData.startTime), new Date(educationData.endTime)],
        gpa: String(educationData.gpa),
        description: educationData.description,
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
        // {
        //   school: "成都大学",
        //   profession: "软件工程",
        //   educationLevel: 5,
        //   studyTime: [new Date("2020-09-01T06:52:27.000Z"), new Date("2024-06-30T06:52:27.000Z")],
        //   gpa: "3.2",
        //   description: "多次获得校级奖学金和校三好学生称号",
        // }
        {
          school: "成都大学",
          profession: "软件工程",
          educationLevel: 5,
          studyTime: [new Date("2020-09-01T06:52:27.000Z"), new Date("2024-06-30T06:52:27.000Z")],
          gpa: "3.6",
          description: "担任学习委员，负责班级学习事务的组织、协调与沟通； 担任学院科创室助理，负责协助老师进行科技创新课程的备课、授课及学生辅导。",
        }
      )
    }
  }, [route.params.isEdit])
console.log(jobStore.jobEducationOptions)
  return (
    <Page isScrollView={false} title='教育信息'>
      <View style={styles.container}>
        <ScrollView>
          <Form form={form}>
            <Form.Item name="school" title="学校" rules={[{ required: true, message: '请输入学校' }]}>
              <Input placeholder='请输入学校' />
            </Form.Item>
            <Form.Item name="profession" title="专业" rules={[{ required: true, message: '请输入专业' }]}>
              <Input placeholder='请输入专业' />
            </Form.Item>
            <Form.Item title="学历" name="educationLevel" rules={[{ required: true, message: '请选择学历' }]}>
              <SingleSelect options={jobStore.jobEducationOptions?.slice(1)} visible={false} title="学历" placeholder="请选择学历" />
            </Form.Item>
            <Form.Item name="studyTime" title="起止时间" rules={[{ required: true, message: '请选择起止时间' }]}>
              <RangeDatePicker />
            </Form.Item>
            <Form.Item name="gpa" title="绩点(满绩点：5.0)" rules={[{ required: true, message: '请输入绩点' }]}>
              <Input placeholder='请输入绩点' />
            </Form.Item>
            <Form.Item name="description" title="经历描述" rules={[{ required: true, message: '请输入经历描述' }]}>
              <TextArea placeholder='请输入经历描述' />
            </Form.Item>
          </Form>
        </ScrollView>
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
