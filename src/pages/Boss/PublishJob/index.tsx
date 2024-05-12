import { request } from '@/core/api'
import Form from '@/core/components/Form'
import Input from '@/core/components/Input'
import MultiSelect from '@/core/components/MultiSelect'
import Page from '@/core/components/Page'
import SingleSelect from '@/core/components/SingleSelect'
import Slider from '@/core/components/Slider'
import TextArea from '@/core/components/TextArea'
import { create } from '@/core/styleSheet'
import { useJobStore } from '@/store/job'
import { Button, Dialog, Toast } from '@fruits-chain/react-native-xiaoshu'
import { StackActions, useNavigation, useRoute } from '@react-navigation/native'
import { useEffect } from 'react'
import { ScrollView } from 'react-native'
import { useUserStore } from '../../../store/user/index'

export default function PublishJob() {
  const userStore = useUserStore()

  const form = Form.useForm()

  const route = useRoute<{ key: any, name: any, params: { jobId: string } }>()

  const navigation = useNavigation()

  const jobStore = useJobStore()

  const getInitData = async () => {
    try {
      if (route.params?.jobId) {
        userStore.getUserInfo()

        const { data: jobDetail }: { data: JobDetail } = await request.get({}, { url: `boss/job/${route.params.jobId}` })

        form.setFieldsValue({
          jobName: jobDetail.jobName,
          salary: [parseInt(jobDetail.minSalary, 10), parseInt(jobDetail.maxSalary, 10)],
          isFullTime: jobDetail.isFullTime,
          isOnsite: jobDetail.isOnsite,
          jobExperienceId: jobDetail.jobExperienceId,
          jobEducationId: jobDetail.jobEducationId,
          jobLevelId: jobDetail.jobEducationId,
          jobCategoryId: jobDetail.jobCategoryId,
          jobDescription: jobDetail.jobDescription,
          jobRequirements: jobDetail.jobRequirements,
          address: jobDetail.address,
          jobBonus: jobDetail.jobBonus.map(item => item.id),
          headCount: String(jobDetail.headCount),
        })
      }
      else {
        // form.setFieldsValue({
        //   jobName: '前端开发工程师',
        //   salary: [15, 20],
        //   isFullTime: true,
        //   isOnsite: false,
        //   jobExperienceId: 3,
        //   jobEducationId: 5,
        //   jobLevelId: 3,
        //   jobCategoryId: 2,
        //   jobDescription: '1、负责产品web页面、小程序、RN的前端代码设计、编写与开发 2、与pm、产品及运营人员沟通，保证产品的质量和开发进度 3、负责优化相关的产品的质量、性能、用户体验 4、负责前端基础设施建设，业务组件、工程化设施等',
        //   jobRequirements: '1、JS基础扎实，熟悉typescript超集，还有语法规则ES6；  2、熟悉VUE、React等前端框架； 3、熟练使用Echart、Element UI、D3等组件，具备修改或自定义绘图组件的能力；  4、具备基本的架构设计能力； 5、具备前端性能优化能力；  6、熟悉Docker与K8S部署优先； 7、熟悉后端与Java基础优先； 8、具备一定项目管理能力者优先；  9.统招全日制本科及以上学历。',
        //   address: '成都',
        //   jobBonus: [3, 4, 9, 10, 11, 13, 14, 16, 17, 20],
        //   headCount: '3',
        // })
        // form.setFieldsValue({
        //   jobName: '前端开发工程师',
        //   salary: [20, 30],
        //   isFullTime: true,
        //   isOnsite: false,
        //   jobExperienceId: 4,
        //   jobEducationId: 5,
        //   jobLevelId: 4,
        //   jobCategoryId: 2,
        //   jobDescription: '1、负责产品web页面、小程序、RN的前端代码设计、编写与开发 2、与pm、产品及运营人员沟通，保证产品的质量和开发进度 3、负责优化相关的产品的质量、性能、用户体验 4、负责前端基础设施建设，业务组件、工程化设施等5、带领团队完成部分历史项目重构工作  6、编写高质量、可维护的代码，遵循团队编码规范 7、指导初级和中级前端工程师，参与技术分享，提升团队整体技术水平',
        //   jobRequirements: '1、JS基础扎实，熟悉typescript超集，还有语法规则ES6；  2、熟悉VUE、React等前端框架； 3、熟练使用Echart、Element UI、D3等组件，具备修改或自定义绘图组件的能力；  4、具备基本的架构设计能力； 5、具备前端性能优化能力；  6、熟悉Docker与K8S部署优先； 7、熟悉后端与Java基础优先； 8、具备一定项目管理能力者优先；  9.统招全日制本科及以上学历。',
        //   address: '成都',
        //   jobBonus: [3, 4, 9, 10, 11, 13, 14, 16, 17, 20],
        //   headCount: '2',
        // })
        form.setFieldsValue({
          jobName: '美团酒店业务经理',
          salary: [6, 10],
          isFullTime: true,
          isOnsite: false,
          jobExperienceId: 4,
          jobEducationId: 5,
          jobLevelId: 4,
          jobCategoryId: 2,
          jobDescription: '主要以电话沟通和商家沟通 针对已经合作了美团的酒店商家相关问题的解决，帮助商家做方案优化，提高商家销量，新活动二次谈判； 处理酒店合作过程中出现的活动、价格调整、方案变更、到期后续签等日常运营事务 结合当地商圈的流量变化制定明确的运营提升方案',
          jobRequirements: '较强的自我管理能力，优秀的表达能力和沟通技巧； 有极强的责任心和服务意识，执行力强，抗压能力强，富有团队合作精神； 有较强的学习能力，善于总结和发现问题； 有酒店行业、电销及互联网从业经验者优先； 全日制大专及以上学历；',
          address: '成都',
          jobBonus: [3, 4, 9, 10, 11, 13, 14, 16, 17, 20],
          headCount: '2',
        })
        form.setFieldsValue({
          jobName: '餐饮商户运营',
          salary: [7, 10],
          isFullTime: true,
          isOnsite: false,
          jobExperienceId: 4,
          jobEducationId: 5,
          jobLevelId: 4,
          jobCategoryId: 2,
          jobDescription: '1、负责美团全国城市餐饮商户线上运营，对商户的经营改善负责，促成商户与平台的持续合作； 2、通过主动电话外呼，与合作商户负责人建立客情，洞察经营需求，并提供专业的线上营销解决方案； 3、接听商户电话，及时响应商户诉求，在规则内协助其进行团购、代金券、广告投放等系统设置，为商户提供良好',
          jobRequirements: '1、专科及以上学历；  2、能够熟练使用常用办公软件； 3、有很强的学习能力和适应能力，能够快速迭代，拥抱变化； 4、积极主动、富有激情、具有良好的适应能力和沟通能力。',
          address: '成都',
          jobBonus: [3, 4, 9, 10, 11, 13, 14, 16, 17, 20],
          headCount: '2',
        })
      }
    }
    catch (error) {
      Toast.fail({ message: '获取职位详情失败' })
    }
  }

  useEffect(() => {
    getInitData()
  }, [])

  const handleConfirmClick = async () => {
    const values = await form.validateFields()

    const minSalary = values.salary[0]
    const maxSalary = values.salary[1]

    if (route.params?.jobId) {
      await request.post({
        ...values,
        id: route.params?.jobId,
        minSalary,
        maxSalary,
        companyId: userStore.userInfo.companyId,
      }, { url: `boss/job/update` })

      await Toast.success({
        message: '修改成功',
        duration: 200,
        onClose: navigation.goBack,
      })
      return
    }

    if (Number(userStore.userInfo.integral) < 1) {
      Dialog.confirm({
        title: '积分不足',
        message: '本次发布职位需消耗1积分',
        confirmButtonText: '去充值',
      }).then(async (action) => {
        if (action === 'confirm')
          navigation.dispatch(StackActions.push('RechargeIntegral'))
      })
    }
    else {
      Dialog.confirm({
        title: '发布职位',
        message: '本次发布职位需消耗1积分',
      }).then(async (action) => {
        if (action === 'confirm') {
          await Promise.all([
            request.post({
              integral: 1,
            }, { url: 'boss/integral/consume' }),
            request.post({
              integral: 1,
              type: 'publish',
              isConsume: true,
            }, { url: 'boss/consume/create' }),
            request.post({
              ...values,
              minSalary,
              maxSalary,
              companyId: userStore.userInfo.companyId,
            }, { url: 'boss/job/create' })
          ])

          await Toast.success({
            message: '发布成功',
            duration: 200,
            onClose: navigation.goBack,
          })
        }
      })
    }
  }

  return (
    <Page title="发布职位">
      <ScrollView>
        <Form form={form}>
          <Form.Item title="职位名称" name="jobName" rules={[{ required: true, message: '请输入职位名称' }]}>
            <Input placeholder="请输入职位名称" />
          </Form.Item>
          <Form.Item title="薪资" name="salary" rules={[{ required: true, message: '请输入薪资' }]}>
            <Slider min={1} max={50}>
            </Slider>
          </Form.Item>
          <Form.Item title="是否全职" name="isFullTime" rules={[{ required: true, message: '请选择是否全职' }]}>
            <SingleSelect options={jobStore.jobFullTimeOptions} visible={false} title="是否全职" placeholder="请选择是否全职" />
          </Form.Item>
          <Form.Item title="是否线上工作" name="isOnsite" rules={[{ required: true, message: '请选择是否线上工作' }]}>
            <SingleSelect options={jobStore.jobFullTimeOptions} visible={false} title="是否线上工作" placeholder="请选择是否线上工作" />
          </Form.Item>
          <Form.Item title="工作描述" name="jobDescription" rules={[{ required: true, message: '请输入工作描述' }]}>
            <TextArea placeholder="请输入工作描述" />
          </Form.Item>
          <Form.Item title="工作要求" name="jobRequirements" rules={[{ required: true, message: '请输入工作要求' }]}>
            <TextArea placeholder="请输入工作要求" />
          </Form.Item>
          <Form.Item title="工作地点" name="address" rules={[{ required: true, message: '请输入工作地点' }]}>
            <Input placeholder="请输入工作地点" />
          </Form.Item>
          <Form.Item title="福利" name="jobBonus" rules={[{ required: true, message: '请选择福利待遇' }]}>
            <MultiSelect options={jobStore.jobBonusOptions} visible={false} title="福利" placeholder="请选择福利待遇" />
          </Form.Item>
          <Form.Item title="经验" name="jobExperienceId" rules={[{ required: true, message: '请选择工作经验要求' }]}>
            <SingleSelect options={jobStore.jobExperienceOptions} visible={false} title="经验" placeholder="请选择工作经验要求" />
          </Form.Item>
          <Form.Item title="学历要求" name="jobEducationId" rules={[{ required: true, message: '请选择学历要求' }]}>
            <SingleSelect options={jobStore.jobEducationOptions} visible={false} title="学历要求" placeholder="请选择学历要求" />
          </Form.Item>
          <Form.Item title="工作水平" name="jobLevelId" rules={[{ required: true, message: '请选择工作水平要求' }]}>
            <SingleSelect options={jobStore.jobLevelOptions} visible={false} title="工作水平" placeholder="请选择工作水平要求" />
          </Form.Item>
          <Form.Item title="工作类型" name="jobCategoryId" rules={[{ required: true, message: '请选择工作类型' }]}>
            <SingleSelect options={jobStore.jobCategoryOptions} visible={false} title="工作类型" placeholder="请选择工作类型" />
          </Form.Item>
          <Form.Item title="空缺" name="headCount" rules={[{ required: true, message: '请输入空缺' }]}>
            <Input placeholder="请输入空缺" />
          </Form.Item>
        </Form>
      </ScrollView>
      <Button style={styles.button} onPress={handleConfirmClick}>提交</Button>
    </Page>
  )
}

const styles = create({
  button: {
    borderRadius: 24,
  },
})
