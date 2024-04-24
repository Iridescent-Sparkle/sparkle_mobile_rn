import { Loading, Space, Toast } from '@fruits-chain/react-native-xiaoshu'
import { StackActions, useNavigation, useRoute } from '@react-navigation/native'
import { useEffect, useRef, useState } from 'react'
import { FlatList, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { request } from '@/core/api'
import Page from '@/core/components/Page'
import Visible from '@/core/components/Visible'
import { IMAGE_PREFIX } from '@/core/constants'
import { create, pxToDp } from '@/core/styleSheet'
import { themeColor } from '@/core/styleSheet/themeColor'
import RecruitJobCard from '@/menu/genius/home/components/recruit-list-card'
import SearchBar from '@/menu/genius/home/components/recruit-search-bar'

export default function SearchResult() {
  const navigation = useNavigation()

  const route = useRoute<{ key: any, name: any, params: { keyword: string } }>()

  const [jobList, setJobList] = useState([] as any)

  const [loading, setLoading] = useState(true)

  const currentPage = useRef(1)

  const [total, setTotal] = useState(0)

  const onSearch = async (keyword: string) => {
    try {
      setLoading(true)

      if (!keyword?.trim()) {
        setJobList([])
        setTotal(0)
        return
      }
      const { data: { data: jobListData, total } } = await request.post({
        page: currentPage.current,
        pageSize: 10,
        jobName: keyword,
      }, { url: '/boss/job/all' })

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
    onSearch(route.params.keyword)
  }, [])

  const handleShowFilter = () => {
    navigation.dispatch(StackActions.push('FilterOptions'))
  }

  return (
    <Page title="搜索" isScrollView={false}>
      <View style={styles.container}>
        <SearchBar onSearch={onSearch} />
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
