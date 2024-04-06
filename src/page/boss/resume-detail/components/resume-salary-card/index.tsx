import { Text, View } from 'react-native'
import ResumeCardHeader from '../resume-card-header'
import { create } from '@/core/styleSheet'
import { themeColor } from '@/core/styleSheet/themeColor'

interface Props {
  data: UserProfileList
}
function ResumeSalaryCard(props: Props) {
  const { data } = props
  return (
    <View style={styles.container}>
      <ResumeCardHeader title="期望薪资" />
      <Text style={styles.info}>
        { `￥${data.minSalary} - ￥${data.maxSalary} 千元/月`}
      </Text>
    </View>
  )
}

const styles = create({
  container: {
    borderBottomWidth: 4,
    paddingBottom: 24,
    borderBottomColor: '#F2F2F2',
  },
  info: {
    fontSize: 32,
    fontWeight: '600',
    color: themeColor.black65,
  },
})

export default ResumeSalaryCard
