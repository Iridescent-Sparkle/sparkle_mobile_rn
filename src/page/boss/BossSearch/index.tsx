import { request } from '@/core/api'
import Page from '@/core/components/Page'
import { create } from '@/core/styleSheet'
import TabList from '@/page/boss/BossSearch/components/TabList'
import { Search, Space, Toast } from '@fruits-chain/react-native-xiaoshu'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useCallback, useEffect, useRef, useState } from 'react'
import { FlatList, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'

const useSearchHistory = () => {
  const [searchHistory, setSearchHistory] = useState<string[]>([])

  const searchHistoryRef = useRef<string[]>([])

  const getSearchHistoryFromStorage = async () => {
    const data = await AsyncStorage.getItem('bossSearchHistory')
    return JSON.parse(data || '[]')
  }

  const setSearchHistoryToStorage = useCallback(() => {
    async (keyword: string) => {

      searchHistoryRef.current = [keyword, ...searchHistoryRef.current]

      AsyncStorage.setItem('bossSearchHistory', JSON.stringify(searchHistoryRef.current))

      setSearchHistory(searchHistoryRef.current)
    }
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
  const navigation = useNavigation()

  const [searchHistory, setSearchHistory] = useSearchHistory()

  const route = useRoute<{ key: any, name: any, params: { keyword: string, filter: any } }>()

  const [jobList, setJobList] = useState([] as any)

  const [loading, setLoading] = useState(true)

  const currentPage = useRef(1)

  const [total, setTotal] = useState(0)

  const keywordRef = useRef<string | null>()

  const searchRef = useRef<{ setValue: (value: string) => void }>(null)

  const [filterValues, setFilterValues] = useState({})

  const onSearch = async (keyword: string) => {
    try {
      setLoading(true)

      if (!keyword?.trim()) {
        setJobList([])
        setTotal(0)
        return
      }
      keywordRef.current = keyword

      const { data: { data: jobListData, total } } = await request.post({
        page: currentPage.current,
        pageSize: 10,
        jobName: keyword,
        ...filterValues || {},
      }, { url: '/genius/profile/all' })

      setTotal(total)

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
  useEffect(() => {
    onSearch(route.params.keyword || keywordRef.current || '')

  }, [filterValues])
  return (
    <Page title="搜索">
      <Search style={styles.search} showSearchButton={true} />
      <TabList title="搜索历史" data={searchHistory} />
      <View style={styles.list}>
            {
              jobList.length
                ? <FlatList data={jobList} renderItem={job => <RecruitJobCard data={job.item} />} keyExtractor={item => item.id} />
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
})
