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
      console.log(route.params.id)
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
      console.log(error)
      Toast.fail('获取数据失败')
    }
  }

  useEffect(() => {
    if (route.params.isEdit) {
      getInitData()
    } else {
      form.setFieldsValue(
        // {
        //   projectName: "Pexels图片素材网站",
        //   role: "前端开发",
        //   projectTime: [new Date("2024-01-01T07:03:47.000Z"), new Date("2024-05-12T07:03:47.000Z")],
        //   website: "https://github.com/Iridescent-cdu/pexels-club",
        //   description: "提供免费的图片下载的素材网站，使用瀑布流展示图片列表，用户能够查看图片，下载图片素材，支持PC端和移动端,主要工作：利用Tailwind实现主题变更，编写自定义指令实现图片懒加载、 封装可复用的组件：如瀑布流组件，确认框组件、进行响应式处理，支持PC端和移动端，在路由切换时添加过渡动效、 集成第三方登录和支付宝支付功能，对接阿里云OSS对象存储",
        // }
        // {
        //   projectName: "仿Jira项目管理系统",
        //   role: "前端开发",
        //   projectTime: [new Date("2024-01-01T07:03:47.000Z"), new Date("2024-05-12T07:03:47.000Z")],
        //   website: "https://github.com/Iridescent-cdu/react-jira",
        //   description: "基于React+Typescript的仿Jira项目管理系统，实现了登录注册、及项目列表和任务看板的添加、修改和删除功能主要工作：  使用URL查询参数同步状态，根据同步后的状态获取数据、使用React query并封装Hook实现任务列表乐观更新、实现拖拽排序任务列表并进行持久化、 封装Hook统一处理加载和错误状态，优化用户体验",
        // }
        {
          projectName: "nika-cloud 企业级脚手架",
          role: "后端开发",
          projectTime: [new Date("2024-01-01T07:03:47.000Z"), new Date("2024-05-12T07:03:47.000Z")],
          website: "https://github.com/Poison02/nika-cloud",
          description: "nika-cloud是一款专门企业级开发脚手架，内部进行高度封装集成，覆盖企业级开发常用的工具及业务场景。  达到开箱即用，上手快，学习成本低的价值导向。用于解决中小项目进行开发时，每次要进行框架搭建选择的痛点。进行统一的规范和组件封装，使开发者更加专注于业务价值。",
        }
        // {
        //   projectName: "hades-club",
        //   role: "后端开发",
        //   projectTime: [new Date("2024-01-01T07:03:47.000Z"), new Date("2024-05-12T07:03:47.000Z")],
        //   website: "https://github.com/Poison02/hades-club",
        //   description: "hades-club是一款专门为程序员打造的沟通交流社区，采用主流的微服务框架+主流C端技术栈来做为技术架构。旨在统一程序员信息差，进行平台统一化，程序员可以在平台，完善自身知识，刷自身薄弱点面试题，配合练习，模拟面试，简历分析模块来提升程序员面试能力。",
        // }
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
