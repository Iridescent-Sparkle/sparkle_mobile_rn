/*
 * @Date: 2024-03-12 16:51:31
 * @Description: C端工作经历卡片
 */
import { Card, Space } from '@fruits-chain/react-native-xiaoshu'
import { Text } from 'react-native'
import FastImage from 'react-native-fast-image'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import BaseCollapseCard from '../base-collapse-card'
import { themeColor } from '@/core/styleSheet/themeColor'
import { create, pxToDp } from '@/core/styleSheet'
import { IMAGE_PREFIX } from '@/core/constants'

function MemberWorkExperienceCard() {
  return (
    <BaseCollapseCard title="工作经历" titleLeftExtra={<MaterialCommunityIcons name="briefcase-variant" size={pxToDp(32)} color={themeColor.primary} />}>
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
              <Text style={styles.date}>
                May 2019 - June 2021 (2 years)
              </Text>
            </Space>
          </Space>
          <FontAwesome6 name="pen-to-square" size={pxToDp(32)} color={themeColor.primary} />
        </Space>
      </Card>
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
              <Text style={styles.date}>
                May 2019 - June 2021 (2 years)
              </Text>
            </Space>
          </Space>
          <FontAwesome6 name="pen-to-square" size={pxToDp(32)} color={themeColor.primary} />
        </Space>
      </Card>
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
              <Text style={styles.date}>
                May 2019 - June 2021 (2 years)
              </Text>
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
  logo: {
    width: 116,
    height: 116,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: themeColor.black12,
  },
})

export default MemberWorkExperienceCard
