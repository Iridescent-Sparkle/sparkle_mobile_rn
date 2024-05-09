import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback, useRef, useState } from 'react'
import { FlatList, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Switch } from '@fruits-chain/react-native-xiaoshu'
import MemberContactInfoCard from './components/ContactInfoCard'
import MemberEducationInfoCard from './components/EducationInfoCard'
import MemberExpectedSalaryCard from './components/ExpectedSalaryCard'
import MemberProjectsInfoCard from './components/ProjectsInfoCard'
import MemberResumeCvCard from './components/ResumeCvCard'
import MemberSummaryCard from './components/SummaryInfoCard'
import MemberUserCard from './components/UserInfoCard'
import MemberVolunteerInfoCard from './components/VolunteerInfoCard'
import MemberWorkExperienceCard from './components/WorkExperienceCard'
import { themeColor } from '@/core/styleSheet/themeColor'
import { create } from '@/core/styleSheet'
import { request } from '@/core/api'

export default function GeniusMember() {
  const insets = useSafeAreaInsets()
  const isLoaded = useRef(false)
  const [loading, setLoading] = useState(true)
  const [profileData, setProfileData] = useState<UserProfile>({} as UserProfile)
  const [educationData, setEducationData] = useState<UserEducation[]>([] as UserEducation[])
  const [projectData, setProjectData] = useState<UserProject[]>([] as UserProject[])
  const [experienceData, setExperienceData] = useState<UserExperience[]>([] as UserExperience[])
  const [volunteerData, setVolunteerData] = useState<UserVolunteer[]>([] as UserVolunteer[])

  const getInitData = async () => {
    try {
      if (!isLoaded.current)
        setLoading(true)
      const [profileData, educationData, projectData, experienceData, volunteerData] = await Promise.all([
        request.get({}, {
          url: '/genius/profile/user',
        }),
        request.get({}, {
          url: '/genius/education/user',
        }),
        request.get({}, {
          url: '/genius/project/user',
        }),
        request.get({}, {
          url: '/genius/experience/user',
        }),
        request.get({}, {
          url: '/genius/volunteer/user',
        }),
      ])

      setProfileData(profileData.data)
      setEducationData(educationData.data)
      setProjectData(projectData.data)
      setExperienceData(experienceData.data)
      setVolunteerData(volunteerData.data)
    }
    catch (error) {

    }
    finally {
      await new Promise(resolve => setTimeout(resolve, 300))
      isLoaded.current = true
      setLoading(false)
    }
  }

  useFocusEffect(useCallback(() => {
    getInitData()
  }, []))

  const listData = [
    {
      id: '1',
      component: <MemberContactInfoCard data={profileData} loading={loading} />,
    },
    {
      id: '2',
      component: <MemberSummaryCard data={profileData} loading={loading} />,
    },
    {
      id: '3',
      component: <MemberExpectedSalaryCard data={profileData} loading={loading} />,
    },
    {
      id: '4',
      component: <MemberWorkExperienceCard data={experienceData} loading={loading} />,
    },
    {
      id: '5',
      component: <MemberEducationInfoCard data={educationData} loading={loading} />,
    },
    {
      id: '6',
      component: <MemberProjectsInfoCard data={projectData} loading={loading} />,
    },
    {
      id: '7',
      component: <MemberVolunteerInfoCard data={volunteerData} loading={loading} />,
    },
    {
      id: '8',
      component: <MemberResumeCvCard data={profileData} loading={loading} />,
    },
  ]

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <MemberUserCard />
      <View style={styles.header}>
        <Text style={styles.title}>在线简历</Text>
        <Switch defaultValue activeChildren="开启求职" inactiveChildren="暂不求职" />
      </View>
      <FlatList data={listData} renderItem={item => item.item.component} keyExtractor={item => item.id} />
    </View>
  )
}

const styles = create({
  container: {
    flex: 1,
    paddingHorizontal: 44,
    backgroundColor: '#FFF',
  },
  header: {
    height: 96,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    color: themeColor.black85,
    fontWeight: '700',
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
