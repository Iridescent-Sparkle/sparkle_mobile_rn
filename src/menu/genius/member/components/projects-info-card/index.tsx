/*
 * @Date: 2024-03-12 16:51:31
 * @Description: C端项目经历编辑卡片
 */
import { Card, Space } from '@fruits-chain/react-native-xiaoshu'
import { Text, View } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import BaseCollapseCard from '../base-collapse-card'
import { themeColor } from '@/core/styleSheet/themeColor'
import { create, pxToDp } from '@/core/styleSheet'

function MemberProjectsInfoCard() {
  return (
    <BaseCollapseCard title="项目经历" titleLeftExtra={<MaterialCommunityIcons name="chart-box" size={pxToDp(32)} color={themeColor.primary} />}>
      <Card>
        <Space direction="horizontal" style={styles.header}>
          <Space direction="horizontal" gap={pxToDp(32)}>
            <View style={styles.logo}>
              <MaterialCommunityIcons name="chart-box" size={pxToDp(64)} color={themeColor.primary} />
            </View>
            <Space gap={pxToDp(20)}>
              <Text style={styles.title}>Event Booking App</Text>
              <Text style={styles.company}>Interaction Designer</Text>
              <Text style={styles.date}>May 2022 - Sept 2022 (4 months)</Text>
              <View style={styles.button}>
                <Text style={styles.buttonText}>展示项目</Text>
                <FontAwesome5 name="telegram-plane" size={pxToDp(32)} color={themeColor.primary} />
              </View>
            </Space>
          </Space>
          <FontAwesome6 name="pen-to-square" size={pxToDp(32)} color={themeColor.primary} />
        </Space>
      </Card>
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
