/*
 * @Date: 2024-03-12 16:51:31
 * @Description: C端项目经历编辑卡片
 */
import { Card, Space, Toast } from '@fruits-chain/react-native-xiaoshu'
import { Linking, Pressable, Text, View } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { StackActions, useNavigation } from '@react-navigation/native'
import dayjs from 'dayjs'
import BaseCollapseCard from '../base-collapse-card'
import { themeColor } from '@/core/styleSheet/themeColor'
import { create, pxToDp } from '@/core/styleSheet'
import Visible from '@/core/components/Visible'

function MemberProjectsInfoCard(props: { data: UserProject[], loading: boolean }) {
  const { data, loading } = props

  const navigation = useNavigation()

  const onAdd = () => {
    navigation.dispatch(StackActions.push('GeniusUpdateProject', {
      isEdit: false,
    }))
  }

  const onEdit = (id: number) => {
    navigation.dispatch(StackActions.push('GeniusUpdateProject', {
      isEdit: true,
      id,
    }))
  }

  const handleShowClick = async (url: string) => {
    const supported = await Linking.canOpenURL(url)

    if (supported)
      await Linking.openURL(url)
    else
      Toast.fail('无法打开该链接')
  }

  return (
    <BaseCollapseCard title="项目经历" titleLeftExtra={<MaterialCommunityIcons name="chart-box" size={pxToDp(32)} color={themeColor.primary} />} onAdd={onAdd} loading={loading} showContent={!!data.length}>
      <View>
        {
          data.map((item) => {
            const startTime = dayjs(item.startTime).format('YYYY-MM')
            const endTime = dayjs(item.endTime).format('YYYY-MM')
            const totalTime = dayjs(item.endTime).diff(item.startTime, 'year') >= 1 ? `${dayjs(item.endTime).diff(item.startTime, 'year')}年` : `${dayjs(item.endTime).diff(item.startTime, 'month') || 1}月`
            return (
              <Card key={item.id}>
                <Space direction="horizontal" style={styles.header}>
                  <Space direction="horizontal" gap={pxToDp(32)}>
                    <View style={styles.logo}>
                      <MaterialCommunityIcons name="chart-box" size={pxToDp(64)} color={themeColor.primary} />
                    </View>
                    <Space gap={pxToDp(20)}>
                      <Text style={styles.title}>{item.projectName}</Text>
                      <Text style={styles.company}>{item.role}</Text>
                      <Text style={styles.date}>{`${startTime} - ${endTime}（${totalTime}）`}</Text>
                      <Visible visible={item.website}>
                        <Pressable style={styles.button} onPress={() => handleShowClick(item.website)}>
                          <Text style={styles.buttonText}>展示项目</Text>
                          <FontAwesome5 name="telegram-plane" size={pxToDp(32)} color={themeColor.primary} />
                        </Pressable>
                      </Visible>
                    </Space>
                  </Space>
                  <FontAwesome6 name="pen-to-square" size={pxToDp(32)} color={themeColor.primary} onPress={() => onEdit(item.id)} />
                </Space>
              </Card>
            )
          })
        }
      </View>
    </BaseCollapseCard>
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
})

export default MemberProjectsInfoCard
