import { Provider } from '@fruits-chain/react-native-xiaoshu'
import { DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { useCallback, useEffect } from 'react'
import type { DataModel, DataModelType, UIKitError } from 'react-native-chat-uikit'
import { Container, useLightTheme, usePresetPalette } from 'react-native-chat-uikit'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useUserStore } from '@/store/user'
import RouteProvider from '@/route'
import customTheme from '@/core/styleSheet/component'
import { IMAGE_PREFIX } from '@/core/constants'
import { useJobStore } from '@/store/job'

function App() {
  const userStore = useUserStore()
  const jobStore = useJobStore()

  useEffect(() => {
    userStore.getUserInfo()
    jobStore.getJobOptions()
  }, [])

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
      params.ids.get('user')
      const res: any = await new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            {
              id: 'sparkle',
              type: 'chat',
              name: 'test',
              avatar: `${IMAGE_PREFIX}/stars.png`,
            },
            {
              id: 'iridescent',
              type: 'chat',
              name: 'test',
              avatar: `${IMAGE_PREFIX}/stars.png`,
            },
          ])
        }, 1000)
      })
      // const finalUsers = userIds?.map<DataModel>((id) => {
      //   return list.current.get(id) as DataModel
      // })

      params?.result(
        new Map([
          ['user', res ?? []],
        ]),
      )
    },
    [],
  )

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
