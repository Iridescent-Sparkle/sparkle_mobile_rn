import { Button } from '@fruits-chain/react-native-xiaoshu'
import { ScrollView, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useEffect } from 'react'
import Form from '@/core/components/Form'
import Input from '@/core/components/Input'
import MultiSelect from '@/core/components/MultiSelect'
import SingleSelect from '@/core/components/SingleSelect'
import Slider from '@/core/components/Slider'
import TextArea from '@/core/components/TextArea'
import { create } from '@/core/styleSheet'
import { request } from '@/core/api'

export default function PublishJob() {
  const form = Form.useForm()

  const insets = useSafeAreaInsets()

  const handleConfirmClick = async () => {
    const values = await form.validateFields()

    const minSalary = values.salary[0]
    const maxSalary = values.salary[1]

    request.post({
      ...values,
      minSalary,
      maxSalary,
    }, {
      url: 'job',
    })
  }
  useEffect(() => {
    form.setFieldsValue({ companyDescription: 'Test', educationRequirement: '4', headCount: '2', isFullTime: '1', isOnsite: '1', jobBonus: ['cyjxwc', 'jjzfbt', 'jrlp', 'ndtj', 'mfjsss', 'jtgaj', 'jtzxbx', 'zfbt', 'tjzc', 'lsxwc', 'cb', 'dxnj', 'ybbz', 'gpqq', 'jxjj', 'znj'], jobCategory: '1', jobDescription: 'test', jobLevel: '4', jobLocation: 'test', jobName: 'test', jobRequirements: 'test', jobType: 'test', jobWorkingDays: 'test', jobWorkingEducation: 'test', jobWorkingEnvironment: 'test', jobWorkingExperience: 'test', jobWorkingHours: 'test', jobWorkingPlace: 'test', jobWorkingRequirements: 'test', jobWorkingTime: 'test', salary: [10, 100], website: 'Iridescent.icu', workExperience: '1' })
  }, [])
  const FullTimeOptions = [{
    label: '是',
    value: '1',
  }, {
    label: '否',
    value: '0',
  }]

  const jobBonusOptions = [{
    label: '餐饮及下午茶',
    value: 'cyjxwc',
  }, {
    label: '就近租房补贴',
    value: 'jjzfbt',
  }, {
    label: '节日礼品',
    value: 'jrlp',
  }, {
    label: '年度体检',
    value: 'ndtj',
  }, {
    label: '免费健身设施',
    value: 'mfjsss',
  }, {
    label: '家庭关爱假',
    value: 'jtgaj',
  }, {
    label: '家庭自选保险',
    value: 'jtzxbx',
  }, {
    label: '住房补贴',
    value: 'zfbt',
  }, {
    label: '团建聚餐',
    value: 'tjzc',
  }, {
    label: '零食下午茶',
    value: 'lsxwc',
  }, {
    label: '餐补',
    value: 'cb',
  }, {
    label: '带薪年假',
    value: 'dxnj',
  }, {
    label: '夜班补助',
    value: 'ybbz',
  }, {
    label: '股票期权',
    value: 'gpqq',
  }, {
    label: '绩效奖金',
    value: 'jxjj',
  }, {
    label: '年终奖',
    value: 'nzj',
  }, {
    label: '定期体检',
    value: 'dqtj',
  }, {
    label: '意外险',
    value: 'ywx',
  }, {
    label: '补充医疗保险',
    value: 'bcylbx',
  }, {
    label: '五险一金',
    value: 'wxyj',
  }]
  const workExperienceOptions = [
    {
      label: '1年以下',
      value: '1',
    },
    {
      label: '1-3年',
      value: '2',
    },
    {
      label: '3-5年',
      value: '3',
    },
    {
      label: '5-10年',
      value: '4',
    },
    {
      label: '10年以上',
      value: '5',
    },
  ]
  const educationRequirementOptions = [
    {
      label: '不限',
      value: '0',
    },
    {
      label: '初中及以下',
      value: '1',
    },
    {
      label: '高中',
      value: '2',
    },
    {
      label: '大专',
      value: '3',
    },
    {
      label: '本科',
      value: '4',
    },
    {
      label: '硕士',
      value: '5',
    },
    {
      label: '博士',
      value: '6',
    },
  ]
  const jobLevelOptions = [{
    label: '不限',
    value: '0',
  }, {
    label: '初级',
    value: '1',
  }, {
    label: '中级',
    value: '2',
  }, {
    label: '高级',
    value: '3',
  }, {
    label: '组长',
    value: '4',
  }, {
    label: '经理',
    value: '5',
  }]

  const jobCategoryOptions = [{
    label: '不限',
    value: '0',
  }, {
    label: '前端',
    value: '1',
  }, {
    label: '后端',
    value: '2',
  }, {
    label: '全栈',
    value: '3',
  }, {
    label: '产品',
    value: '4',
  }, {
    label: '设计',
    value: '5',
  }]
  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <ScrollView>
        <Form form={form}>
          <Form.Item title="职位名称" name="jobName" rules={[{ required: true, message: '请输入职位名称' }]}>
            <Input></Input>
          </Form.Item>
          <Form.Item title="薪资" name="salary" rules={[{ required: true, message: '请输入薪资' }]}>
            <Slider
              min={1}
              max={100}
            >
            </Slider>
          </Form.Item>
          <Form.Item title="是否全职" name="isFullTime" rules={[{ required: true, message: '请输入是否全职' }]}>
            <SingleSelect options={FullTimeOptions}>
            </SingleSelect>
          </Form.Item>
          <Form.Item title="是否线上工作" name="isOnsite" rules={[{ required: true, message: '请输入是否线上工作' }]}>
            <SingleSelect options={FullTimeOptions}></SingleSelect>
          </Form.Item>
          <Form.Item title="工作描述" name="jobDescription" rules={[{ required: true, message: '请输入工作描述' }]}>
            <TextArea />
          </Form.Item>
          <Form.Item title="工作要求" name="jobRequirements" rules={[{ required: true, message: '请输入工作要求' }]}>
            <TextArea />
          </Form.Item>
          <Form.Item title="福利" name="jobBonus" rules={[{ required: true, message: '请输入福利待遇' }]}>
            <MultiSelect options={jobBonusOptions}></MultiSelect>
          </Form.Item>
          <Form.Item title="经验" name="workExperience" rules={[{ required: true, message: '请输入工作经验' }]}>
            <SingleSelect options={workExperienceOptions}></SingleSelect>
          </Form.Item>
          <Form.Item title="学历要求" name="educationRequirement" rules={[{ required: true, message: '请输入学历要求' }]}>
            <SingleSelect options={educationRequirementOptions}></SingleSelect>
          </Form.Item>
          <Form.Item title="工作水平" name="jobLevel" rules={[{ required: true, message: '请输入工作水平' }]}>
            <SingleSelect options={jobLevelOptions}></SingleSelect>
          </Form.Item>
          <Form.Item title="工作类型" name="jobCategory" rules={[{ required: true, message: '请输入工作类型' }]}>
            <SingleSelect options={jobCategoryOptions}></SingleSelect>
          </Form.Item>
          <Form.Item title="空缺" name="headCount" rules={[{ required: true, message: '请输入空缺' }]}>
            <Input></Input>
          </Form.Item>
          <Form.Item title="网站" name="website">
            <Input></Input>
          </Form.Item>
          <Form.Item title="关于" name="companyDescription">
            <TextArea />
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
