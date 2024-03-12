/*
 * @Date: 2024-03-12 16:51:31
 * @Description: C端个人信息编辑卡片
 */
import { Card, Space } from '@fruits-chain/react-native-xiaoshu'
import { Text } from 'react-native'
import FastImage from 'react-native-fast-image'
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import BaseCollapseCard from '../base-collapse-card'
import { themeColor } from '@/core/styleSheet/themeColor'
import { create, pxToDp } from '@/core/styleSheet'
import { IMAGE_PREFIX } from '@/core/constants'

function MemberEducationInfoCard() {
  return (
    <BaseCollapseCard title="教育经历" titleLeftExtra={<Entypo name="graduation-cap" size={pxToDp(32)} color={themeColor.primary} />}>
      <Card>
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
})

export default MemberEducationInfoCard
