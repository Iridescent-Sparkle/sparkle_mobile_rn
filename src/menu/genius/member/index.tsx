import React from 'react'
import { FlatList, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import RecruitListHeader from '../../../components/recruit/recruit-list/recruit-job-header'
import MemberContactInfoCard from './components/contact-info-card'
import MemberProjectsInfoCard from './components/projects-info-card'
import MemberResumeCvCard from './components/resume-cv-card'
import MemberSkillsInfoCard from './components/skills-info-card'
import MemberSummaryCard from './components/summary-info-card'
import MemberUserCard from './components/user-info-card'
import MemberVolunteerInfoCard from './components/volunteer-info-card'
import MemberWorkExperienceCard from './components/work-experience-card'
import MemberExpectedSalaryCard from './components/expected-salary-card'
import MemberEducationInfoCard from './components/education-info-card'
import { create } from '@/core/styleSheet'

const listData = [
  {
    id: '1',
    component: <MemberContactInfoCard />,
  },
  {
    id: '2',
    component: <MemberSummaryCard />,
  },
  {
    id: '3',
    component: <MemberExpectedSalaryCard />,
  },
  {
    id: '4',
    component: <MemberWorkExperienceCard />,
  },
  {
    id: '5',
    component: <MemberEducationInfoCard />,
  },
  {
    id: '6',
    component: <MemberProjectsInfoCard />,
  },
  {
    id: '7',
    component: <MemberVolunteerInfoCard />,
  },
  {
    id: '8',
    component: <MemberSkillsInfoCard />,
  },
  {
    id: '9',
    component: <MemberResumeCvCard />,
  },
]

export default function GeniusMember() {
  const insets = useSafeAreaInsets()

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <MemberUserCard />
      <FlatList style={styles.list} data={listData} renderItem={item => item.item.component} keyExtractor={item => item.id} />
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
