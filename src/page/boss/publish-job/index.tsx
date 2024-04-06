import { Button, Toast } from '@fruits-chain/react-native-xiaoshu'
import { ScrollView, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
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

    await Toast.success({
      message: '发布成功',
      duration: 200,
      onClose: navigation.goBack,
    })
  }

  useEffect(() => {
    form.setFieldsValue({
      companyDescription: '华为创立于1987年，是全球领先的ICT（信息与通信）基础设施和智能终端提供商，我们致力于把数字世界带入每个人、每个家庭、每个组织，构建万物互联的智能世界：让无处不在的联接，成为人人平等的权利；为世界提供最强算力，让云无处不在，让智能无所不及；所有的行业和组织，因强大的数字平台而变得敏捷、高效、生机勃勃；通过AI重新定义体验，让消费者在家居、办公、出行等全场景获得极致的个性化体验。目前华为约有19.4万员工，业务遍及170多个国家和地区，服务30多亿人口。',
      educationRequirement: 1,
      headCount: '2',
      isFullTime: true,
      isOnsite: false,
      jobBonus: [1, 2],
      jobDescription: 'OD岗是介于外包和正编之间，由第三方公司外企德科签署劳动合同，由华为同正编员工统一管理的一种用工模式，具体如下:薪酬：根据面试结果，涨幅在10-50%不等。人事关系：合同、五险一金由人力资源公司外企德科负责业务关系：人员管理、工作分配、培训考核、绩效评比和晋升由华为负责，并且有华为专门的导师带领。OD定位：定位华为预备役，同德科签署劳动合同，在华为研究所办公，参与华为核心项目研发。拥有完善的新员工培养计划。',
      jobLevelId: 4,
      jobLocation: '成都',
      jobName: '前端开发工程师',
      jobRequirements: '前端开发工作经验：1.能力突出，工作年限可以放宽。2.精通基本的web前端技术，css，html。 3.熟练掌握bootstrap，angular7-8，jquery vue等前端框架。 4.熟练开发前后台交互（restful），可以作用前端插件实现复杂功能，有网站性能优化，解决兼容性问题等经验。 ',
      jobCategoryId: 1,
      salary: [10, 100],
      website: 'Iridescent.icu',
      jobExperienceId: 1,
      jobEducationId: 1,
      address: '成都',
    })
  }, [])

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
            <SingleSelect options={jobStore.jobFullTimeOptions}>
            </SingleSelect>
          </Form.Item>
          <Form.Item title="是否线上工作" name="isOnsite" rules={[{ required: true, message: '请输入是否线上工作' }]}>
            <SingleSelect options={jobStore.jobFullTimeOptions}></SingleSelect>
          </Form.Item>
          <Form.Item title="工作描述" name="jobDescription" rules={[{ required: true, message: '请输入工作描述' }]}>
            <TextArea />
          </Form.Item>
          <Form.Item title="工作要求" name="jobRequirements" rules={[{ required: true, message: '请输入工作要求' }]}>
            <TextArea />
          </Form.Item>
          <Form.Item title="工作地点" name="address" rules={[{ required: true, message: '请输入工作地点' }]}>
            <Input></Input>
          </Form.Item>
          <Form.Item title="福利" name="jobBonus" rules={[{ required: true, message: '请输入福利待遇' }]}>
            <MultiSelect options={jobStore.jobBonusOptions}></MultiSelect>
          </Form.Item>
          <Form.Item title="经验" name="jobExperienceId" rules={[{ required: true, message: '请输入工作经验' }]}>
            <SingleSelect options={jobStore.jobExperienceOptions}></SingleSelect>
          </Form.Item>
          <Form.Item title="学历要求" name="jobEducationId" rules={[{ required: true, message: '请输入学历要求' }]}>
            <SingleSelect options={jobStore.jobEducationOptions}></SingleSelect>
          </Form.Item>
          <Form.Item title="工作水平" name="jobLevelId" rules={[{ required: true, message: '请输入工作水平' }]}>
            <SingleSelect options={jobStore.jobLevelOptions}></SingleSelect>
          </Form.Item>
          <Form.Item title="工作类型" name="jobCategoryId" rules={[{ required: true, message: '请输入工作类型' }]}>
            <SingleSelect options={jobStore.jobCategoryOptions}></SingleSelect>
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
