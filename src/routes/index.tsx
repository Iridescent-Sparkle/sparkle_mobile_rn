import { Notify, Toast } from '@fruits-chain/react-native-xiaoshu'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useEffect } from 'react'
import { useChatContext } from 'react-native-chat-uikit'
import SplashScreen from 'react-native-splash-screen'
import { useJobStore } from '@/store/job'
import { useUserStore } from '@/store/user'
import BossTabLayout from '@/menus/Boss'
import ResumeDetail from '@/pages/Boss/ResumeDetail'
import PublishJob from '@/pages/Boss/PublishJob'
import DeliverList from '@/pages/Boss/DeliverList'
import RechargeIntegral from '@/pages/Boss/RechargeIntegral'
import IntegralList from '@/pages/Boss/IntegralList'
import ContactList from '@/pages/Boss/ContactList'
import BossSearch from '@/pages/Boss/BossSearch'
import GeniusTabLayout from '@/menus/Genius'
import DeliverDetail from '@/pages/Genius/DeliverDetail'
import GeniusUpdateContact from '@/pages/Genius/UpdateContact'
import GeniusUpdateSummary from '@/pages/Genius/UpdateSummary'
import GeniusUpdateSalary from '@/pages/Genius/UpdateSalary'
import GeniusUpdateExperience from '@/pages/Genius/UpdateExperience'
import GeniusUpdateEducation from '@/pages/Genius/UpdateEducation'
import GeniusUpdateProject from '@/pages/Genius/UpdateProject'
import GeniusUpdateVolunteer from '@/pages/Genius/UpdateVolunteer'
import GeniusUpdateResume from '@/pages/Genius/UpdateResume'
import ResumePreview from '@/pages/Genius/ResumePreview'
import SearchResult from '@/pages/Genius/SearchResult'
import FilterOptions from '@/pages/Genius/FilterOptions'
import GeniusChatDetail from '@/pages/Genius/ChatDetail'
import Setting from '@/pages/Setting'
import UserChange from '@/pages/Auth/UserChange'
import GeniusUpdateProfile from '@/pages/Genius/UpdateProfile'
import CompanyAuth from '@/pages/Auth/CompanyAuth'
import CompanyInfo from '@/pages/Boss/CompanyInfo'
import BindEmail from '@/pages/Auth/BindEmail'
import ResetGuide from '@/pages/Auth/ResetGuide'
import JobDetail from '@/pages/Genius/JobDetail'
import VerifyCodeForm from '@/pages/Auth/VerifyCodeForm'
import Guide from '@/pages/Auth/Guide'
import Register from '@/pages/Auth/Register'
import Login from '@/pages/Auth/Login'
import ForgetGuide from '@/pages/Auth/ForgetGuide'
import ResetPassword from '@/pages/Auth/ResetPassword'

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
        userAvatarURL: userStore.userInfo.avatar,
        usePassword: true,
        result: () => {
          Notify({
            type: 'success',
            message: 'IM 聊天登录',
          })
        },
      })
    }
    catch (error: any) {
      if (error.response?.status === 401) {
        await AsyncStorage.setItem('token', '')
        Toast.fail('登录失效，请重新登录')
      }
    }
    finally {
      SplashScreen.hide()
    }
  }

  useEffect(() => {
    initApp()
  }, [userStore.role, userStore.token, userStore.userInfo.id])

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ animation: 'slide_from_right', headerBackTitleVisible: false, headerShadowVisible: false }}>
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
                        <Stack.Screen name="DeliverList" component={DeliverList} options={{ headerShown: false }} />
                        <Stack.Screen name="RechargeIntegral" component={RechargeIntegral} options={{ title: '积分充值' }} />
                        <Stack.Screen name="IntegralList" component={IntegralList} options={{ title: '我的积分' }} />
                        <Stack.Screen name="ContactList" component={ContactList} options={{ headerShown: false }} />
                        <Stack.Screen name="BossSearch" component={BossSearch} options={{ headerShown: false }} />
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
                        <Stack.Screen name="SearchResult" component={SearchResult} options={{ headerShown: false }} />
                        <Stack.Screen name="FilterOptions" component={FilterOptions} options={{ headerShown: false }} />
                      </Stack.Group>
                    )
                }
                <Stack.Group>
                  <Stack.Screen name="GeniusChatDetail" component={GeniusChatDetail} options={{ headerShown: false }} />
                  <Stack.Screen name="Setting" component={Setting} options={{ headerShown: false }} />
                  <Stack.Screen name="UserChange" component={UserChange} options={{ title: '切换角色' }} />
                  <Stack.Screen name="GeniusUpdateProfile" component={GeniusUpdateProfile} options={{ title: '修改个人信息' }} />
                  <Stack.Screen name="CompanyAuth" component={CompanyAuth} options={{ title: '企业信息' }} />
                  <Stack.Screen name="CompanyInfo" component={CompanyInfo} options={{ headerShown: false }} />
                  <Stack.Screen name="BindEmail" component={BindEmail} options={{ headerShown: false }} />
                  <Stack.Screen name="ResetGuide" component={ResetGuide} options={{ headerShown: false }} />
                  <Stack.Screen name="JobDetail" component={JobDetail} options={{ headerShown: false }} />
                  <Stack.Screen name="VerifyCodeForm" component={VerifyCodeForm} options={{ headerShown: false }} />
                </Stack.Group>
              </>
            )
            : (
              <Stack.Group>
                <Stack.Screen name="Guide" component={Guide} options={{ headerShown: false }} />
                <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="ForgetGuide" component={ForgetGuide} options={{ headerShown: false }} />
              </Stack.Group>
            )
        }
        <Stack.Group>
          <Stack.Screen name="ResetPassword" component={ResetPassword} options={{ headerShown: false }} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RouteProvider
