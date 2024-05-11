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
          summary: '拥有一年工作经验，擅长react、react native、Next和微信小程序的开发',
        }
      )
    }
  }, [route.params.isEdit])

  return (
    <Page isScrollView={false} title='个人总结'>
      <View style={styles.container}>
        <ScrollView>
          <Form form={form}>
            <Form.Item name="summary" title="总结(最多500字)" rules={[{ required: true, message: '请输入总结' }]}>
              <TextArea maxLength={500} placeholder='请输入总结'/>
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
