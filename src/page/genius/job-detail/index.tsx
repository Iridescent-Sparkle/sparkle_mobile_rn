import { Button, Card, Dialog, NavBar, Notify, Popup, Toast } from '@fruits-chain/react-native-xiaoshu'
import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useRef, useState } from 'react'
import { FlatList, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Skeleton from '../skeleton'
import { request } from '@/core/api'
import { create, pxToDp } from '@/core/styleSheet'
import { themeColor } from '@/core/styleSheet/themeColor'
import RecruitAboutCard from '@/page/boss/recruit-detail/recruit-about-card'
import RecruitDescriptionCard from '@/page/boss/recruit-detail/recruit-description-card'
import RecruitDetailCard from '@/page/boss/recruit-detail/recruit-detail-card'
import RecruitSummaryCard from '@/page/boss/recruit-detail/recruit-summary-card'
import RecruitTagCard from '@/page/boss/recruit-detail/recruit-tags-card'
import FilterTabs from '@/page/boss/recruit-search/recruit-filter-tabs'
import CollectButton from '@/page/genius/job-detail/components/collect-button'
import { useJobStore } from '@/store/job'
import { JOB_DELIVER_STATUS } from '@/core/constants'

const TAB_DATA = [{
  id: '1',
  title: '工作描述',
}, {
  id: '2',
  title: '最低资格',
}, {
  id: '3',
  title: '福利',
}, {
  id: '4',
  title: '工作总结',
}, {
  id: '5',
  title: '关于',
}]

function JobDetail() {
  const insets = useSafeAreaInsets()

  const navigation = useNavigation()

  const route = useRoute<{ key: any, name: any, params: { jobId: string, type: string } }>()

  const jobStore = useJobStore()

  const listRef = useRef<FlatList>(null)

  const [popupVisible, setPopupVisible] = useState(false)
  const [popupCloseJobVisible, setPopupCloseJobVisible] = useState(false)

  const [loading, setLoading] = useState(true)

  const [confirmLoading, setConfirmLoading] = useState(false)

  const [jobDetail, setJobDetail] = useState({} as JobDetail)

  function listData(listRef: any, jobDetail: JobDetail) {
    return [
      {
        id: '1',
        title: '工作描述',
        component: <FilterTabs listRef={listRef} data={TAB_DATA} />,
      },
      {
        id: '2',
        title: '工作描述',
        component: <RecruitDescriptionCard title="工作描述" data={jobDetail.jobDescription.split(',')} />,
      },
      {
        id: '3',
        title: '最低资格',
        component: <RecruitDescriptionCard title="最低资格" data={jobDetail.jobRequirements.split(',')} />,
      },
      {
        id: '4',
        title: '福利',
        component: <RecruitTagCard title="福利" data={jobDetail.jobBonus} />,
      },
      {
        id: '5',
        title: '工作总结',
        component: <RecruitSummaryCard
          title="工作总结"
          data={[
            { title: '经验', desc: jobStore.jobExperienceOptions.find(option => option.value === jobDetail.jobExperienceId)?.label || '' },
            { title: '教育', desc: jobStore.jobEducationOptions.find(option => option.value === jobDetail.jobEducationId)?.label || '' },
            { title: '工作水平', desc: jobStore.jobLevelOptions.find(option => option.value === jobDetail.jobLevelId)?.label || '' },
            { title: '工作类型 ', desc: jobStore.jobCategoryOptions.find(option => option.value === jobDetail.jobCategoryId)?.label || '' },
            { title: '空缺', desc: String(jobDetail.headCount) },
            { title: '网站', desc: jobDetail.website },
          ].filter(item => !!item.desc)}
                   />,
      },
      {
        id: '6',
        title: '关于',
        component: <RecruitAboutCard title="关于" content={jobDetail.companyDescription} />,
      },
    ]
  }

  const getInitData = async () => {
    const { data } = await request.get({}, {
      url: `/boss/job/${route.params.jobId}`,
    })
    setJobDetail(data)

    setTimeout(() => { setLoading(false) }, 300)
  }

  useEffect(() => {
    getInitData()
  }, [route.params.jobId])

  const handlePopupShow = () => {
    if (jobDetail.jobDeliverStatus !== 0)
      return
    setPopupVisible(true)
  }

  const handlePopupClose = () => {
    setPopupVisible(false)
  }

  const onPressBackArrow = () => {
    navigation.goBack()
  }

  const handleConfirmClick = async () => {
    try {
      setConfirmLoading(true)
      await request.post({
        jobId: route.params.jobId,
        status: 1,
      }, {
        url: '/genius/deliveries/create',
      })
      await getInitData()
      handlePopupClose()
      setConfirmLoading(false)
      Notify({
        type: 'success',
        message: '投递成功',
      })
    }
    catch (error) {
      Toast.fail('投递失败')
    }
  }

  const handlePopupCloseJobShow = () => {
    setPopupCloseJobVisible(true)
  }
  const handlePopupCloseJobCancel = () => {
    setPopupCloseJobVisible(false)
  }

  const handleCloseJobConfirm = async () => {
    try {
      setPopupCloseJobVisible(false)
      await request.post({
        jobId: route.params.jobId,
      }, {
        url: '/boss/job/remove',
      })
      Dialog({
        title: '关闭成功',
      }).then(() => {
        navigation.goBack()
      })
    }
    catch (error) {
      Toast.fail('关闭失败')
    }
  }
  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>

      {
        loading
          ? (
            <>
              <NavBar onPressBackArrow={onPressBackArrow} rightStyle={styles.rightExtra} divider={false} />
              <Skeleton />
            </>
            )
          : (
            <>
              <NavBar title={jobDetail.jobName || ''} onPressBackArrow={onPressBackArrow} rightExtra={route.params.type === 'manage' ? undefined : <CollectButton jobDetail={jobDetail} handleCollectClick={getInitData} />} rightStyle={styles.rightExtra} divider={false} />
              <View style={styles.list}>
                <FlatList
                  ListHeaderComponent={<RecruitDetailCard data={jobDetail} />}
                  stickyHeaderIndices={[1]}
                  ref={listRef}
                  data={listData(listRef, jobDetail)}
                  renderItem={item => item.item.component}
                  keyExtractor={item => item.id}
                />
              </View>
              <Card>
                <View style={styles.buttonWrapper}>
                  {

                    route.params.type === 'manage'
                      ? (
                        <Button style={styles.dangerButton} onPress={handlePopupCloseJobShow}>
                          关闭职位
                        </Button>
                        )
                      : jobDetail.jobDeliverStatus === 0
                        ? (
                          <Button style={styles.button} onPress={handlePopupShow}>
                            投递
                          </Button>
                          )
                        : (
                          <View style={[styles.disableButton, { backgroundColor: JOB_DELIVER_STATUS[jobDetail.jobDeliverStatus].bgColor }]}>
                            <Text style={{ fontSize: pxToDp(32), color: JOB_DELIVER_STATUS[jobDetail.jobDeliverStatus].color }}>{JOB_DELIVER_STATUS[jobDetail.jobDeliverStatus].label}</Text>
                          </View>
                          )
                  }
                </View>
              </Card>
            </>
            )
      }
      <Popup
        safeAreaInsetBottom
        visible={popupVisible}
        position="bottom"
        round
      >
        <Popup.Header title="是否要投递该职位" showClose={false} style={styles.popupHeader} titleTextStyle={styles.popupHeaderText} divider={true} />
        <View style={styles.popupWrapper}>
          <Button style={styles.popupButton} onPress={handlePopupClose} type="hazy" disabled={confirmLoading}>取消</Button>
          <Button style={styles.popupButton} onPress={handleConfirmClick} loading={confirmLoading} loadingText="投递">投递</Button>
        </View>
      </Popup>
      <Popup
        safeAreaInsetBottom
        visible={popupCloseJobVisible}
        position="bottom"
        round
      >
        <Popup.Header title="是否要关闭该职位" showClose={false} style={styles.popupHeader} titleTextStyle={styles.popupHeaderText} divider={true} />
        <View style={styles.popupWrapper}>
          <Button style={styles.popupButton} onPress={handlePopupCloseJobCancel} type="outline" disabled={confirmLoading}>取消</Button>
          <Button style={styles.popupDangerButton} onPress={handleCloseJobConfirm} loading={confirmLoading}>关闭</Button>
        </View>
      </Popup>
    </View>
  )
}

const styles = create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  rightExtra: {

  },
  tabBar: {
    height: 114,
    paddingHorizontal: 0,
  },
  list: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 24,
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    borderRadius: 40,
  },
  dangerButton: {
    width: '100%',
    borderRadius: 40,
    color: '#FFF2F2',
    backgroundColor: '#F86060',
  },
  disableButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderStyle: 'solid',
    paddingHorizontal: 16,
    borderRadius: 24,
    height: 88,
  },
  popupHeader: {
    height: 180,
  },
  popupHeaderText: {
    fontSize: 36,
  },
  popupWrapper: {
    flexDirection: 'row',
    paddingHorizontal: 40,
    justifyContent: 'space-between',
    paddingBottom: 40,
  },
  popupButton: {
    width: 320,
    borderRadius: 40,
  },
  popupDangerButton: {
    color: '#FFF2F2',
    backgroundColor: '#F86060',
    width: 320,
    borderRadius: 40,
  },
})

export default JobDetail
