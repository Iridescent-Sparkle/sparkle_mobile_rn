import { Space } from '@fruits-chain/react-native-xiaoshu'
import dayjs from 'dayjs'
import { Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import ResumeCardHeader from '../resume-card-header'
import { themeColor } from '@/core/styleSheet/themeColor'
import { create, pxToDp } from '@/core/styleSheet'
import { IMAGE_PREFIX } from '@/core/constants'
import Visible from '@/core/components/Visible'

interface Props {
  data: UserProfileList
}
function ResumeEducationCard(props: Props) {
  const { data } = props
  return (
    <Visible visible={data.eduction?.length}>
      <View style={styles.container}>
        <ResumeCardHeader title="教育经历" />
        {
        data.eduction?.map((item) => {
          const startTime = dayjs(item.startTime).format('YYYY-MM')
          const endTime = dayjs(item.endTime).format('YYYY-MM')
          const totalTime = dayjs(item.endTime).diff(item.startTime, 'year') >= 1 ? `${dayjs(item.endTime).diff(item.startTime, 'year')}年` : `${dayjs(item.endTime).diff(item.startTime, 'month') || 1}月`
          return (
            <View key={item.id}>
              <Space direction="horizontal" style={styles.header}>
                <Space direction="horizontal" gap={pxToDp(32)}>
                  <FastImage
                    style={styles.logo}
                    source={{
                      uri: `${IMAGE_PREFIX}/stars.png`,
                    }}
                  />
                  <Space gap={pxToDp(20)}>
                    <Text style={styles.title}>{item.school}</Text>
                    <Text style={styles.company}>{item.profession}</Text>
                    <Text style={styles.date}>
                      {' '}
                      {`${startTime} - ${endTime}（${totalTime}）`}
                    </Text>
                    <Text style={styles.gpa}>
                      GPA:
                      {item.gpa}
                      (5.0 满)
                    </Text>
                  </Space>
                </Space>
              </Space>
              <Text style={styles.content}>
                {item.description}
              </Text>
            </View>
          )
        })
       }
      </View>
    </Visible>
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
