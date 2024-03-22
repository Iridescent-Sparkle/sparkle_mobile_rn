import { Card } from '@fruits-chain/react-native-xiaoshu'
import { Text, View } from 'react-native'
import ResumeCardHeader from '../resume-card-header'
import { themeColor } from '@/core/styleSheet/themeColor'
import { create } from '@/core/styleSheet'

function ResumeSalaryCard() {
  return (
    <View style={styles.container}>
      <ResumeCardHeader title="期望薪资" />
      <Text style={styles.info}>
        $10,000 - $25,000/month
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
