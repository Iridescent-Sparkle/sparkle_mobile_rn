/*
 * @Date: 2024-03-12 16:51:31
 * @Description: C端个人信息编辑卡片
 */
import { Tag } from '@fruits-chain/react-native-xiaoshu'
import { View } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'
import BaseCollapseCard from '../base-collapse-card'
import { themeColor } from '@/core/styleSheet/themeColor'
import { create, pxToDp } from '@/core/styleSheet'

function MemberSkillsInfoCard() {
  return (
    <BaseCollapseCard title="拥有的技能" titleLeftExtra={<Entypo name="pie-chart" size={pxToDp(32)} color={themeColor.primary} />}>
      <View style={styles.card}>
        <Tag type="ghost" color={themeColor.primary} size="l" innerStyle={styles.tag}>
          New York  New York
        </Tag>
        <Tag type="ghost" color={themeColor.primary} size="l" innerStyle={styles.tag}>
          New York.
        </Tag>
        <Tag type="ghost" color={themeColor.primary} size="l" innerStyle={styles.tag}>
          New York
        </Tag>
        <Tag type="ghost" color={themeColor.primary} size="l" innerStyle={styles.tag}>
          New York.
        </Tag>
      </View>
    </BaseCollapseCard>
  )
}

const styles = create({
  card: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: 24,
  },
  tag: {
    borderRadius: 60,
    borderWidth: 4,
    height: 64,
    paddingHorizontal: 24,
  },
})

export default MemberSkillsInfoCard
