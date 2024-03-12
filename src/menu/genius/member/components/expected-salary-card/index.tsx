/*
 * @Date: 2024-03-12 16:51:31
 * @Description: C端个人信息编辑卡片
 */
import { Text } from 'react-native'
import Foundation from 'react-native-vector-icons/Foundation'
import { Card } from '@fruits-chain/react-native-xiaoshu'
import BaseCollapseCard from '../base-collapse-card'
import { themeColor } from '@/core/styleSheet/themeColor'
import { create, pxToDp } from '@/core/styleSheet'

function MemberExpectedSalaryCard() {
  return (
    <BaseCollapseCard title="期望薪资" titleLeftExtra={<Foundation name="graph-pie" size={pxToDp(32)} color={themeColor.primary} />}>
      <Card>
        <Text style={styles.info}>
          $10,000 - $25,000/month
        </Text>
      </Card>
    </BaseCollapseCard>
  )
}

const styles = create({
  info: {
    fontSize: 32,
    fontWeight: '600',
    color: themeColor.black85,
  },
})

export default MemberExpectedSalaryCard
