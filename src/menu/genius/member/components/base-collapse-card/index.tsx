/*
 * @Date: 2024-03-12 16:51:31
 * @Description: C端信息编辑基础卡片
 */
import { Card } from '@fruits-chain/react-native-xiaoshu'
import type { ReactNode } from 'react'
import { View } from 'react-native'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import { themeColor } from '@/core/styleSheet/themeColor'
import { create, pxToDp } from '@/core/styleSheet'

interface Props {
  title: string
  titleLeftExtra: ReactNode
  children: ReactNode
}

function BaseCollapseCard(props: Props) {
  const { title, children, titleLeftExtra } = props

  return (
    <View style={styles.container}>
      <Card
        loading={false}
        titleLeftExtra={titleLeftExtra}
        title={title}
        titleTextStyle={styles.titleText}
        extra={false
          ? <FontAwesome6 name="pen-to-square" size={pxToDp(32)} color={themeColor.primary} />
          : <FontAwesome6 name="add" size={pxToDp(32)} color={themeColor.primary} />}
      >
        {children}
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
  titleText: {
    fontSize: 36,
    fontWeight: '700',
    color: themeColor.black85,
  },
})

export default BaseCollapseCard
