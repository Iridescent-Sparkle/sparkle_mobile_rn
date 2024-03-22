import { Space } from '@fruits-chain/react-native-xiaoshu'
import { Text, View } from 'react-native'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import ResumeCardHeader from '../resume-card-header'
import { themeColor } from '@/core/styleSheet/themeColor'
import { create, pxToDp } from '@/core/styleSheet'

function ResumeVolunteerInfoCard() {
  return (
    <View>
      <ResumeCardHeader title="志愿活动经历" />
      <Space direction="horizontal" style={styles.header}>
        <Space direction="horizontal" gap={pxToDp(32)}>
          <View style={styles.logo}>
            <FontAwesome6 name="user-group" size={pxToDp(42)} color={themeColor.primary} />
          </View>
          <Space gap={pxToDp(20)}>
            <Text style={styles.title}>Event Booking App</Text>
            <Text style={styles.company}>Interaction Designer</Text>
            <Text style={styles.date}>May 2022 - Sept 2022 (4 months)</Text>
          </Space>
        </Space>

      </Space>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 124,
    height: 124,
    borderRadius: 62,
    backgroundColor: themeColor.hazy,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: themeColor.black85,
  },
  company: {
    fontSize: 28,
    color: themeColor.black65,
  },
  date: {
    fontSize: 24,
    color: themeColor.black65,
  },
  content: {
    fontSize: 28,
    lineHeight: 42,
    color: themeColor.black65,
    paddingTop: 16,
  },
})

export default ResumeVolunteerInfoCard
