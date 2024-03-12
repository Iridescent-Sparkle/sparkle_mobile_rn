/*
 * @Date: 2024-03-12 16:51:31
 * @Description: C端个人总结编辑卡片
 */
import { Text } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import BaseCollapseCard from '../base-collapse-card'
import { themeColor } from '@/core/styleSheet/themeColor'
import { create, pxToDp } from '@/core/styleSheet'

function MemberSummaryCard() {
  return (
    <BaseCollapseCard title="个人总结" titleLeftExtra={<MaterialCommunityIcons name="file-document" size={pxToDp(32)} color={themeColor.primary} />}>
      <Text style={styles.content}>
        Hello, I'm Andrew.I am a designer with more
        than 5 years experience. My main fields are Ul/
        UX Design, Illustration and Graphic Design. You
        can check the portfolio on my profil
      </Text>

    </BaseCollapseCard>
  )
}

const styles = create({
  content: {
    fontSize: 28,
    lineHeight: 42,
    color: themeColor.black45,
  },
})

export default MemberSummaryCard
