/*
 * @Date: 2024-03-12 16:51:31
 * @Description: C端联系信息编辑卡片
 */
import { Text, View } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Card } from '@fruits-chain/react-native-xiaoshu'
import { StackActions, useNavigation } from '@react-navigation/native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import BaseCollapseCard from '../base-collapse-card'
import { themeColor } from '@/core/styleSheet/themeColor'
import { create, pxToDp } from '@/core/styleSheet'
import Visible from '@/core/components/Visible'

interface Props {
  data: UserProfile
  loading: boolean
}
function MemberContactInfoCard(props: Props) {
  const { data, loading } = props
  const navigation = useNavigation()

  const onAdd = () => {
    navigation.dispatch(StackActions.push('GeniusUpdateContact', {
      isEdit: false,
    }))
  }

  const onEdit = () => {
    navigation.dispatch(StackActions.push('GeniusUpdateContact', {
      isEdit: true,
    }))
  }

  return (
    <BaseCollapseCard title="联系信息" titleLeftExtra={<AntDesign name="contacts" size={pxToDp(36)} color={themeColor.primary} />} loading={loading} showContent={data.address || data.phone || data.email} onAdd={onAdd} onEdit={onEdit}>
      <Card>
        <Visible visible={!!data.address}>
          <View style={styles.info}>
            <Ionicons name="location-outline" size={pxToDp(36)} color="black" />
            <Text style={styles.text}>
              {data.address || ''}
            </Text>
          </View>
        </Visible>
        <Visible visible={!!data.phone}>
          <View style={styles.info}>
            <Feather name="phone" size={pxToDp(36)} color="black" />
            <Text style={styles.text}>
              {data.phone || ''}
            </Text>
          </View>
        </Visible>
        <Visible visible={!!data.email}>
          <View style={styles.info}>
            <MaterialCommunityIcons name="email-outline" size={pxToDp(36)} color="black" />
            <Text style={styles.text}>
              {data.email || ''}
            </Text>
          </View>
        </Visible>
      </Card>
    </BaseCollapseCard>
  )
}

const styles = create({
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 32,
    height: 56,
  },
  text: {
    color: themeColor.black65,
    fontWeight: '700',
  },
})

export default MemberContactInfoCard
