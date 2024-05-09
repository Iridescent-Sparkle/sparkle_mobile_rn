import { Provider } from '@fruits-chain/react-native-xiaoshu'
import { DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { useCallback, useEffect } from 'react'
import { StatusBar } from 'react-native'
import { ChatClient } from 'react-native-chat-sdk'
import type { DataModel, DataModelType, UIKitError } from 'react-native-chat-uikit'
import { Container, useLightTheme, usePresetPalette } from 'react-native-chat-uikit'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import RouteProvider from '@/routes'
import customTheme from '@/core/styleSheet/component'

function App() {
  const palette = usePresetPalette()
  const light = useLightTheme(palette)

  const onRequestMultiData = useCallback(
    async (params: {
      ids: Map<DataModelType, string[]>
      result: (
        data?: Map<DataModelType, DataModel[]>,
        error?: UIKitError
      ) => void
    }) => {
      const userIds = params.ids.get('user') || []

      const res = await ChatClient.getInstance()
        .userManager.fetchUserInfoById(userIds)

      const users = [] as DataModel[]

      res.forEach((item) => {
        users.push(
          {
            id: item.userId,
            type: 'user',
            name: item.nickName,
            avatar: item.avatarUrl,
          },
        )
      })

      params?.result(
        new Map([
          ['user', users ?? []],
        ]),
      )
    },
    [],
  )

  useEffect(() => {
    StatusBar.setBackgroundColor('white')
    StatusBar.setBarStyle('dark-content')
  }, [])

  return (
    <Provider theme={customTheme}>
      <ThemeProvider value={DefaultTheme}>
        <SafeAreaProvider>
          <Container options={{ appKey: '1109240309169711#sparkle', autoLogin: false }} onRequestMultiData={onRequestMultiData} palette={palette} theme={light} language="zh-Hans">
            <RouteProvider></RouteProvider>
          </Container>
        </SafeAreaProvider>
      </ThemeProvider>
    </Provider>
  )
}

export default App
