/*
 * @Date: 2024-03-12 16:51:31
 * @Description: C端个人信息编辑卡片
 */
import { Card, Space } from '@fruits-chain/react-native-xiaoshu'
import { StackActions, useNavigation } from '@react-navigation/native'
import dayjs from 'dayjs'
import { Pressable, Text, View } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import BaseCollapseCard from '../BaseCollapseCard'
import { themeColor } from '@/core/styleSheet/themeColor'
import { create, pxToDp } from '@/core/styleSheet'
import { useJobStore } from '@/store/job'

function MemberEducationInfoCard(props: { data: UserEducation[], loading: boolean }) {
  const { data, loading } = props

  const jobStore = useJobStore()

  const navigation = useNavigation()

  const onAdd = () => {
    navigation.dispatch(StackActions.push('GeniusUpdateEducation', {
      isEdit: false,
    }))
  }

  const onEdit = (id: number) => {
    navigation.dispatch(StackActions.push('GeniusUpdateEducation', {
      isEdit: true,
      id,
    }))
  }

  return (
    <BaseCollapseCard title="教育经历" titleLeftExtra={<Entypo name="graduation-cap" size={pxToDp(32)} color={themeColor.primary} />} onAdd={onAdd} loading={loading} showContent={!!data.length}>
      <View>
        {
          data.map((item) => {
            return (
              <Card key={item.id}>
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
                      <Text style={styles.gpa}>
                        绩点:
                        {item.gpa}
                        /5.0
                      </Text>
                    </Space>
                  </Space>
                  <Pressable hitSlop={pxToDp(50)} onPress={() => onEdit(item.id)}>
                    <FontAwesome6 name="pen-to-square" size={pxToDp(32)} color={themeColor.primary} />
                  </Pressable>
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
})

export default MemberEducationInfoCard
