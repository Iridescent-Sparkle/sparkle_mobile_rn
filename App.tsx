import { Provider } from '@fruits-chain/react-native-xiaoshu'
import { DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { Container } from 'react-native-chat-uikit'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import RouteProvider from '@/route'
import customTheme from '@/core/styleSheet/component'

function App() {
  return (
    <Provider theme={customTheme}>
      <ThemeProvider value={DefaultTheme}>
        <SafeAreaProvider>
          <Container options={{ appKey: '1109240309169711#demo' }}>
            <RouteProvider></RouteProvider>
          </Container>
        </SafeAreaProvider>
      </ThemeProvider>
    </Provider>
  )
}

export default App
