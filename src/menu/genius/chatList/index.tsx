import { StackActions, useNavigation } from '@react-navigation/native'
import React from 'react'
import { View } from 'react-native'
import { ContactList } from 'react-native-chat-uikit'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { create } from '@/core/styleSheet'

export default function GeniusChatList() {
  const insets = useSafeAreaInsets()
  const navigation = useNavigation()

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ContactList
        contactType="contact-list"
        containerStyle={{
          flexGrow: 1,
        }}

        onClickedItem={(data) => {
          navigation.dispatch(StackActions.push('GeniusChatDetail', {
            params: { convId: data?.userId, convType: 0, convName: data?.userName },
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
