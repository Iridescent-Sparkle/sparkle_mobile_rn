/*
 * @Date: 2024-03-12 16:51:31
 * @Description: C端信息编辑基础卡片
 */
import { Card } from '@fruits-chain/react-native-xiaoshu'
import type { ReactElement, ReactNode } from 'react'
import { Text, View } from 'react-native'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import { themeColor } from '@/core/styleSheet/themeColor'
import { create, pxToDp } from '@/core/styleSheet'

interface Props {
  title: string
  titleLeftExtra: ReactNode
  children: ReactElement
  loading: boolean
  showContent: boolean
  onAdd: () => void
  onEdit?: () => void
}

function BaseCollapseCard(props: Props) {
  const { title, children, titleLeftExtra, loading, showContent, onAdd, onEdit } = props

  return (
    <View style={styles.container}>
      <Card loading={loading}>
        <View style={[styles.titleWrapper, { borderBottomWidth: showContent ? pxToDp(4) : 0, paddingBottom: showContent ? pxToDp(16) : 0 }]}>
          <View style={styles.title}>
            <View>{titleLeftExtra}</View>
            <Text style={styles.titleText}>{title}</Text>
          </View>
          {showContent && onEdit
            ? <FontAwesome6 name="pen-to-square" size={pxToDp(32)} color={themeColor.primary} onPress={onEdit} />
            : <FontAwesome6 name="add" size={pxToDp(32)} color={themeColor.primary} onPress={onAdd} />}
        </View>
        <>{showContent ? <children.type {...children.props} /> : null}</>
      </Card>
    </View>
  )
}

const styles = create({
  container: {
    borderRadius: 32,
    borderWidth: 4,
    borderColor: '#F1F1F1',
    overflow: 'hidden',
    marginBottom: 32,
  },
  titleWrapper: {
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#F1F1F1',
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 32,
  },
  titleText: {
    fontSize: 36,
    fontWeight: '700',
    color: themeColor.black85,
  },
})

export default BaseCollapseCard
