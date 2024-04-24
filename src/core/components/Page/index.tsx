import type { NavBarProps } from '@fruits-chain/react-native-xiaoshu'
import { NavBar } from '@fruits-chain/react-native-xiaoshu'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import type { ScrollViewProps, ViewProps } from 'react-native'
import { ScrollView, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { create } from '@/core/styleSheet'

interface Props {
  title?: string
  navBarProps?: NavBarProps
  scrollViewProps?: ScrollViewProps
  viewProps?: ViewProps
  children?: React.ReactNode
  isScrollView?: boolean
  conntentStyle?: ViewProps['style']
  navigationBack?: () => void
}
function Page(props: Props) {
  const { title, navBarProps, scrollViewProps, children, isScrollView = true, conntentStyle = {}, viewProps, navigationBack } = props

  const navigation = useNavigation()

  const insets = useSafeAreaInsets()

  const handleNavigationBack = () => {
    navigationBack ? navigationBack() : navigation.goBack()
  }

  return (
    <View style={[styles.container, { padding: insets.top, bottom: insets.bottom || 12 }]}>
      <NavBar
        title={title}
        onPressBackArrow={handleNavigationBack}
        {...navBarProps}
      />
      {
        isScrollView
          ? (
            <ScrollView style={[styles.content, conntentStyle]} {...scrollViewProps}>
              {children}
            </ScrollView>
            )
          : (
            <View style={[styles.content, conntentStyle]} {...viewProps}>
              {children}
            </View>
            )
}

    </View>
  )
}

const styles = create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 48,
  },
})
export default Page
