import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useEffect } from 'react'
import { useChatContext } from 'react-native-chat-uikit'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Toast } from '@fruits-chain/react-native-xiaoshu'
import BossTabLayout from '../menu/boss'
import GeniusTabLayout from '../menu/genius'
import { IMAGE_PREFIX } from '@/core/constants'
import SearchPage from '@/menu/boss/member/components/Search'
import ForgetGuide from '@/page/auth/forget-guide'
import Guide from '@/page/auth/guide'
import Login from '@/page/auth/login'
import Register from '@/page/auth/register'
import ResetPassword from '@/page/auth/reset-password'
import UserChange from '@/page/auth/user-change'
import PublishJob from '@/page/boss/publish-job'
import ResumeDetail from '@/page/boss/resume-detail'
import GeniusChatDetail from '@/page/genius/chat-detail'
import DeliverDetail from '@/page/genius/deliver-detail'
import JobDetail from '@/page/genius/job-detail'
import ResumePreview from '@/page/genius/resume-preview'
import GeniusUpdateContact from '@/page/genius/update-contact'
import GeniusUpdateEducation from '@/page/genius/update-education'
import GeniusUpdateExperience from '@/page/genius/update-experience'
import GeniusUpdateProfile from '@/page/genius/update-profile'
import GeniusUpdateProject from '@/page/genius/update-project'
import GeniusUpdateResume from '@/page/genius/update-resume'
import GeniusUpdateSalary from '@/page/genius/update-salary'
import GeniusUpdateSummary from '@/page/genius/update-summary'
import GeniusUpdateVolunteer from '@/page/genius/update-volunteer'
import Setting from '@/page/setting'
import { useJobStore } from '@/store/job'
import { useUserStore } from '@/store/user'
import DeliverList from '@/page/boss/deliver-list'
import RechargeIntegral from '@/page/boss/recharge-integral'
import CompanyAuth from '@/page/auth/company-auth'
import IntegralList from '@/page/boss/integral-list'
import CompanyInfo from '@/page/boss/company-info'
import ContactList from '@/page/boss/contact-list'

const Stack = createNativeStackNavigator()

function RouteProvider() {
  const userStore = useUserStore()

  const im = useChatContext()

  const jobStore = useJobStore()

  const initApp = async () => {
    try {
      await userStore.initData()

      if (userStore.token) {
        await userStore.getUserInfo()
        await jobStore.getJobOptions()
      }

      const contactUserId = userStore.role === 'boss' ? userStore.userInfo.contactIdToC : userStore.userInfo.contactIdToB

      contactUserId && await im.login({
        userId: contactUserId,
        userToken: userStore.userInfo.contactPassword,
        userAvatarURL: `${IMAGE_PREFIX}/stars.png`,
        usePassword: true,
        result: (res) => {
          // eslint-disable-next-line no-console
          console.log('im login', res)
        },
      })
    }
    catch (error: any) {
      if (error.response?.status === 401) {
        await AsyncStorage.setItem('token', '')
        Toast.fail('登录失效，请重新登录')
      }
    }
  }

  useEffect(() => {
    initApp()
  }, [userStore.role, userStore.token, userStore.userInfo.id])

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerBackTitleVisible: false, headerShadowVisible: false }}>
        {
          userStore.token
            ? (
              <>
                {
                  userStore.role === 'boss'
                    ? (
                      <Stack.Group>
                        <Stack.Screen name="Boss" component={BossTabLayout} options={{ headerShown: false }} />
                        <Stack.Screen name="ResumeDetail" component={ResumeDetail} options={{ headerShown: false }} />
                        <Stack.Screen name="PublishJob" component={PublishJob} options={{ title: '发布职位' }} />
                        <Stack.Screen name="SearchPage" component={SearchPage} options={{ headerShown: false }} />
                        <Stack.Screen name="DeliverList" component={DeliverList} options={{ headerShown: false }} />
                        <Stack.Screen name="RechargeIntegral" component={RechargeIntegral} options={{ title: '积分充值' }} />
                        <Stack.Screen name="IntegralList" component={IntegralList} options={{ title: '我的积分' }} />
                        <Stack.Screen name="ContactList" component={ContactList} options={{ headerShown: false }} />
                      </Stack.Group>
                      )
                    : (
                      <Stack.Group>
                        <Stack.Screen name="Genius" component={GeniusTabLayout} options={{ headerShown: false }} />
                        <Stack.Screen name="DeliverDetail" component={DeliverDetail} options={{ headerShown: false }} />
                        <Stack.Screen name="GeniusUpdateContact" component={GeniusUpdateContact} options={{ title: '联系信息' }} />
                        <Stack.Screen name="GeniusUpdateSummary" component={GeniusUpdateSummary} options={{ title: '个人总结' }} />
                        <Stack.Screen name="GeniusUpdateSalary" component={GeniusUpdateSalary} options={{ title: '期望薪资' }} />
                        <Stack.Screen name="GeniusUpdateExperience" component={GeniusUpdateExperience} options={{ title: '工作经历' }} />
                        <Stack.Screen name="GeniusUpdateEducation" component={GeniusUpdateEducation} options={{ title: '教育经历' }} />
                        <Stack.Screen name="GeniusUpdateProject" component={GeniusUpdateProject} options={{ title: '项目经历' }} />
                        <Stack.Screen name="GeniusUpdateVolunteer" component={GeniusUpdateVolunteer} options={{ title: '志愿活动经历' }} />
                        <Stack.Screen name="GeniusUpdateResume" component={GeniusUpdateResume} options={{ title: '附件简历' }} />
                        <Stack.Screen name="ResumePreview" component={ResumePreview} options={{ title: '预览简历' }} />
                      </Stack.Group>
                      )
                }
                <Stack.Group>
                  <Stack.Screen name="GeniusChatDetail" component={GeniusChatDetail} options={{ headerShown: false, title: '' }} />
                  <Stack.Screen name="Setting" component={Setting} options={{ title: '设置' }} />
                  <Stack.Screen name="UserChange" component={UserChange} options={{ title: '切换角色' }} />
                  <Stack.Screen name="GeniusUpdateProfile" component={GeniusUpdateProfile} options={{ title: '修改个人信息' }} />
                  <Stack.Screen name="CompanyAuth" component={CompanyAuth} options={{ title: '企业信息' }} />
                  <Stack.Screen name="CompanyInfo" component={CompanyInfo} options={{ headerShown: false }} />
                  <Stack.Screen name="JobDetail" component={JobDetail} options={{ headerShown: false, title: '' }} />
                </Stack.Group>
              </>
              )
            : (
              <Stack.Group>
                <Stack.Screen name="Guide" component={Guide} options={{ headerShown: false }} />
                <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="ForgetGuide" component={ForgetGuide} options={{ headerShown: false }} />
                <Stack.Screen name="ResetPassword" component={ResetPassword} options={{ headerShown: false }} />
              </Stack.Group>
              )
        }

      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RouteProvider
