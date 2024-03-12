import React from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import RecruitListHeader from '../../components/recruit/recruit-list/recruit-job-header'
import { create } from '@/core/styleSheet'

export default function GeniusChat() {
  const insets = useSafeAreaInsets()

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <RecruitListHeader title="消息" />

    </View>
  )
}

const styles = create({
  container: {
    flex: 1,
    paddingHorizontal: 44,
    backgroundColor: '#FFF',
  },
  list: {
    marginTop: 40,
  },
  popupHeader: {
    height: 180,
  },
  popupHeaderText: {
    fontSize: 36,
  },
  popupWrapper: {
    paddingHorizontal: 40,
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  popupButton: {
    width: 320,
    borderRadius: 40,
  },
})
