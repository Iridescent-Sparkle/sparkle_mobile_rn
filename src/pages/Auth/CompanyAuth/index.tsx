import { request } from '@/core/api'
import Form from '@/core/components/Form'
import ImageUploader from '@/core/components/ImageUploader'
import Input from '@/core/components/Input'
import Page from '@/core/components/Page'
import { create } from '@/core/styleSheet'
import { useUserStore } from '@/store/user'
import { Button, Notify, Toast } from '@fruits-chain/react-native-xiaoshu'
import { useNavigation } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { ScrollView, View } from 'react-native'
import LicenseUploader from './components/LicenseUploader'
import TextArea from '@/core/components/TextArea'

export default function CompanyAuth() {
  const form = Form.useForm()

  const navigation = useNavigation()

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

      await request.post({
        id: userStore.userInfo.id,
        status: 0,
        ...values,
      }, {
        url: '/user/company/create',
      })
      await userStore.getUserInfo()
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
      await userStore.getUserInfo()

      form.setFieldsValue({
        companyAvatar: userStore.userInfo.company.companyAvatar,
        companyName: userStore.userInfo.company.companyName,
        companyLicense: userStore.userInfo.company.companyLicense,
        companyDesc: userStore.userInfo.company.companyDesc,
        companyAddress: userStore.userInfo.company.companyAddress,
      })
    }
    catch (error) {
      Toast.fail('获取数据失败')
    }
  }

  useEffect(() => {
    if (userStore.userInfo.company) {
      getInitData()
    } else {
      form.setFieldsValue(
        // {
        //   companyName: "成都鱼泡科技有限公司(鱼泡网)",
        //   companyAddress: "中国（四川）自由贸易试验区成都高新区益州大道中段1858号3F",
        //   companyDesc: "成都鱼泡科技有限公司(鱼泡网)成立于2017年，是中国领先的招聘服务平台，总部（研发中心）坐落于成都高新区天府软件园G5，运营中心位于宜宾市三江新区。公司依托大数据、AI算法等数字科技，布局以鱼泡网、鱼泡到家为核心的生态矩阵，为用户提供智能高效的招聘求职及工作协同服务。拥有2项发明专利、6项实用新型专利、72项计算机软件著作权，研发团队规模300+人，曾获人社部“全国优秀创业创新项目”、四川省专精特新中小企业、四川省新经济示范企业、四川省新经济重点平台、四川省人力资源服务行业龙头企业、成都市新经济示范企业、成都独角兽（潜在）企业等荣誉资质，于2021、2022年先后完成A、B两轮数亿元人民币融资。",
        // }
        {
          companyName: "北京三快在线科技有限公司",
          companyAddress: "北京市海淀区北四环西路9号2106-030",
          companyDesc: "美团是一家科技零售公司。美团以“零售+科技”的战略践行“帮大家吃得更好，生活更好”的公司使命。美团酒店是美团旗下的综合住宿服务平台，始终秉承“帮大家住得更好”的使命。在用户侧，美团酒店专注于挖掘多样住宿场景，满足用户多元化的入住需求；在商家侧，美团酒店致力于科技创新，助力酒店商家综合收益提升，不断推进行业数字化发展；为更好回馈社会，美团酒店联合酒店商家共同发起了“乡村儿童操场”公益项目，截至2021年底，有超过9万的酒店商家参与，共计捐赠落成102个乡村操场。",
        }
      )
    }

  }, [])

  return (
    <Page isScrollView={false} title='企业信息'>
      <View style={styles.container}>
        <ScrollView>
          <Form form={form}>
            <Form.Item name="companyAvatar" title="企业头像" rules={[{ required: true, message: '请上传企业头像' }]}>
              <ImageUploader />
            </Form.Item>
            <Form.Item name="companyName" title="企业名称" rules={[{ required: true, message: '请输入企业名称' }]}>
              <Input placeholder='请输入企业名称' />
            </Form.Item>
            <Form.Item name="companyAddress" title="企业地址" rules={[{ required: true, message: '请输入企业地址' }]}>
              <Input placeholder='请输入企业地址' />
            </Form.Item>
            <Form.Item name="companyDesc" title="企业描述" rules={[{ required: true, message: '请输入企业描述' }]}>
              <TextArea placeholder='请输入企业描述' />
            </Form.Item>
            <Form.Item name="companyLicense" title="上传营业执照" rules={[{ required: true, message: '请上传营业执照' }]}>
              <LicenseUploader />
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
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
    marginVertical: 24,
    borderRadius: 24,
  },
  img: {
    height: 200,
  },
})
