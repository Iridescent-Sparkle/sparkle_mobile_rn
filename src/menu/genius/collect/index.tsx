import React, { useCallback, useEffect, useState } from 'react'
import { FlatList, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useFocusEffect } from '@react-navigation/native'
import { Empty } from '@fruits-chain/react-native-xiaoshu'
import RecruitListHeader from '../../../components/recruit/recruit-list/recruit-job-header'
import RecruitListCard from '../../../components/recruit/recruit-list/recruit-list-card'
import RecruitSearchBar from '../../../components/recruit/recruit-list/recruit-search-bar'
import Skeleton from '@/page/genius/skeleton'
import { create } from '@/core/styleSheet'
import { request } from '@/core/api'

export default function GeniusCollect() {
  const insets = useSafeAreaInsets()

  const [jobList, setJobList] = useState([] as JobDetail[])

  const [loading, setLoading] = useState(true)

  const getInitData = async () => {
    try {
      setLoading(true)
      const { data: jobListData } = await request.get({}, {
        url: `genius/favorite/user`,
      })
      setJobList(jobListData)
    }
    catch (error) {

    }
    finally {
      setLoading(false)
    }
  }
  useFocusEffect(useCallback(() => {
    getInitData()
  }, []))
  useEffect(() => {
    getInitData()
  }, [])

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <>
        <RecruitListHeader title="收藏的工作" />
        <RecruitSearchBar />
        {jobList.length ? <FlatList style={styles.list} data={jobList} renderItem={job => <RecruitListCard data={job.item} handleCollectClick={getInitData} />} keyExtractor={job => String(job.jobCollectId)} /> : <View style={styles.empty}><Empty /></View>}
      </>
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
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})