import React from 'react'
import { FlatList, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import RecruitListHeader from '../../components/recruit/recruit-list/recruit-job-header'
import RecruitJobCard from '../../components/recruit/recruit-list/recruit-job-card'
import { create } from '@/core/styleSheet'

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
]

export default function GeniusMember() {
  const insets = useSafeAreaInsets()

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <RecruitListHeader title="个人信息" />

      <FlatList style={styles.list} data={DATA} renderItem={() => <RecruitJobCard />} keyExtractor={item => item.id} />
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
