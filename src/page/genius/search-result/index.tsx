import { request } from '@/core/api'
import Page from '@/core/components/Page'
import Visible from '@/core/components/Visible'
import { IMAGE_PREFIX } from '@/core/constants'
import { useRefState } from '@/core/hooks/useRefState'
import { create, pxToDp } from '@/core/styleSheet'
import { themeColor } from '@/core/styleSheet/themeColor'
import RecruitJobCard from '@/menu/genius/home/components/recruit-list-card'
import SearchBar from '@/menu/genius/home/components/recruit-search-bar'
import { Loading, Space, Toast } from '@fruits-chain/react-native-xiaoshu'
import { StackActions, useNavigation, useRoute } from '@react-navigation/native'
import { useEffect, useRef, useState } from 'react'
import { FlatList, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import Ionicons from 'react-native-vector-icons/Ionicons'

export default function SearchResult() {
  const navigation = useNavigation()

  const route = useRoute<{ key: any, name: any, params: { keyword: string, filter: any } }>()

  const [jobList, setJobList] = useState([] as any)

  const [loading, setLoading, getLoading] = useRefState(true)

  const [isLoadEnd, setIsLoadEnd, getIsLoaded] = useRefState(true)

  const currentPage = useRef(1)

  const [total, setTotal] = useState(0)

  const keywordRef = useRef<string | null>()

  const searchRef = useRef<{ setValue: (value: string) => void }>(null)

  const [filterValues, setFilterValues] = useState({})

  const onSearch = async (keyword: string) => {
    if (getLoading()) {
      return
    }

    try {
      if (!keyword?.trim()) {
        setJobList([])
        setTotal(0)
        currentPage.current = 1
        return
      }

      setLoading(true)
      keywordRef.current = keyword
      currentPage.current = 1

      const { data: { data: jobListData, total } } = await request.post({
        current: currentPage.current,
        pageSize: 10,
        jobName: keyword,
        ...filterValues || {},
      }, { url: '/boss/job/all' })

      setTotal(total)

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
        jobName: keywordRef.current,
        ...filterValues || {},
      }, { url: '/boss/job/all' })

      setTotal(total)
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

  }, [filterValues])

  const handleShowFilter = () => {
    navigation.dispatch(StackActions.push('FilterOptions', {
      setFilterValues,
    }))
  }

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
    <Page title="搜索" isScrollView={false}>
      <View style={styles.container}>
        <SearchBar onSearch={onSearch} ref={searchRef} />
        <Visible visible={loading}>
          <View style={styles.loading}>
            <Loading vertical>加载中...</Loading>
          </View>
        </Visible>
        <Visible visible={!loading}>
          <View style={styles.header}>
            <Text style={styles.result}>
              {`共 ${total} 个结果`}
            </Text>
            <Ionicons name="options-outline" size={pxToDp(48)} color={themeColor.primary} onPress={handleShowFilter} />
          </View>
          <View style={styles.list}>
            {
              jobList.length
                ? <FlatList data={jobList} renderItem={job => <RecruitJobCard data={job.item} />} keyExtractor={item => item.id} onEndReached={onReachBottom} ListFooterComponent={ListFooterComponent()} />
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
        </Visible>
      </View>
    </Page>
  )
}

const styles = create({
  container: {
    flex: 1,
    paddingTop: 48,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 128,
    paddingHorizontal: 4,
  },
  result: {
    fontSize: 32,
    color: themeColor.black65,
    fontWeight: '700',
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
