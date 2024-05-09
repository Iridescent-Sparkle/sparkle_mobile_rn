import { Space } from '@fruits-chain/react-native-xiaoshu'
import dayjs from 'dayjs'
import { Text, View } from 'react-native'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import ResumeCardHeader from '../ResumeCardHeader'
import { themeColor } from '@/core/styleSheet/themeColor'
import { create, pxToDp } from '@/core/styleSheet'
import Visible from '@/core/components/Visible'

interface Props {
  data: UserProfileList
}
function ResumeVolunteerInfoCard(props: Props) {
  const { data } = props
  return (
    <Visible visible={data.volunteer?.length}>
      <ResumeCardHeader title="志愿活动经历" />
      {
          data.volunteer?.map((item) => {
            const startTime = dayjs(item.startTime).format('YYYY-MM')
            const endTime = dayjs(item.endTime).format('YYYY-MM')
            const totalTime = dayjs(item.endTime).diff(item.startTime, 'year') >= 1 ? `${dayjs(item.endTime).diff(item.startTime, 'year')}年` : `${dayjs(item.endTime).diff(item.startTime, 'month') || 1}月`
            return (
              <View key={item.id}>
                <Space direction="horizontal" style={styles.header}>
                  <Space direction="horizontal" gap={pxToDp(32)}>
                    <View style={styles.logo}>
                      <FontAwesome6 name="user-group" size={pxToDp(42)} color={themeColor.primary} />
                    </View>
                    <Space gap={pxToDp(20)}>
                      <Text style={styles.title}>{item.activityName}</Text>
                      <Text style={styles.company}>{item.role}</Text>
                      <Text style={styles.date}>
                        {`${startTime} - ${endTime}（${totalTime}）`}
                      </Text>
                    </Space>
                  </Space>

                </Space>
                <Text style={styles.content}>
                  {data.summary}
                </Text>
              </View>
            )
          })
        }
    </Visible>
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
