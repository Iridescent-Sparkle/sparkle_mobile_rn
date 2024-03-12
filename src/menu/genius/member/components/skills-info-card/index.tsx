/*
 * @Date: 2024-03-12 16:51:31
 * @Description: C端个人信息编辑卡片
 */
import { Text, View } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import BaseCollapseCard from '../base-collapse-card'
import { themeColor } from '@/core/styleSheet/themeColor'
import { create, pxToDp } from '@/core/styleSheet'

function MemberSkillsInfoCard() {
  return (
    <BaseCollapseCard title="拥有的技能" titleLeftExtra={<Entypo name="pie-chart" size={pxToDp(32)} color={themeColor.primary} />}>
      <View style={styles.info}>
        <Ionicons name="location-outline" size={pxToDp(36)} color="black" />
        <Text>
          New York. United States
        </Text>
      </View>
      <View style={styles.info}>
        <Feather name="phone" size={pxToDp(36)} color="black" />
        <Text>
          +1 111 467 378 399
        </Text>
      </View>
      <View style={styles.info}>
        <MaterialCommunityIcons name="email-outline" size={pxToDp(36)} color="black" />
        <Text>
          andrew_ainsley@yourdomain.com
        </Text>
      </View>
    </BaseCollapseCard>
  )
}

const styles = create({
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 32,
    height: 56,
    color: themeColor.black65,
  },
})

export default MemberSkillsInfoCard
