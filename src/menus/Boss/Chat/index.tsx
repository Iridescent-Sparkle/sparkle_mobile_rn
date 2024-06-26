import { StackActions, useNavigation } from '@react-navigation/native'
import React from 'react'
import { View } from 'react-native'
import { ConversationList } from 'react-native-chat-uikit'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import PageHeader from '../Manage/components/PageHeader'
import { create } from '@/core/styleSheet'

export default function BossChat() {
  const insets = useSafeAreaInsets()
  const navigation = useNavigation()

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ConversationList
        customNavigationBar={(
          <View style={styles.header}>
            <PageHeader title="消息" />
          </View>
        )}
        containerStyle={{
          flexGrow: 1,
          backgroundColor: '#FFF',
        }}
        customSearch={<></>}
        onClickedItem={(data) => {
          if (!data)
            return
          navigation.dispatch(StackActions.push('GeniusChatDetail', {
            convId: data.convId,
            convType: data.convType,
            convName: '',
          }))
        }}

      />
    </View>
  )
}

const styles = create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    paddingHorizontal: 44,
  },
})
