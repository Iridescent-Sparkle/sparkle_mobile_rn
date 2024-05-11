import { Space } from '@fruits-chain/react-native-xiaoshu'
import dayjs from 'dayjs'
import { Text, View } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'
import ResumeCardHeader from '../ResumeCardHeader'
import { useJobStore } from '@/store/job'
import { themeColor } from '@/core/styleSheet/themeColor'
import { create, pxToDp } from '@/core/styleSheet'
import Visible from '@/core/components/Visible'

interface Props {
  data: UserProfileList
}
function ResumeEducationCard(props: Props) {
  const { data } = props

  const jobStore = useJobStore()

  return (
    <Visible visible={data.education?.length}>
      <View style={styles.container}>
        <ResumeCardHeader title="教育经历" />
        {
          data.education?.map((item) => {
            const startTime = dayjs(item.startTime).format('YYYY-MM')
            const endTime = dayjs(item.endTime).format('YYYY-MM')
            const totalTime = dayjs(item.endTime).diff(item.startTime, 'year') >= 1 ? `${dayjs(item.endTime).diff(item.startTime, 'year')}年` : `${dayjs(item.endTime).diff(item.startTime, 'month') || 1}月`
            return (
              <View key={item.id}>
                <Space direction="horizontal" style={styles.header}>
                  <Space direction="horizontal" gap={pxToDp(32)}>
                    <View style={styles.logo}>
                      <Entypo name="graduation-cap" size={pxToDp(64)} color={themeColor.primary} />
                    </View>
                    <Space gap={pxToDp(20)}>
                      <Text style={styles.title}>{item.school}</Text>
                      <Space direction="horizontal" gap={pxToDp(20)}>
                        <Text style={styles.company}>{item.profession}</Text>
                        <Text style={styles.company}>{jobStore.jobEducationOptions?.find(option => option.value === item.educationLevel)?.label}</Text>
                      </Space>
                      <Text style={styles.date}>
                        {`${startTime} - ${endTime}（${totalTime}）`}
                      </Text>
                      <Text style={styles.gpa}>
                        GPA:
                        {item.gpa}
                        /5.0
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
    alignItems: 'center',
    justifyContent: 'center',
    width: 124,
    height: 124,
    borderRadius: 62,
    backgroundColor: themeColor.hazy,
  },
  content: {
    fontSize: 28,
    lineHeight: 42,
    color: themeColor.black65,
    paddingTop: 16,
  },
})

export default ResumeEducationCard
