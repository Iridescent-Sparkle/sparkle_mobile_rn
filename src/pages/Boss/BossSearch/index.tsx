import { request } from '@/core/api'
import Page from '@/core/components/Page'
import { IMAGE_PREFIX } from '@/core/constants'
import { useRefState } from '@/core/hooks/useRefState'
import { create, pxToDp } from '@/core/styleSheet'
import { themeColor } from '@/core/styleSheet/themeColor'
import { Loading, Search, Space, Toast } from '@fruits-chain/react-native-xiaoshu'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRoute } from '@react-navigation/native'
import { useCallback, useEffect, useRef, useState } from 'react'
import { FlatList, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import TabList from './components/TabList'
import ResumeListCard from '@/core/components/ResumeCard'

const useSearchHistory = () => {
  const [searchHistory, setSearchHistory] = useState<string[]>([])

  const searchHistoryRef = useRef<string[]>([])

  const getSearchHistoryFromStorage = async () => {
    const data = await AsyncStorage.getItem('bossSearchHistory')
    return JSON.parse(data || '[]')
  }

  const setSearchHistoryToStorage = useCallback(async (keyword: string) => {

    searchHistoryRef.current = [keyword, ...searchHistoryRef.current]

    AsyncStorage.setItem('bossSearchHistory', JSON.stringify(searchHistoryRef.current))

    setSearchHistory(searchHistoryRef.current)
  }, [])

  useEffect(() => {
    getSearchHistoryFromStorage().then(data => {
      setSearchHistory(data)
      searchHistoryRef.current = data
    })
  }, [])

  return [
    searchHistory,
    setSearchHistoryToStorage
  ] as const
}

export default function BossSearch() {
  const [searchHistory, setSearchHistory] = useSearchHistory()

  const route = useRoute<{ key: any, name: any, params: { keyword: string, filter: any } }>()

  const [jobList, setJobList] = useState([] as any)

  const [loading, setLoading, getLoading] = useRefState(true)

  const [isLoadEnd, setIsLoadEnd, getIsLoaded] = useRefState(true)

  const currentPage = useRef(1)


  const keywordRef = useRef<string | null>()

  const onSearch = async (keyword: string) => {
    if (getLoading()) {
      return
    }

    try {
      if (!keyword?.trim()) {
        setJobList([])
        currentPage.current = 1
        return
      }

      setLoading(true)
      keywordRef.current = keyword
      setSearchHistory(keyword)
      currentPage.current = 1

      const { data: { data: jobListData, total } } = await request.post({
        current: currentPage.current,
        pageSize: 10,
        occupation: keyword,
      }, { url: '/genius/profile/all' })

      if (currentPage.current * 10 >= total) {
        setIsLoadEnd(true)
      } else {
        setIsLoadEnd(false)
      }

      currentPage.current += 1

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

  const onReachBottom = async () => {
    if (getLoading() || getIsLoaded()) {
      return
    }

    try {
      setLoading(true)

      const { data: { data: jobListData, total } } = await request.post({
        current: currentPage.current,
        pageSize: 10,
        occupation: keywordRef.current,
      }, { url: '/genius/profile/all' })

      setJobList(jobListData)
      if (currentPage.current * 10 >= total) {
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
    onSearch(route.params.keyword || keywordRef.current || '')
  }, [])

  const ListFooterComponent = () => {
    if (isLoadEnd) {
      return <Text style={{ textAlign: 'center' }}>没有更多了</Text>
    }
    if (loading) {
      return <View style={{ height: pxToDp(100) }}>
        <Loading vertical>加载中...</Loading>
      </View>
    }
    return null
  }

  return (
    <Page title="搜索">
      <Search style={styles.search} showSearchButton={true} />
      <TabList title="搜索历史" data={searchHistory} />
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
