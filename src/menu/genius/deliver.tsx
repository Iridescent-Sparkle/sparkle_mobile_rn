import React, { useEffect, useState } from 'react'
import { FlatList, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import RecruitListHeader from '../../components/recruit/recruit-list/recruit-job-header'
import RecruitJobCard from '../../components/recruit/recruit-list/recruit-job-card'
import RecruitSearchBar from '../../components/recruit/recruit-list/recruit-search-bar'
import { create } from '@/core/styleSheet'
import Skeleton from '@/page/genius/skeleton'
import { request } from '@/core/api'

export default function GeniusDeliver() {
  const insets = useSafeAreaInsets()
  const [jobList, setJobList] = useState([])

  const [loading, setLoading] = useState(true)

  const getInitData = async () => {
    try {
      setLoading(true)
      const { data: jobListData } = await request.get({}, {
        url: `/deliveries/user/${appStore.userInfo.id}}`,
      })
      setJobList(jobListData)
    }
    catch (error) {

    }
    finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getInitData()
  }, [])

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {
      loading
        ? <Skeleton />
        : (
          <>
            <RecruitListHeader title="我的投递" />
            <RecruitSearchBar />
            <FlatList style={styles.list} data={jobList} renderItem={job => <RecruitJobCard />} keyExtractor={job => job.id} />
          </>
          )
    }
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
