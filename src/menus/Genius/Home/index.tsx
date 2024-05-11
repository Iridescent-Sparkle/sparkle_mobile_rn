import { request } from '@/core/api'
import { useRefState } from '@/core/hooks/useRefState'
import { create, pxToDp } from '@/core/styleSheet'
import { themeColor } from '@/core/styleSheet/themeColor'
import { useJobStore } from '@/store/job'
import { Empty, Loading, Tabs, Toast } from '@fruits-chain/react-native-xiaoshu'
import { StackActions, useNavigation } from '@react-navigation/native'
import { useEffect, useRef, useState } from 'react'
import { FlatList, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import RecruitListCard from '../../../core/components/RecruitListCard'
import RecruitSearchBar from '../../../core/components/SearchBar'
import UserCard from './components/RecruitUserCard'

const pageSize = 5

export default function GeniusHome() {
  const insets = useSafeAreaInsets()

  const navigation = useNavigation()

  const jobStore = useJobStore()

  const [jobList, setJobList] = useState([] as any)

  const [refreshing, setRefreshing] = useState(false)

  const [activeTab, setActiveTab] = useState('1')

  const [loading, setLoading, getLoading] = useRefState(false)

  const [isLoadEnd, setIsLoadEnd, getIsLoaded] = useRefState(false)

  const currentPage = useRef(1)

  const getInitData = async () => {
    try {
      setLoading(true)

      const { data: { data: jobListData, total } } = await request.post({
        categoryId: 1,
        pageSize,
        current: 1,
      }, { url: '/boss/category/job' })

      setJobList(jobListData)

      if (pageSize >= total) {
        setIsLoadEnd(true)
        return
      }

      setIsLoadEnd(false)
      currentPage.current = 2
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

    try {
      setLoading(true)
      setRefreshing(true)
      const { data: { data: jobListData, total } } = await request.post({
        categoryId: tab,
        pageSize,
        current: currentPage.current,
      }, {
        url: '/boss/category/job',
      })
      setJobList(jobListData)

      if (pageSize >= total) {
        setIsLoadEnd(true)

      } else {
        setIsLoadEnd(false)
        currentPage.current = 2
      }
    }
    catch (error) {
      Toast.fail({
        message: '网络错误',
        duration: 500,
      })
    }
    finally {
      setRefreshing(false)
      setLoading(false)
    }
  }

  const onReachBottom = async (tab: string) => {
    try {
      if (getLoading() || getIsLoaded()) {
        return
      }
      const { data: { data: jobListData, total } } = await request.post({
        categoryId: tab,
        pageSize,
        current: currentPage.current,
      }, {
        url: '/boss/category/job',
      })

      setJobList([...jobList, ...jobListData])

      if (currentPage.current * pageSize >= total) {
        setIsLoadEnd(true)
        return
      }
      setIsLoadEnd(false)
      currentPage.current += 1
    }
    catch (error) {
      Toast.fail({
        message: '网络错误',
        duration: 500,
      })
    }
  }

  const ListFooterComponent = () => {
    if (isLoadEnd)
      return <Text style={{ textAlign: 'center', color: themeColor.black65 }}>没有更多了</Text>

    if (loading) {
      return (
        <View style={{ height: pxToDp(100), marginBottom: pxToDp(20) }}>
          <Loading vertical size={pxToDp(40)}>加载中...</Loading>
        </View>
      )
    }
    return null
  }
  useEffect(() => {
    getInitData()
  }, [])

  const onSearch = (value: string) => {
    navigation.dispatch(StackActions.push('SearchResult', {
      keyword: value,
    }))
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <UserCard />
      <RecruitSearchBar onSearch={onSearch} />
      <Tabs activeKey={activeTab} indicatorHeight={0} tabBarStyle={styles.tabBar} tabAlign="left" indicatorColor={themeColor.primary} indicatorWidth={pxToDp(64)} activeTextColor={themeColor.primary} onChange={onTabChange}>
        {
          jobStore.jobCategoryOptions.map(category => (
            <Tabs.TabPane key={String(category?.value)} tab={category?.label}>
              <FlatList
                data={jobList}
                onEndReachedThreshold={0.2}
                onEndReached={() => onReachBottom(String(category?.value))}
                refreshing={refreshing}
                onRefresh={() => onTabChange(String(category?.value))}
                ListFooterComponent={ListFooterComponent}
                renderItem={jobDetail => <RecruitListCard data={jobDetail.item} />}
                keyExtractor={jobDetail => String(jobDetail.id)}
                ListEmptyComponent={<View style={styles.empty}><Empty /></View>}
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
  empty: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
