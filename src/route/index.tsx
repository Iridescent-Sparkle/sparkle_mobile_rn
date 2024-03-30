import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useEffect } from 'react'
import { useChatContext } from 'react-native-chat-uikit'
import BossTabLayout from '../menu/boss'
import GeniusTabLayout from '../menu/genius'
import { IMAGE_PREFIX } from '@/core/constants'
import ForgetGuide from '@/page/auth/forget-guide'
import Guide from '@/page/auth/guide'
import Login from '@/page/auth/login'
import Register from '@/page/auth/register'
import ResetPassword from '@/page/auth/reset-password'
import PublishJob from '@/page/boss/publish-job'
import ResumeDetail from '@/page/boss/resume-detail'
import GeniusChatDetail from '@/page/genius/chat-detail'
import JobDetail from '@/page/genius/job-detail'
import GeniusUpdateProfile from '@/page/genius/update-profile'
import Setting from '@/page/setting'
import { useUserStore } from '@/store/user'
import DeliverDetail from '@/page/genius/deliver-detail'

const Stack = createNativeStackNavigator()

function RouteProvider() {
  const userStore = useUserStore()
  const im = useChatContext()

  useEffect(() => {
    userStore.userInfo.contactIdToB && im.login({
      userId: userStore.userInfo.contactIdToB,
      userToken: userStore.userInfo.contactPassword,
      userAvatarURL: `${IMAGE_PREFIX}/stars.png`,
      usePassword: true,
      result: (res) => {
        // eslint-disable-next-line no-console
        console.log('im login', res)
      },
    })
  }, [userStore.userInfo, im])

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerBackTitleVisible: false, headerShadowVisible: false }}>
        {userStore.token
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
              <Stack.Screen name="DeliverDetail" component={DeliverDetail} options={{ headerShown: false }} />

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
