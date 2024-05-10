import { Notify, Toast } from '@fruits-chain/react-native-xiaoshu'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Fragment, useEffect } from 'react'
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

      if (userStore.accessToken) {
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
        await AsyncStorage.setItem('accessToken', '')
        Toast.fail('登录失效，请重新登录')
      }
    }
    finally {
      SplashScreen.hide()
    }
  }

  useEffect(() => {
    initApp()
  }, [userStore.role, userStore.accessToken, userStore.userInfo.id])

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ animation: 'slide_from_right', headerShown: false, headerBackTitleVisible: false, headerShadowVisible: false }}>
        {
          userStore.accessToken
            ? (
              <Fragment>
                {
                  userStore.role === 'boss'
                    ? (
                      <Stack.Group>
                        <Stack.Screen name="Boss" component={BossTabLayout} />
                        <Stack.Screen name="ResumeDetail" component={ResumeDetail} />
                        <Stack.Screen name="PublishJob" component={PublishJob} />
                        <Stack.Screen name="DeliverList" component={DeliverList} />
                        <Stack.Screen name="RechargeIntegral" component={RechargeIntegral} />
                        <Stack.Screen name="IntegralList" component={IntegralList} />
                        <Stack.Screen name="ContactList" component={ContactList} />
                        <Stack.Screen name="BossSearch" component={BossSearch} />
                      </Stack.Group>
                    )
                    : (
                      <Stack.Group>
                        <Stack.Screen name="Genius" component={GeniusTabLayout} />
                        <Stack.Screen name="DeliverDetail" component={DeliverDetail} />
                        <Stack.Screen name="GeniusUpdateContact" component={GeniusUpdateContact} />
                        <Stack.Screen name="GeniusUpdateSummary" component={GeniusUpdateSummary} />
                        <Stack.Screen name="GeniusUpdateSalary" component={GeniusUpdateSalary} />
                        <Stack.Screen name="GeniusUpdateExperience" component={GeniusUpdateExperience} />
                        <Stack.Screen name="GeniusUpdateEducation" component={GeniusUpdateEducation} />
                        <Stack.Screen name="GeniusUpdateProject" component={GeniusUpdateProject} />
                        <Stack.Screen name="GeniusUpdateVolunteer" component={GeniusUpdateVolunteer} />
                        <Stack.Screen name="GeniusUpdateResume" component={GeniusUpdateResume} />

                        <Stack.Screen name="SearchResult" component={SearchResult} />
                        <Stack.Screen name="FilterOptions" component={FilterOptions} />
                      </Stack.Group>
                    )
                }
                <Stack.Group>
                  <Stack.Screen name="GeniusChatDetail" component={GeniusChatDetail} />
                  <Stack.Screen name="Setting" component={Setting} />
                  <Stack.Screen name="UserChange" component={UserChange} />
                  <Stack.Screen name="GeniusUpdateProfile" component={GeniusUpdateProfile} />
                  <Stack.Screen name="CompanyAuth" component={CompanyAuth} />
                  <Stack.Screen name="CompanyInfo" component={CompanyInfo} />
                  <Stack.Screen name="BindEmail" component={BindEmail} />
                  <Stack.Screen name="ResetGuide" component={ResetGuide} />
                  <Stack.Screen name="JobDetail" component={JobDetail} />
                  <Stack.Screen name="VerifyCodeForm" component={VerifyCodeForm} />
                  <Stack.Screen name="ResumePreview" component={ResumePreview} />
                </Stack.Group>
              </Fragment>
            )
            : (
              <Stack.Group>
                <Stack.Screen name="Guide" component={Guide} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="ForgetGuide" component={ForgetGuide} />
              </Stack.Group>
            )
        }
        <Stack.Group>
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RouteProvider
