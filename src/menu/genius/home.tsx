import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useEffect, useState } from 'react'
import { Toast } from '@fruits-chain/react-native-xiaoshu'
import RecentJobList from '../../components/recruit/recruit-list/recent-job-list'
import UserCard from '../../components/recruit/recruit-list/recruit-user-card'
import RecruitSearchBar from '../../components/recruit/recruit-list/recruit-search-bar'
import { useAppStore } from '../../store/index'
import { create } from '@/core/styleSheet'
import { request } from '@/core/api'
import Skeleton from '@/page/genius/skeleton'

export default function GeniusHome() {
  const insets = useSafeAreaInsets()

  const appStore = useAppStore()

  const [jobList, setJobList] = useState([])

  const [loading, setLoading] = useState(true)

  const [categoryList, setCategoryList] = useState([])

  const getInitData = async () => {
    try {
      setLoading(true)
      const [{ data: categoryListData }, { data: jobListData }] = await Promise.all([
        request.get({}, { url: '/job/category' }),
        request.get({}, { url: `/category/job/0` }),
      ])

      setCategoryList(categoryListData)
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

  const onTabChange = async (tab: number) => {
    try {
      const { data: jobListData } = await request.get({}, {
        url: `/category/job/${tab}`,
      })

      setJobList(jobListData)
    }
    catch (error) {

    }
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      {
        loading
          ? <Skeleton />
          : (
            <>
              <UserCard />
              <RecruitSearchBar />
              <RecentJobList categoryList={categoryList} jobList={jobList} onTabChange={onTabChange} />
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
