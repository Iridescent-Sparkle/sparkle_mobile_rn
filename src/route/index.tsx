import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useEffect } from 'react'
import GeniusTabLayout from '../menu/genius'
import BossTabLayout from '../menu/boss'
import * as RootNavigation from './rootNavigation'
import GeniusUpdateProfile from '@/page/genius/update-profile'
import Setting from '@/page/setting'
import { useAppStore } from '@/store'
import Guide from '@/page/auth/guide'
import Register from '@/page/auth/register'
import Login from '@/page/auth/login'
import ForgetGuide from '@/page/auth/forget-guide'

const Stack = createNativeStackNavigator()

function RouteProvider() {
  const appStore = useAppStore()

  return (
    <NavigationContainer ref={RootNavigation.navigationRef}>
      <Stack.Navigator screenOptions={{ headerBackTitleVisible: false, headerShadowVisible: false }}>
        {appStore.token
          ? (
            <Stack.Group>
              <Stack.Screen
                name="Genius"
                component={GeniusTabLayout}
                options={{ headerShown: false }}
              />
              <Stack.Screen name="Boss" component={BossTabLayout} />
              <Stack.Screen name="Setting" component={Setting} options={{ title: '设置' }} />
              <Stack.Screen name="GeniusUpdateProfile" component={GeniusUpdateProfile} options={{ title: '修改个人信息' }} />
            </Stack.Group>
            )
          : (
            <Stack.Group>
              <Stack.Screen name="Guide" component={Guide} options={{ title: '' }} />
              <Stack.Screen name="Register" component={Register} options={{ title: '' }} />
              <Stack.Screen name="Login" component={Login} options={{ title: '' }} />
              <Stack.Screen name="ForgetGuide" component={ForgetGuide} options={{ title: '' }} />
            </Stack.Group>
            )}

      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RouteProvider
