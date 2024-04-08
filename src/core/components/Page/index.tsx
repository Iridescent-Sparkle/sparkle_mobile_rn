import type { NavBarProps } from '@fruits-chain/react-native-xiaoshu'
import { NavBar } from '@fruits-chain/react-native-xiaoshu'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import type { ScrollViewProps } from 'react-native'
import { ScrollView, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { create } from '@/core/styleSheet'

interface Props {
  title?: string
  navBarProps?: NavBarProps
  scrollViewProps?: ScrollViewProps
  children?: React.ReactNode
}
function Page(props: Props) {
  const { title, navBarProps, scrollViewProps, children } = props
  const navigation = useNavigation()

  const insets = useSafeAreaInsets()

  return (
    <View style={[styles.container, { padding: insets.top, bottom: insets.bottom || 12 }]}>
      <NavBar
        title={title}
        onPressBackArrow={navigation.goBack}
        {...navBarProps}
      />
      <ScrollView style={styles.content} {...scrollViewProps}>
        {children}
      </ScrollView>
    </View>
  )
}

const styles = create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    paddingHorizontal: 48,
  },
})
export default Page
