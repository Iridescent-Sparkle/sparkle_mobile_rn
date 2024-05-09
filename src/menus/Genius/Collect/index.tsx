import { Empty } from '@fruits-chain/react-native-xiaoshu'
import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
import { FlatList, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import RecruitListHeader from '../Home/components/RecruitJobHeader'
import RecruitListCard from '../../../core/components/RecruitListCard'
import { create } from '@/core/styleSheet'
import { request } from '@/core/api'

export default function GeniusCollect() {
  const insets = useSafeAreaInsets()

  const [jobList, setJobList] = useState([] as JobDetail[])

  const getInitData = async () => {
    try {
      const { data: jobListData } = await request.get({}, {
        url: `genius/favorite/user`,
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
      <RecruitListHeader title="我的收藏" />
      {jobList.length ? <FlatList data={jobList} renderItem={job => <RecruitListCard data={job.item} handleCollectClick={getInitData} />} keyExtractor={job => String(job.jobCollectId)} /> : <View style={styles.empty}><Empty /></View>}
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
