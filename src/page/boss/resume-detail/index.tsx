import { Button, Dialog, NavBar } from '@fruits-chain/react-native-xiaoshu'
import { StackActions, useNavigation, useRoute } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { ScrollView, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import ResumeEducationCard from './components/resume-education-card'
import ResumeExperienceCard from './components/resume-experience-card'
import ResumeProjectsInfoCard from './components/resume-projects-card'
import ResumeSalaryCard from './components/resume-salary-card'
import ResumeSummaryCard from './components/resume-summary-card'
import ResumeUserCard from './components/resume-user-card'
import ResumeVolunteerInfoCard from './components/resume-volunteer-card'
import { themeColor } from '@/core/styleSheet/themeColor'
import { create } from '@/core/styleSheet'
import { request } from '@/core/api'
import Visible from '@/core/components/Visible'
import { useUserStore } from '@/store/user'

export default function ResumeDetail() {
  const insets = useSafeAreaInsets()
  const navigation = useNavigation()
  const userStore = useUserStore()
  const [resumeList, setResumeList] = useState({} as UserProfileList)
  const route = useRoute<{ key: any, name: any, params: { profileId: number } }>()
  const getInitData = async () => {
    try {
      const { data: { data: resumeListData } } = await request.post({
        id: route.params.profileId,
      }, {
        url: `/genius/profile/all`,
      })
      setResumeList(resumeListData[0])
    }
    catch (error) {

    }
  }

  useEffect(() => {
    getInitData()
  }, [])
  const handleChatClick = () => {
    Dialog.confirm({
      title: '本次聊天需消耗1积分',
      // message: '一袋米要抗几楼，一袋米要抗二楼',
      buttonReverse: true,
    }).then((action) => {
      if (action === 'confirm') {
        resumeList.user.contactIdToB && navigation.dispatch(StackActions.push('GeniusChatDetail', {
          convType: 0,
          convId: resumeList.user.contactIdToB,
        }))
      }
    })
  }
  return (
    <View style={[styles.container, { top: insets.top, paddingBottom: insets.bottom }]}>
      <NavBar></NavBar>
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
          <Button style={styles.button} onPress={handleChatClick}>发起聊天</Button>
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
})
