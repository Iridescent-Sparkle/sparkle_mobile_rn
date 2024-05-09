import { Space, Toast } from '@fruits-chain/react-native-xiaoshu'
import { Linking, Pressable, Text, View } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import dayjs from 'dayjs'
import ResumeCardHeader from '../ResumeCardHeader'
import { themeColor } from '@/core/styleSheet/themeColor'
import { create, pxToDp } from '@/core/styleSheet'
import Visible from '@/core/components/Visible'

interface Props {
  data: UserProfileList
}
function ResumeProjectsInfoCard(props: Props) {
  const { data } = props
  const handleDisplayProject = async (url: string) => {
    const supported = await Linking.canOpenURL(url)

    if (supported)
      await Linking.openURL(url)
    else
      Toast.fail('无法打开该链接')
  }
  return (
    <Visible visible={data.project?.length}>
      <View style={styles.container}>
        <ResumeCardHeader title="项目经历" />
        {
        data.project?.map((item) => {
          const startTime = dayjs(item.startTime).format('YYYY-MM')
          const endTime = dayjs(item.endTime).format('YYYY-MM')
          const totalTime = dayjs(item.endTime).diff(item.startTime, 'year') >= 1 ? `${dayjs(item.endTime).diff(item.startTime, 'year')}年` : `${dayjs(item.endTime).diff(item.startTime, 'month') || 1}月`
          return (
            <View key={item.id}>
              <Space direction="horizontal" style={styles.header}>
                <Space direction="horizontal" gap={pxToDp(32)}>
                  <View style={styles.logo}>
                    <MaterialCommunityIcons name="chart-box" size={pxToDp(64)} color={themeColor.primary} />
                  </View>
                  <Space gap={pxToDp(20)}>
                    <Text style={styles.title}>{item.projectName}</Text>
                    <Text style={styles.company}>{item.role}</Text>
                    <Text style={styles.date}>
                      {`${startTime} - ${endTime}（${totalTime}）`}
                    </Text>
                    <Pressable onPress={() => handleDisplayProject(item.website)} style={styles.button}>
                      <Text style={styles.buttonText}>展示项目</Text>
                      <FontAwesome5 name="telegram-plane" size={pxToDp(32)} color={themeColor.primary} />
                    </Pressable>
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
  button: {
    width: 224,
    height: 72,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    borderRadius: 48,
    borderWidth: 4,
    borderColor: themeColor.primary,
  },
  buttonText: {
    color: themeColor.primary,
  },
  content: {
    fontSize: 28,
    lineHeight: 42,
    color: themeColor.black65,
    paddingTop: 16,
  },
})

export default ResumeProjectsInfoCard
