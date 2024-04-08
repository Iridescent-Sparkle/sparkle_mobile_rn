import { Button, Dialog, NavBar } from '@fruits-chain/react-native-xiaoshu'
import { StackActions, useNavigation, useRoute } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import ResumeEducationCard from './components/resume-education-card'
import ResumeExperienceCard from './components/resume-experience-card'
import ResumeProjectsInfoCard from './components/resume-projects-card'
import ResumeSalaryCard from './components/resume-salary-card'
import ResumeSummaryCard from './components/resume-summary-card'
import ResumeUserCard from './components/resume-user-card'
import ResumeVolunteerInfoCard from './components/resume-volunteer-card'
import { useUserStore } from '@/store/user'
import { create, pxToDp } from '@/core/styleSheet'
import Visible from '@/core/components/Visible'
import { request } from '@/core/api'
import { JOB_DELIVER_STATUS } from '@/core/constants'

export default function ResumeDetail() {
  const insets = useSafeAreaInsets()
  const navigation = useNavigation()
  const userStore = useUserStore()
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [resumeList, setResumeList] = useState({} as UserProfileList)
  const [deliverStatusData, setDeliverStatusData] = useState({} as any)
  const route = useRoute<{ key: any, name: any, params: { from: 'home' | 'manage', profileId: number, deliverId: number, status: number } }>()
  const getInitData = async () => {
    try {
      const [{ data: { data: resumeListData } }, { data: deliverStatusData }] = await Promise.all([
        request.post({
          id: route.params.profileId,
        }, {
          url: `/genius/profile/all`,
        }),
        request.post({
          id: route.params.deliverId,
        }, {
          url: `/genius/deliveries/query`,
        }),
      ])

      setResumeList(resumeListData[0])
      setDeliverStatusData(deliverStatusData)
      if (route.params.deliverId && deliverStatusData.status === 1) {
        await request.post({
          deliverId: route.params.deliverId,
          status: 2,
        }, {
          url: `/genius/deliveries/update`,
        })
      }
    }
    catch (error) {

    }
  }

  useEffect(() => {
    getInitData()
  }, [])

  const handleChatClick = async () => {
    if (route.params.from === 'home' && userStore.userInfo.contactId.includes(resumeList.user.profileId)) {
      if (Number(userStore.userInfo.integral) < 1) {
        Dialog.confirm({
          title: '积分不足',
          message: '本次聊天需消耗1积分',
          confirmButtonText: '去充值',
        }).then(async (action) => {
          if (action === 'confirm')
            navigation.dispatch(StackActions.push('RechargeIntegral'))
        })
      }
      else {
        Dialog.confirm({
          title: '发起聊天',
          message: '本次聊天需消耗1积分',
        }).then(async (action) => {
          if (action === 'confirm') {
            await Promise.all([
              await request.post({
                integral: 1,
              }, { url: 'boss/integral/consume' }),
              await request.post({
                integral: 1,
                type: 'chat',
              }, { url: 'boss/consume/create' }),
              await request.post({
                profileId: route.params.profileId,
              }, { url: '/boss/contact/create' }),
            ])

            if (action === 'confirm') {
              resumeList.user.contactIdToB && navigation.dispatch(StackActions.push('GeniusChatDetail', {
                convType: 0,
                convId: resumeList.user.contactIdToB,
              }))
            }
          }
        })
      }
    }
    else {
      await request.post({
        profileId: route.params.profileId,
      }, { url: '/boss/contact/create' })
      resumeList.user.contactIdToB && navigation.dispatch(StackActions.push('GeniusChatDetail', {
        convType: 0,
        convId: resumeList.user.contactIdToB,
      }))
    }
  }

  const handleBackClick = () => {
    navigation.goBack()
  }

  const handleUnbefittingClick = async () => {
    try {
      setConfirmLoading(true)
      await request.post({
        deliverId: route.params.deliverId,
        status: 4,
      }, {
        url: `/genius/deliveries/update`,
      })
      await getInitData()
    }
    catch (error) {

    }
    finally {
      setConfirmLoading(false)
    }
  }

  const handleSuitableClick = async () => {
    try {
      setConfirmLoading(true)
      await request.post({
        deliverId: route.params.deliverId,
        status: 3,
      }, {
        url: `/genius/deliveries/update`,
      })
      await getInitData()
    }
    catch (error) {

    }
    finally {
      setConfirmLoading(false)
    }
  }

  return (
    <View style={[styles.container, { top: insets.top, paddingBottom: insets.bottom || 16 }]}>
      <NavBar onPressBackArrow={handleBackClick} />
      <View style={styles.content}>
        <ScrollView style={styles.body}>
          <ResumeUserCard data={resumeList} />
          <ResumeSummaryCard data={resumeList} />
          <ResumeSalaryCard data={resumeList} />
          <ResumeExperienceCard data={resumeList} />
          <ResumeEducationCard data={resumeList} />
          <ResumeProjectsInfoCard data={resumeList} />
          <ResumeVolunteerInfoCard data={resumeList} />
        </ScrollView>
        <Visible visible={resumeList.user?.id !== userStore.userInfo.id}>
          <Visible visible={deliverStatusData.status === 3}>
            <Button style={styles.button} onPress={handleChatClick}>发起聊天</Button>
          </Visible>
          <Visible visible={deliverStatusData.status === 4}>
            <View style={[styles.disableButton, { backgroundColor: JOB_DELIVER_STATUS[deliverStatusData.status]?.bgColor }]}>
              <Text style={{ fontSize: pxToDp(32), color: JOB_DELIVER_STATUS[deliverStatusData.status]?.color }}>{JOB_DELIVER_STATUS[deliverStatusData.status]?.desc}</Text>
            </View>
          </Visible>
          <Visible visible={deliverStatusData.status === 1 || deliverStatusData.status === 2}>
            <View style={styles.popupWrapper}>
              <Button style={styles.popupDangerButton} onPress={handleUnbefittingClick}>不合适</Button>
              <Button style={styles.popupButton} onPress={handleSuitableClick}>合适</Button>
            </View>
          </Visible>
        </Visible>
      </View>
    </View>
  )
}

const styles = create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  body: {
    paddingHorizontal: 56,
  },
  button: {
    height: 100,
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
