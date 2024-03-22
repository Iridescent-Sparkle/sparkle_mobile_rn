import { Card } from '@fruits-chain/react-native-xiaoshu'
import { Text, View } from 'react-native'
import { create } from '@/core/styleSheet'
import { themeColor } from '@/core/styleSheet/themeColor'

function ResumeSummaryCard() {
  return (
    <View style={styles.container}>
      <Text style={styles.content}>
        Hello, I'm Andrew.I am a designer with more
        than 5 years experience. My main fields are Ul/
        UX Design, Illustration and Graphic Design. You
        can check the portfolio on my profil
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
