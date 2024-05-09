import { Card } from '@fruits-chain/react-native-xiaoshu'
import { Text, View } from 'react-native'
import { create } from '@/core/styleSheet'
import { themeColor } from '@/core/styleSheet/themeColor'

interface Props {
  data: UserProfileList
}
function ResumeSummaryCard(props: Props) {
  const { data } = props
  return (
    <View style={styles.container}>
      <Text style={styles.content}>
        {data.summary}
      </Text>
    </View>
  )
}

const styles = create({
  content: {
    fontSize: 28,
    lineHeight: 42,
    color: themeColor.black65,
    paddingVertical: 16,
  },
  container: {
    borderBottomWidth: 4,
    // paddingBottom: 24,
    borderBottomColor: '#F2F2F2',
  },
})

export default ResumeSummaryCard
