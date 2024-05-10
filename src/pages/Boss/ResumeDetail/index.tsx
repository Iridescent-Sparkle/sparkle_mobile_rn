import { request } from '@/core/api'
import Page from '@/core/components/Page'
import Visible from '@/core/components/Visible'
import { JOB_DELIVER_STATUS } from '@/core/constants'
import { create, pxToDp } from '@/core/styleSheet'
import { useUserStore } from '@/store/user'
import { Button, Dialog } from '@fruits-chain/react-native-xiaoshu'
import { StackActions, useNavigation, useRoute } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import ResumeCvCard from './components/ResumeCvCard'
import ResumeEducationCard from './components/ResumeEducationCard'
import ResumeExperienceCard from './components/ResumeExperienceCard'
import ResumeProjectsInfoCard from './components/ResumeProjectsCard'
import ResumeSalaryCard from './components/ResumeSalaryCard'
import ResumeSummaryCard from './components/ResumeSummaryCard'
import ResumeUserCard from './components/ResumeUserCard'
import ResumeVolunteerInfoCard from './components/ResumeVolunteerCard'

export default function ResumeDetail() {
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

      setDeliverStatusData(deliverStatusData || {})
      if (route.params.deliverId && deliverStatusData.status === 1) {
        await request.post({
          deliverId: route.params.deliverId,
          status: 2,
        }, {
          url: `/genius/deliveries/update`,
        })
      }
      userStore.getUserInfo()
    }
    catch (error) {

    }
  }

  useEffect(() => {
    getInitData()
  }, [])

  const handleChatClick = async () => {
    if (route.params.from === 'home' && !userStore.userInfo.contact?.map(item => item.profileId).includes(resumeList.user.profileId)) {
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
                isConsume: true,
              }, { url: 'boss/consume/create' }),
              await request.post({
                profileId: route.params.profileId,
              }, { url: '/boss/contact/create' }),
            ])

            if (action === 'confirm') {
              resumeList.user.contactIdToB && navigation.dispatch(StackActions.push('GeniusChatDetail', {
                convType: 0,
                convId: resumeList.user.contactIdToB,
                convName: '',
              }))
              userStore.getUserInfo()
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
        convName: '',
      }))
    }
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
    <Page title="简历详情" isScrollView={false}>
      <View style={styles.content}>
        <ScrollView>
          <ResumeUserCard data={resumeList} />
          <ResumeSummaryCard data={resumeList} />
          <ResumeSalaryCard data={resumeList} />
          <ResumeExperienceCard data={resumeList} />
          <ResumeEducationCard data={resumeList} />
          <ResumeProjectsInfoCard data={resumeList} />
          <ResumeVolunteerInfoCard data={resumeList} />
          <ResumeCvCard data={resumeList} />
        </ScrollView>
        <Visible visible={resumeList.user?.id !== userStore.userInfo.id}>
          <Visible visible={deliverStatusData.status === 3 || !deliverStatusData.status}>
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
    </Page>
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
  button: {
    height: 100,
    borderRadius: 24
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
