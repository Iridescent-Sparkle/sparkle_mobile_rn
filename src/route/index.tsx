import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useEffect } from 'react'
import { useChatContext } from 'react-native-chat-uikit'
import BossTabLayout from '../menu/boss'
import GeniusTabLayout from '../menu/genius'
import * as RootNavigation from './rootNavigation'
import ForgetGuide from '@/page/auth/forget-guide'
import Guide from '@/page/auth/guide'
import Login from '@/page/auth/login'
import Register from '@/page/auth/register'
import ResetPassword from '@/page/auth/reset-password'
import JobDetail from '@/page/genius/job-detail'
import GeniusUpdateProfile from '@/page/genius/update-profile'
import Setting from '@/page/setting'
import { useAppStore } from '@/store'
import GeniusChatDetail from '@/page/genius/chat-detail'
import ResumeDetail from '@/page/boss/resume-detail'
import PublishJob from '@/page/boss/publish-job'
import { IMAGE_PREFIX } from '@/core/constants'

const Stack = createNativeStackNavigator()

function RouteProvider() {
  const appStore = useAppStore()
  const im = useChatContext()

  useEffect(() => {
    appStore.userInfo.contactIdToB && im.login({
      userId: appStore.userInfo.contactIdToB,
      userToken: appStore.userInfo.contactPassword,
      userAvatarURL: `${IMAGE_PREFIX}/stars.png`,
      usePassword: true,
      result: (res) => {
        console.log('im login', res)
      },
    })
  }, [appStore.userInfo, im])

  return (
    <NavigationContainer ref={RootNavigation.navigationRef}>
      <Stack.Navigator screenOptions={{ headerBackTitleVisible: false, headerShadowVisible: false }}>
        {appStore.token
          ? (
            <Stack.Group>
              <Stack.Screen name="Genius" component={GeniusTabLayout} options={{ headerShown: false }} />
              <Stack.Screen name="Boss" component={BossTabLayout} options={{ headerShown: false }} />
              <Stack.Screen name="Setting" component={Setting} options={{ title: '设置' }} />
              <Stack.Screen name="GeniusUpdateProfile" component={GeniusUpdateProfile} options={{ title: '修改个人信息' }} />
              <Stack.Screen name="JobDetail" component={JobDetail} options={{ headerShown: false, title: '' }} />
              <Stack.Screen name="GeniusChatDetail" component={GeniusChatDetail} options={{ headerShown: false, title: '' }} />
              <Stack.Screen name="ResumeDetail" component={ResumeDetail} options={{ title: '在线简历' }} />
              <Stack.Screen name="PublishJob" component={PublishJob} options={{ title: '发布职位' }} />
            </Stack.Group>
            )
          : (
            <Stack.Group>
              <Stack.Screen name="Guide" component={Guide} options={{ title: '' }} />
              <Stack.Screen name="Register" component={Register} options={{ title: '' }} />
              <Stack.Screen name="Login" component={Login} options={{ title: '' }} />
              <Stack.Screen name="ForgetGuide" component={ForgetGuide} options={{ headerShown: false }} />
              <Stack.Screen name="ResetPassword" component={ResetPassword} options={{ title: '' }} />
            </Stack.Group>
            )}

      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RouteProvider
