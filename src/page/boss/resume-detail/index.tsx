import { ScrollView } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import ResumeEducationCard from './components/resume-education-card'
import ResumeExperienceCard from './components/resume-experience-card'
import ResumeProjectsInfoCard from './components/resume-projects-card'
import ResumeSalaryCard from './components/resume-salary-card'
import ResumeSkillsInfoCard from './components/resume-skills-card'
import ResumeSummaryCard from './components/resume-summary-card'
import ResumeUserCard from './components/resume-user-card'
import ResumeVolunteerInfoCard from './components/resume-volunteer-card'
import { themeColor } from '@/core/styleSheet/themeColor'
import { create } from '@/core/styleSheet'

export default function ResumeDetail() {
  const insets = useSafeAreaInsets()

  return (
    <ScrollView style={[styles.container, { paddingBottom: insets.bottom }]}>
      <ResumeUserCard />
      <ResumeSummaryCard />
      <ResumeSalaryCard />
      <ResumeSkillsInfoCard />
      <ResumeExperienceCard />
      <ResumeEducationCard />
      <ResumeProjectsInfoCard />
      <ResumeVolunteerInfoCard />
    </ScrollView>
  )
}

const styles = create({
  container: {
    flex: 1,
    gap: 32,
    backgroundColor: '#fff',
    paddingHorizontal: 56,
  },
  content: {
    fontSize: 28,
    lineHeight: 42,
    color: themeColor.black65,
  },
})
