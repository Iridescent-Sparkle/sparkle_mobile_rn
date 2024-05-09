import { Empty } from '@fruits-chain/react-native-xiaoshu'
import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
import { FlatList, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import RecruitListHeader from '../Home/components/RecruitJobHeader'
import { create } from '@/core/styleSheet'
import { request } from '@/core/api'
import RecruitJobCard from '@/core/components/RecruitJobCard'

export default function GeniusDeliver() {
  const insets = useSafeAreaInsets()
  const [jobList, setJobList] = useState([] as JobDetail[])

  const getInitData = async () => {
    try {
      const { data: jobListData } = await request.get({}, {
        url: `/genius/deliveries/user`,
      })
      setJobList(jobListData)
    }
    catch (error) {

    }
  }

  useFocusEffect(useCallback(() => {
    getInitData()
  }, []))
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <RecruitListHeader title="我的投递" />
      {jobList.length
        ? <FlatList data={jobList} renderItem={job => <RecruitJobCard type="deliver" data={job.item} />} keyExtractor={job => String(job.jobDeliverId)} />
        : <View style={styles.empty}><Empty /></View>}
    </View>
  )
}

const styles = create({
  container: {
    flex: 1,
    paddingHorizontal: 44,
    backgroundColor: '#FFF',
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
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
