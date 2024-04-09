import { Loading, Tabs, Toast } from '@fruits-chain/react-native-xiaoshu'
import { useEffect, useRef, useState } from 'react'
import { FlatList, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import RecruitSearchBar from './components/recruit-search-bar'
import UserCard from './components/recruit-user-card'
import RecruitListCard from './components/recruit-list-card'
import { themeColor } from '@/core/styleSheet/themeColor'
import { create, pxToDp } from '@/core/styleSheet'
import { request } from '@/core/api'
import { useJobStore } from '@/store/job'

export default function GeniusHome() {
  const insets = useSafeAreaInsets()

  const jobStore = useJobStore()

  const [jobList, setJobList] = useState([] as any)

  const [loading, setLoading] = useState(true)

  const [refreshing, setRefreshing] = useState(false)

  const [activeTab, setActiveTab] = useState('1')

  const currentPage = useRef(1)
  const total = useRef(0)
  const getInitData = async () => {
    try {
      setLoading(true)

      const { data: { data: jobListData, total } } = await request.post({
        categoryId: 1,
        pageSize: 4,
      }, { url: '/boss/category/job' })
      total.current = total
      setJobList(jobListData)
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
    setActiveTab(tab)
    currentPage.current = 1
    total.current = 0
    try {
      setLoading(true)

      const { data: { data: jobListData, total } } = await request.post({
        categoryId: tab,
        pageSize: 4,
        page: currentPage.current,
      }, {
        url: '/boss/category/job',
      })
      total.current = total

      setJobList(jobListData)
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
  const onPageChange = async (tab: string) => {
    try {
      currentPage.current += 1
      if (currentPage.current * 3 < total.current) {
        const { data: { data: jobListData, total } } = await request.post({
          categoryId: tab,
          pageSize: currentPage.current,
          page: currentPage.current,
        }, {
          url: '/boss/category/job',
        })
        total.current = total
        setJobList([...jobList, ...jobListData])
      }
    }
    catch (error) {
      Toast.fail({
        message: '网络错误',
        duration: 500,
      })
    }
  }

  const handleTabChange = (tab: string) => {
    onTabChange && onTabChange(tab)
  }
  useEffect(() => {
    getInitData()
  }, [])

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <UserCard />
      <RecruitSearchBar />
      <Tabs activeKey={activeTab} indicatorHeight={0} tabBarStyle={styles.tabBar} tabAlign="left" indicatorColor={themeColor.primary} indicatorWidth={pxToDp(64)} activeTextColor={themeColor.primary} onChange={handleTabChange}>
        {
           jobStore.jobCategoryOptions.map(category => (
             <Tabs.TabPane key={String(category?.value)} tab={category?.label}>
               <FlatList
                 data={jobList}
                 onEndReachedThreshold={0.2}
                 onEndReached={() => onPageChange(String(category?.value))}
                 refreshing={refreshing}
                 onRefresh={() => setRefreshing(true)}
                 ListFooterComponent={() => {
                   return loading ? <View style={styles.loading}><Loading size={pxToDp(56)} /></View> : null
                 }}
                 renderItem={jobDetail => <RecruitListCard data={jobDetail.item} />}
                 keyExtractor={jobDetail => String(jobDetail.id)}
               />
             </Tabs.TabPane>
           ))
        }
      </Tabs>

    </View>
  )
}

const styles = create({
  container: {
    flex: 1,
    paddingHorizontal: 44,
    backgroundColor: '#FFF',
  },
  spinner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBar: {
    height: 114,
    padding: 0,
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
  },
})
