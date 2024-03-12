import { Provider } from '@fruits-chain/react-native-xiaoshu'
import { DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import RouteProvider from '@/route'
import customTheme from '@/core/styleSheet/component'

function App() {
  return (
    <Provider theme={customTheme}>
      <ThemeProvider value={DefaultTheme}>
        <SafeAreaProvider>
          <RouteProvider></RouteProvider>
        </SafeAreaProvider>
      </ThemeProvider>
    </Provider>
  )
}

export default App
