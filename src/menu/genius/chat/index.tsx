import { StackActions, useNavigation } from '@react-navigation/native'
import React from 'react'
import { View } from 'react-native'
import { ConversationList } from 'react-native-chat-uikit'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { create } from '@/core/styleSheet'
import RecruitListHeader from '@/components/recruit/recruit-list/recruit-job-header'

export default function GeniusChat() {
  const insets = useSafeAreaInsets()
  const navigation = useNavigation()

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ConversationList
        customNavigationBar={<RecruitListHeader title="消息" />}
        containerStyle={{
          flexGrow: 1,
        }}

        onClickedItem={(data) => {
          // 跳转到会话详情页面
          if (data === undefined)
            return

          const convId = data?.convId
          const convType = data?.convType
          const convName = data?.convName
          navigation.dispatch(StackActions.push('GeniusChatDetail', {
            params: {
              convId,
              convType,
              convName: convName ?? convId,
            },
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
})
