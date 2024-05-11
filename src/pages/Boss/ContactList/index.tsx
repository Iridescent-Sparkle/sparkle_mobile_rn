import { request } from '@/core/api'
import Page from '@/core/components/Page'
import ResumeListCard from '@/core/components/ResumeCard'
import { useRefState } from '@/core/hooks/useRefState'
import { create, pxToDp } from '@/core/styleSheet'
import { themeColor } from '@/core/styleSheet/themeColor'
import { Empty, Loading, Toast } from '@fruits-chain/react-native-xiaoshu'
import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback, useRef, useState } from 'react'
import { FlatList, Text, View } from 'react-native'

const pageSize = 5

export default function ContactList() {
  const [resumeList, setResumeList] = useState([] as UserProfileList[])

  const [loading, setLoading, getLoading] = useRefState(false)

  const [isLoadEnd, setIsLoadEnd, getIsLoaded] = useRefState(false)

  const currentPage = useRef(1)

  const getInitData = async () => {
    try {
      const { data: { data: resumeListData, total } } = await request.post({
        current: 1,
        pageSize,
      }, {
        url: `boss/contact/user`,
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

    }
  }

  useFocusEffect(useCallback(() => {
    getInitData()
  }, []))

  const onReachBottom = async () => {
    if (getLoading() || getIsLoaded())
      return

    try {
      setLoading(true)

      const { data: { data: resumeListData, total } } = await request.post({
        current: currentPage.current,
        pageSize,
      }, {
        url: `boss/contact/user`,
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
    <Page title="联系记录" isScrollView={false}>
      {resumeList.length
        ? <FlatList style={styles.list} data={resumeList} renderItem={job => <ResumeListCard data={job.item.profile} />} keyExtractor={job => String(job.id)} onEndReached={onReachBottom} ListFooterComponent={ListFooterComponent} />
        : <View style={styles.empty}><Empty /></View>}
    </Page>
  )
}

const styles = create({
  container: {
    flex: 1,
    paddingHorizontal: 44,
    backgroundColor: '#FFF',
  },
  list: {
    marginTop: 40,
  },
  popupHeader: {
    height: 180,
  },
  popupHeaderText: {
    fontSize: 36,
  },
  popupWrapper: {
    paddingHorizontal: 40,
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  popupButton: {
    width: 320,
    borderRadius: 40,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
