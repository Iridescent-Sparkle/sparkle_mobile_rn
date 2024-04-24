import { Button, Dialog, Toast } from '@fruits-chain/react-native-xiaoshu'
import { ScrollView, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useEffect } from 'react'
import { StackActions, useNavigation, useRoute } from '@react-navigation/native'
import { useUserStore } from '../../../store/user/index'
import Form from '@/core/components/Form'
import Input from '@/core/components/Input'
import MultiSelect from '@/core/components/MultiSelect'
import SingleSelect from '@/core/components/SingleSelect'
import Slider from '@/core/components/Slider'
import TextArea from '@/core/components/TextArea'
import { create } from '@/core/styleSheet'
import { request } from '@/core/api'
import { useJobStore } from '@/store/job'

export default function PublishJob() {
  const insets = useSafeAreaInsets()
  const userStore = useUserStore()
  const form = Form.useForm()
  const route = useRoute<{ key: any, name: any, params: { jobId: string } }>()
  const navigation = useNavigation()

  const jobStore = useJobStore()

  const handleConfirmClick = async () => {
    const values = await form.validateFields()

    const minSalary = values.salary[0]
    const maxSalary = values.salary[1]

    await request.post({
      ...values,
      minSalary,
      maxSalary,
      companyId: userStore.userInfo.companyId,
    }, { url: 'boss/job' })

    if (route.params?.jobId) {
      await request.post({
        ...values,
        minSalary,
        maxSalary,
        companyId: userStore.userInfo.companyId,
      }, { url: `boss/job/${route.params.jobId}` })

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
          await request.post({
            integral: 1,
          }, { url: 'boss/integral/consume' })

          await request.post({
            integral: 1,
            type: 'publish',
            isConsume: true,
          }, { url: 'boss/consume/create' })

          await request.post({
            ...values,
            minSalary,
            maxSalary,
            companyId: userStore.userInfo.companyId,
          }, { url: 'boss/job' })

          await Toast.success({
            message: '发布成功',
            duration: 200,
            onClose: navigation.goBack,
          })
        }
      })
    }
  }

  const getInitData = async () => {
    try {
      if (route.params?.jobId) {
        userStore.getUserInfo()
        const { data: jobDetail }: { data: JobDetail } = await request.get({}, { url: `boss/job/${route.params.jobId}` })
        form.setFieldsValue({
          jobName: jobDetail.jobName,
          salary: [jobDetail.minSalary, jobDetail.maxSalary],
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
          website: jobDetail.website,
          companyDescription: jobDetail.companyDescription,
        })
      }
      else {
        form.setFieldsValue({
          salary: [1, 100],
          isFullTime: true,
          isOnsite: false,
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

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom || 16 }]}>
      <ScrollView>
        <Form form={form}>
          <Form.Item title="职位名称" name="jobName" rules={[{ required: true, message: '请输入职位名称' }]}>
            <Input placeholder="请输入职位名称" />
          </Form.Item>
          <Form.Item title="薪资" name="salary" rules={[{ required: true, message: '请输入薪资' }]}>
            <Slider min={1} max={100}>
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
          <Form.Item title="公司网址" name="website">
            <Input placeholder="请输入公司网址" />
          </Form.Item>
          <Form.Item title="公司介绍" name="companyDescription">
            <TextArea placeholder="请输入公司介绍" />
          </Form.Item>
        </Form>
      </ScrollView>
      <Button style={styles.button} onPress={handleConfirmClick}>提交</Button>
    </View>
  )
}

const styles = create({
  container: {
    flex: 1,
    paddingHorizontal: 44,
    backgroundColor: '#FFF',

  },
  button: {
    borderRadius: 24,
  },
})
