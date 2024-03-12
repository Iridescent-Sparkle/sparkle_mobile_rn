/*
 * @Date: 2024-03-12 16:51:31
 * @Description: C端个人信息编辑卡片
 */
import { Text, View } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import BaseCollapseCard from '../base-collapse-card'
import { themeColor } from '@/core/styleSheet/themeColor'
import { create, pxToDp } from '@/core/styleSheet'

function MemberVolunteerInfoCard() {
  return (
    <BaseCollapseCard title="志愿活动经历" titleLeftExtra={<FontAwesome6 name="user-group" size={pxToDp(32)} color={themeColor.primary} />}>
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

export default MemberVolunteerInfoCard
