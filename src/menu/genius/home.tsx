import { Toast } from '@fruits-chain/react-native-xiaoshu'
import { useEffect, useState } from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import RecentJobList from '../../components/recruit/recruit-list/recent-job-list'
import RecruitSearchBar from '../../components/recruit/recruit-list/recruit-search-bar'
import UserCard from '../../components/recruit/recruit-list/recruit-user-card'
import Skeleton from '@/page/genius/skeleton'
import { create } from '@/core/styleSheet'
import { request } from '@/core/api'

export default function GeniusHome() {
  const insets = useSafeAreaInsets()

  const [jobList, setJobList] = useState([])

  const [loading, setLoading] = useState(true)

  const getInitData = async () => {
    try {
      setLoading(true)

      const jobListData = await request.get({}, { url: `boss/category/job/1` })

      setJobList(jobListData.data)
    }
    catch (error) {
      Toast.fail({
        message: '网络错误',
        duration: 500,
      })
    }
    finally {
      setLoading(false)
    }
  }

  const onTabChange = async (tab: string) => {
    try {
      const { data: jobListData } = await request.get({}, {
        url: `/category/job/${tab}`,
      })

      setJobList(jobListData)
    }
    catch (error) {
      Toast.fail({
        message: '网络错误',
        duration: 500,
      })
    }
  }

  useEffect(() => {
    getInitData()
  }, [])

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      {
        loading
          ? <Skeleton />
          : (
            <>
              <UserCard />
              <RecruitSearchBar />
              <RecentJobList jobList={jobList} onTabChange={onTabChange} />
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
})
