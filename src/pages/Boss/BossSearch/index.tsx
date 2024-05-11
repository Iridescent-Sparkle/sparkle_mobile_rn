import { request } from '@/core/api'
import Page from '@/core/components/Page'
import ResumeListCard from '@/core/components/ResumeCard'
import SearchBar from '@/core/components/SearchBar'
import { IMAGE_PREFIX } from '@/core/constants'
import { useRefState } from '@/core/hooks/useRefState'
import { create, pxToDp } from '@/core/styleSheet'
import { themeColor } from '@/core/styleSheet/themeColor'
import { useUserStore } from '@/store/user'
import { Loading, Space, Toast } from '@fruits-chain/react-native-xiaoshu'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRoute } from '@react-navigation/native'
import { useCallback, useEffect, useRef, useState } from 'react'
import { FlatList, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import TabList from './components/TabList'

const pageSize = 5

export const useSearchHistory = () => {
  const [searchHistory, setSearchHistory] = useState<string[]>([])

  const route = useRoute<{ key: any, name: any, params: { keyword: string } }>()

  const getSearchHistoryFromStorage = async () => {
    const data = await AsyncStorage.getItem(`bossSearchHistory_${useUserStore.getState().userInfo.id}`)
    return JSON.parse(data || '[]')
  }

  const setSearchHistoryToStorage = useCallback(async (keyword: string) => {
    const searchHistory = await getSearchHistoryFromStorage()

    const index = searchHistory.findIndex((item: string) => item === keyword)

    if (index !== -1) {
      searchHistory.splice(index, 1)
    }

    const newHistory = [keyword, ...searchHistory].slice(0, 3)

    await AsyncStorage.setItem(`bossSearchHistory_${useUserStore.getState().userInfo.id}`, JSON.stringify(newHistory))

    setSearchHistory(newHistory)
  }, [])

  const clearSearchHistory = useCallback(async () => {
    setSearchHistory([])

    await AsyncStorage.setItem(`bossSearchHistory_${useUserStore.getState().userInfo.id}`, JSON.stringify([]))
  }, [])

  useEffect(() => {
    getSearchHistoryFromStorage().then(data => {
      setSearchHistory(data)
    })
  }, [route.params.keyword])

  return [
    searchHistory,
    setSearchHistoryToStorage,
    clearSearchHistory
  ] as const
}

export default function BossSearch() {
  const [searchHistory, setSearchHistory, clearSearchHistory] = useSearchHistory()

  const route = useRoute<{ key: any, name: any, params: { keyword: string } }>()

  const [jobList, setJobList] = useState([] as any)

  const [loading, setLoading, getLoading] = useRefState(false)

  const [isLoadEnd, setIsLoadEnd, getIsLoaded] = useRefState(false)

  const currentPage = useRef(1)

  const keywordRef = useRef<string | null>()

  const searchRef = useRef<{ setValue: (value: string) => void }>(null)

  const onSearch = async (keyword: string) => {
    if (getLoading()) {
      return
    }

    try {
      searchRef.current?.setValue(keyword)
      keywordRef.current = keyword

      if (!keyword?.trim()) {
        setJobList([])
        currentPage.current = 1

        return
      }

      setLoading(true)
      setSearchHistory(keyword)
      currentPage.current = 1

      const { data: { data: jobListData, total } } = await request.post({
        current: currentPage.current,
        pageSize,
        keyword: keyword,
      }, { url: '/genius/profile/search' })

      setJobList(jobListData)

      if (currentPage.current * pageSize >= total) {
        setIsLoadEnd(true)
        return
      } else {
        setIsLoadEnd(false)
      }

      currentPage.current += 1
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

  const onReachBottom = async () => {
    if (getLoading() || getIsLoaded()) {
      return
    }

    try {
      setLoading(true)

      const { data: { data: jobListData, total } } = await request.post({
        current: currentPage.current,
        pageSize,
        keyword: keywordRef.current,
      }, { url: '/genius/profile/search' })

      setJobList([...jobList,...jobListData])
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
    finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    onSearch(route.params.keyword)
  }, [route.params.keyword])

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

  return (
    <Page title="搜索" isScrollView={false} conntentStyle={{ paddingTop: pxToDp(20) }}>
      <SearchBar onSearch={onSearch} ref={searchRef} />
      <TabList title="搜索历史" data={searchHistory} onClearSearchHistory={clearSearchHistory} onClickItem={onSearch} />
      <View style={styles.list}>
        {
          jobList.length
            ? <FlatList data={jobList} renderItem={job => <ResumeListCard data={job.item} from="home" />} keyExtractor={item => item.id} onEndReached={onReachBottom} ListFooterComponent={ListFooterComponent()} />
            : (
              <Space>
                <FastImage
                  style={styles.banner}
                  source={
                    {
                      uri: `${IMAGE_PREFIX}/not_found.png`,
                    }
                  }
                />
                <Text style={styles.tip}>对不起，您输入的关键字未找到匹配的结果，请重新检查或搜索另一个关键字。</Text>
              </Space>
            )
        }
      </View>
    </Page>
  )
}
const styles = create({
  search: {
    width: '100%',
    height: 96,
    borderRadius: 24,
    paddingRight: 16,
    marginTop: 24,
  },
  list: {
    flex: 1,
    paddingHorizontal: 4,
  },
  banner: {
    height: 540,
  },
  tip: {
    textAlign: 'center',
    fontSize: 32,
    color: themeColor.black65,
  },
})
