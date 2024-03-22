import { Card, Space } from '@fruits-chain/react-native-xiaoshu'
import { Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import ResumeCardHeader from '../resume-card-header'
import { themeColor } from '@/core/styleSheet/themeColor'
import { create, pxToDp } from '@/core/styleSheet'
import { IMAGE_PREFIX } from '@/core/constants'

function ResumeEducationCard() {
  return (
    <View style={styles.container}>
      <ResumeCardHeader title="教育经历" />
      <Space direction="horizontal" style={styles.header}>
        <Space direction="horizontal" gap={pxToDp(32)}>
          <FastImage
            style={styles.logo}
            source={{
              uri: `${IMAGE_PREFIX}/stars.png`,
            }}
          />
          <Space gap={pxToDp(20)}>
            <Text style={styles.title}>UI/UX Designer</Text>
            <Text style={styles.company}>Google LLC</Text>
            <Text style={styles.date}>May 2019 - June 2021 (2 years)</Text>
            <Text style={styles.gpa}>GPA: 3.60 (4.0 scale)</Text>
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
  container: {
    borderBottomWidth: 4,
    paddingBottom: 24,
    borderBottomColor: '#F2F2F2',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  gpa: {
    fontSize: 24,
    color: themeColor.black65,
  },
  logo: {
    width: 116,
    height: 116,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: themeColor.black12,
  },
  content: {
    fontSize: 28,
    lineHeight: 42,
    color: themeColor.black65,
    paddingTop: 16,
  },
})

export default ResumeEducationCard
