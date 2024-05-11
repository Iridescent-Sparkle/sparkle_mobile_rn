import { request } from '@/core/api'
import Form from '@/core/components/Form'
import Page from '@/core/components/Page'
import TextArea from '@/core/components/TextArea'
import { create } from '@/core/styleSheet'
import { useUserStore } from '@/store/user'
import { Button, Notify, Toast } from '@fruits-chain/react-native-xiaoshu'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { ScrollView, View } from 'react-native'

export default function GeniusUpdateSummary() {
  const form = Form.useForm()

  const navigation = useNavigation()

  const userStore = useUserStore()

  const [loading, setLoading] = useState(false)

  const route = useRoute<{ key: any, name: any, params: { isEdit: string } }>()

  const handleComfirmClick = async () => {
    const { close } = Toast.loading({
      forbidPress: true,
      duration: 0
    })
    try {
      setLoading(true)
      const values = await form.validateFields()

      await request.post({
        id: userStore.userInfo.id,
        ...values,
      }, {
        url: '/genius/profile/update',
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
      const { data: profileData } = await request.get({}, {
        url: '/genius/profile/user',
      })
      form.setFieldsValue({
        summary: profileData.summary,
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
          summary: '1. 拥有一年工作经验，熟悉 HTML、CSS、 JavaScript、TypeScript  等前端基础， 2. 能够熟练使用 React，React Native，Next.js 及其周边生态开发前端应用  3. 熟悉 Vue 2 和 Vue 3全家桶，了解 Nuxt  的使用，能使用 Uniapp  开发小程序 4. 熟悉 Webpack、Vite  等构建工具，能熟练使用 Git和 Gitlab CI 5. 熟悉 Node  常用模块、能够熟练使用 Nest  及其生态开发服务端应用',
        }
      )
    }
  }, [route.params.isEdit])

  return (
    <Page isScrollView={false} title='个人优势'>
      <View style={styles.container}>
        <ScrollView>
          <Form form={form}>
            <Form.Item name="summary" title="个人优势(最多500字)" rules={[{ required: true, message: '请输入个人优势' }]}>
              <TextArea maxLength={500} placeholder='请输入个人优势' />
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
