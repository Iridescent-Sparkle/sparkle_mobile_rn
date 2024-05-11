/*
 * @Date: 2024-03-12 16:51:31
 * @Description: C端个人优势编辑卡片
 */
import { Text } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Card } from '@fruits-chain/react-native-xiaoshu'
import { StackActions, useNavigation } from '@react-navigation/native'
import BaseCollapseCard from '../BaseCollapseCard'
import { themeColor } from '@/core/styleSheet/themeColor'
import { create, pxToDp } from '@/core/styleSheet'

interface Props {
  data: UserProfile
  loading: boolean
}
function MemberSummaryCard(props: Props) {
  const { data, loading } = props

  const navigation = useNavigation()

  const onAdd = () => {
    navigation.dispatch(StackActions.push('GeniusUpdateSummary', {
      isEdit: false,
    }))
  }

  const onEdit = () => {
    navigation.dispatch(StackActions.push('GeniusUpdateSummary', {
      isEdit: true,
    }))
  }

  return (
    <BaseCollapseCard title="个人优势" titleLeftExtra={<MaterialCommunityIcons name="file-document" size={pxToDp(32)} color={themeColor.primary} />} onAdd={onAdd} onEdit={onEdit} loading={loading} showContent={!!data.summary}>
      <Card>
        <Text style={styles.content}>
          {data.summary}
        </Text>
      </Card>
    </BaseCollapseCard>
  )
}

const styles = create({
  content: {
    fontSize: 28,
    lineHeight: 42,
    color: themeColor.black65,
  },
})

export default MemberSummaryCard
