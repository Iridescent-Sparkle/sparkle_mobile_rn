/*
 * @Date: 2024-03-12 16:51:31
 * @Description: C端个人信息编辑卡片
 */
import { Text } from 'react-native'
import Foundation from 'react-native-vector-icons/Foundation'
import { Card } from '@fruits-chain/react-native-xiaoshu'
import { StackActions, useNavigation } from '@react-navigation/native'
import BaseCollapseCard from '../BaseCollapseCard'
import { themeColor } from '@/core/styleSheet/themeColor'
import { create, pxToDp } from '@/core/styleSheet'

function MemberExpectedSalaryCard(props: { data: UserProfile, loading: boolean }) {
  const { data, loading } = props

  const navigation = useNavigation()

  const onAdd = () => {
    navigation.dispatch(StackActions.push('GeniusUpdateSalary', {
      isEdit: false,
    }))
  }

  const onEdit = () => {
    navigation.dispatch(StackActions.push('GeniusUpdateSalary', {
      isEdit: true,
    }))
  }

  return (
    <BaseCollapseCard title="期望薪资" titleLeftExtra={<Foundation name="graph-pie" size={pxToDp(32)} color={themeColor.primary} />} onAdd={onAdd} onEdit={onEdit} loading={loading} showContent={!!data.minSalary && !!data.maxSalary}>
      <Card>
        <Text style={styles.info}>
          { `￥${data.minSalary} - ￥${data.maxSalary} 千元/月`}
        </Text>
      </Card>
    </BaseCollapseCard>
  )
}

const styles = create({
  info: {
    fontSize: 32,
    fontWeight: '600',
    color: themeColor.black65,
  },
})

export default MemberExpectedSalaryCard
