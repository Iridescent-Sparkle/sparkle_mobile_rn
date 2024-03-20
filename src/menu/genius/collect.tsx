import { FlatList, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import React, { useEffect, useState } from 'react'
import { Button, Popup } from '@fruits-chain/react-native-xiaoshu'
import RecruitListHeader from '../../components/recruit/recruit-list/recruit-job-header'
import RecruitListCard from '../../components/recruit/recruit-list/recruit-list-card'
import RecruitSearchBar from '../../components/recruit/recruit-list/recruit-search-bar'
import { create } from '@/core/styleSheet'
import { request } from '@/core/api'
import { useAppStore } from '@/store'
import Skeleton from '@/page/genius/skeleton'
import { useRefState } from '@/core/hooks/useRefState'

export default function GeniusCollect() {
  const insets = useSafeAreaInsets()

  const appStore = useAppStore()

  const [popupVisible, setPopupVisible] = useState(false)

  const [jobList, setJobList] = useState([])

  const [loading, setLoading] = useState(true)

  const [selectJob, setSelectJob] = useRefState()

  const getInitData = async () => {
    try {
      setLoading(true)
      const { data: jobListData } = await request.get({}, {
        url: `/favorite/user/${appStore.userInfo.id}}`,
      })
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

  const handlePopupShow = (id: unknown) => {
    setSelectJob(id)
    setPopupVisible(true)
  }

  const handlePopupClose = () => {
    setPopupVisible(false)
  }

  const handleConfirmClick = async () => {
    try {
      await request.delete({
        jobId: selectJob,
        userId: appStore.userInfo.id,
      }, {
        url: `/favorite/remove`,
      })

      const { data: jobListData } = await request.get({}, {
        url: `/favorite/user/${appStore.userInfo.id}}`,
      })

      setJobList(jobListData)
      setPopupVisible(false)
    }
    catch (error) {

    }
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {
      loading
        ? <Skeleton />
        : (
          <>
            <RecruitListHeader title="收藏的工作" />
            <RecruitSearchBar />
            <FlatList style={styles.list} data={jobList} renderItem={item => <RecruitListCard handleCollectClick={() => handlePopupShow(item.id)} data={item} showCollectBtn={false} />} keyExtractor={item => item.id} />
            <Popup
              safeAreaInsetBottom
              visible={popupVisible}
              position="bottom"
              onPressOverlay={handlePopupClose}
              round
            >
              <Popup.Header title="投递简历" showClose={false} style={styles.popupHeader} titleTextStyle={styles.popupHeaderText} divider={true} />
              <View style={styles.popupWrapper}>
                <RecruitListCard />
                <View style={styles.buttonWrapper}>
                  <Button style={styles.popupButton} onPress={handlePopupClose} type="hazy">取消</Button>
                  <Button style={styles.popupButton} onPress={handleConfirmClick}>是的，移除</Button>
                </View>
              </View>
            </Popup>
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
})
