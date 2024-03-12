import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import GeniusTabLayout from '../menu/genius'
import BossTabLayout from '../menu/boss'

const Stack = createNativeStackNavigator()

function RouteProvider() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Genius"
          component={GeniusTabLayout}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Boss" component={BossTabLayout} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RouteProvider
