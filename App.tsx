import { Provider } from '@fruits-chain/react-native-xiaoshu'
import { DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { Container, useLightTheme, usePresetPalette } from 'react-native-chat-uikit'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useEffect } from 'react'
import RouteProvider from '@/route'
import customTheme from '@/core/styleSheet/component'
import { useAppStore } from '@/store'

function App() {
  const appStore = useAppStore()

  useEffect(() => {
    appStore.initData()
  }, [])
  const palette = usePresetPalette()
  const light = useLightTheme(palette)

  return (
    <Provider theme={customTheme}>
      <ThemeProvider value={DefaultTheme}>
        <SafeAreaProvider>
          <Container options={{ appKey: '1109240309169711#demo' }} palette={palette} theme={light} language="zh-Hans">
            <RouteProvider></RouteProvider>
          </Container>
        </SafeAreaProvider>
      </ThemeProvider>
    </Provider>
  )
}

export default App
