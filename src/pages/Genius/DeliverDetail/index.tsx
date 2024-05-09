import { Button, Card, NavBar, Skeleton, Tag } from '@fruits-chain/react-native-xiaoshu'
import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { StackActions, useNavigation, useRoute } from '@react-navigation/native'
import { create, pxToDp } from '@/core/styleSheet'
import { request } from '@/core/api'
import { JOB_DELIVER_STATUS } from '@/core/constants'
import RecruitDetailCard from '@/pages/Boss/RecruitDetail/RecruitDetailCard'

function DeliverDetail() {
  const insets = useSafeAreaInsets()

  const navigation = useNavigation()

  const route = useRoute<{ key: any, name: any, params: { jobId: string } }>()

  const [loading, setLoading] = useState(true)

  const [jobDetail, setJobDetail] = useState({} as JobDetail)

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

  const handleBackClick = () => {
    navigation.goBack()
  }

  const handleButtonClick = () => {
    if (jobDetail.jobDeliverStatus === 3) {
      navigation.dispatch(StackActions.push('GeniusChatDetail', {
        convType: 0,
        convId: jobDetail.user.contactIdToB,
        convName: '',
      }))
    }
    else if (jobDetail.jobDeliverStatus === 4) {
      navigation.dispatch(StackActions.replace('Genius'))
    }
  }
  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom || 16 }]}>
      <NavBar title="投递状态" divider={false} onPressBackArrow={handleBackClick} />
      {
        loading
          ? <Skeleton />
          : (
            <>
              <View style={styles.list}>
                <RecruitDetailCard data={jobDetail} />
                <Text style={styles.subTitle}>您的投递状态</Text>
                <View style={[styles.status, { backgroundColor: JOB_DELIVER_STATUS[jobDetail.jobDeliverStatus]?.bgColor }]}>
                  <Text style={{ fontSize: pxToDp(32), color: JOB_DELIVER_STATUS[jobDetail.jobDeliverStatus]?.color }}>{JOB_DELIVER_STATUS[jobDetail.jobDeliverStatus]?.desc}</Text>
                </View>
              </View>
              <Card>
                <View style={styles.buttonWrapper}>
                  <Button style={styles.button} onPress={handleButtonClick}>
                    {JOB_DELIVER_STATUS[jobDetail.jobDeliverStatus]?.label}
                  </Button>
                </View>
              </Card>
            </>
            )
      }
    </View>
  )
}

const styles = create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  list: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 24,
  },
  subTitle: {
    marginTop: 32,
    textAlign: 'center',
    fontSize: 32,
    color: '#333',
    fontWeight: '700',
    lineHeight: 88,
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    width: 660,
    borderRadius: 40,
  },
  status: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
    borderTopWidth: 4,
    borderColor: '#F7F7F7',
    height: 88,
    paddingHorizontal: 16,
    borderRadius: 24,
  },
  statusTitle: {
    fontSize: 36,
    paddingVertical: 48,
  },
  statusDesc: {
    width: '100%',
    height: 96,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 36,
  },

})

export default DeliverDetail
