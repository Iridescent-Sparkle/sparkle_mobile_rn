import { Tag } from '@fruits-chain/react-native-xiaoshu'
import { View } from 'react-native'
import ResumeCardHeader from '../resume-card-header'
import { create } from '@/core/styleSheet'
import { themeColor } from '@/core/styleSheet/themeColor'

function ResumeSkillsInfoCard() {
  return (
    <View style={styles.container}>
      <ResumeCardHeader title="技能" />
      <View style={styles.card}>
        <Tag type="ghost" color={themeColor.primary} size="l" innerStyle={styles.tag}>
          New York  New York
        </Tag>
        <Tag type="ghost" color={themeColor.primary} size="l" innerStyle={styles.tag}>
          New York.
        </Tag>
        <Tag type="ghost" color={themeColor.primary} size="l" innerStyle={styles.tag}>
          New York
        </Tag>
        <Tag type="ghost" color={themeColor.primary} size="l" innerStyle={styles.tag}>
          New York.
        </Tag>
      </View>
    </View>
  )
}

const styles = create({
  card: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: 24,
  },
  tag: {
    borderRadius: 60,
    borderWidth: 4,
    height: 64,
    paddingHorizontal: 24,
  },
  container: {
    borderBottomWidth: 4,
    paddingBottom: 24,
    borderBottomColor: '#F2F2F2',
  },
})

export default ResumeSkillsInfoCard
