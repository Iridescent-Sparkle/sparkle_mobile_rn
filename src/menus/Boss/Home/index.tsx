import { Empty, Loading, Toast } from '@fruits-chain/react-native-xiaoshu'
import { StackActions, useFocusEffect, useNavigation } from '@react-navigation/native'
import { useCallback, useRef, useState } from 'react'
import { FlatList, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import PageHeader from '../Manage/components/PageHeader'
import ResumeListCard from '../../../core/components/ResumeCard'
import { create, pxToDp } from '@/core/styleSheet'
import SearchBar from '@/core/components/SearchBar'
import { request } from '@/core/api'
import { useRefState } from '@/core/hooks/useRefState'
import { themeColor } from '@/core/styleSheet/themeColor'

const pageSize = 5

export default function BossManage() {
  const insets = useSafeAreaInsets()

  const navigation = useNavigation()

  const [resumeList, setResumeList] = useState([] as UserProfileList[])

  const [loading, setLoading, getLoading] = useRefState(false)

  const [isLoadEnd, setIsLoadEnd, getIsLoaded] = useRefState(false)

  const currentPage = useRef(1)

  const getInitData = async () => {
    try {
      const { data: { data: resumeListData, total } } = await request.post({
        isHunting: true,
        current: 1,
        pageSize,
      }, {
        url: `/genius/profile/all`,
      })
      setResumeList(resumeListData)
      if (pageSize >= total) {
        setIsLoadEnd(true)
        return
      }
      setIsLoadEnd(false)
      currentPage.current = 2
    }
    catch (error) {
      Toast.fail('数据获取失败')
    }
  }

  useFocusEffect(useCallback(() => {
    getInitData()
  }, []))

  const tip = (function () {
    const date = new Date()
    const hours = date.getHours()

    if (hours >= 6 && hours < 12)
      return '早上好'
    else if (hours >= 12 && hours < 18)
      return '下午好'
    else
      return '晚上好'
  })()

  const onSearch = (value: string) => {
    navigation.dispatch(StackActions.push('BossSearch', {
      keyword: value,
    }))
  }

  // eslint-disable-next-line react/no-nested-components
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
  const onReachBottom = async () => {
    if (getLoading() || getIsLoaded())
      return

    try {
      setLoading(true)

      const { data: { data: resumeListData, total } } = await request.post({
        isHunting: true,
        current: currentPage.current,
        pageSize,
      }, {
        url: `/genius/profile/all`,
      })

      setResumeList([...resumeList, ...resumeListData])

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
      await new Promise(resolve => setTimeout(resolve, 1000))
      setLoading(false)
    }
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <PageHeader title={tip} />
      <SearchBar onSearch={onSearch} />
      {resumeList.length
        ? (
        
            <FlatList  style={styles.list} data={resumeList} renderItem={resume => <ResumeListCard data={resume.item} from="home" />} keyExtractor={item => String(item.id)} onEndReached={onReachBottom} ListFooterComponent={ListFooterComponent} />
        
        )
        : <View style={styles.empty}><Empty /></View>}
    </View>
  )
}

const styles = create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 44,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  list: {
    flex: 1,
    width: '100%',
    marginTop: 24,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
