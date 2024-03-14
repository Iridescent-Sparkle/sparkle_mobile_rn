import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import GeniusTabLayout from '../menu/genius'
import BossTabLayout from '../menu/boss'
import GeniusUpdateProfile from '@/page/genius/update-profile'
import Setting from '@/page/setting'

const Stack = createNativeStackNavigator()

function RouteProvider() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerBackTitleVisible: false, headerShadowVisible: false }}>
        <Stack.Screen
          name="Genius"
          component={GeniusTabLayout}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Boss" component={BossTabLayout} />
        <Stack.Screen name="GeniusUpdateProfile" component={GeniusUpdateProfile} options={{ title: '修改个人信息' }} />
        <Stack.Screen name="Setting" component={Setting} options={{ title: '设置' }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RouteProvider
