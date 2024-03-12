/*
 * @Date: 2024-03-12 16:51:31
 * @Description: C端信息编辑基础卡片
 */
import { Button, Card } from '@fruits-chain/react-native-xiaoshu'
import type { ReactNode } from 'react'
import { View } from 'react-native'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Foundation from 'react-native-vector-icons/Foundation'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import { create, pxToDp } from '@/core/styleSheet'
import { themeColor } from '@/core/styleSheet/themeColor'

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
        // titleLeftExtra={<FontAwesome name="user" size={pxToDp(32)} color={themeColor.primary} />}
        // titleLeftExtra={<MaterialCommunityIcons name="file-document" size={pxToDp(32)} color={themeColor.primary} />}
        // titleLeftExtra={<Foundation name="graph-pie" size={pxToDp(32)} color={themeColor.primary} />}
        // titleLeftExtra={<MaterialCommunityIcons name="briefcase-variant" size={pxToDp(32)} color={themeColor.primary} />}
        // titleLeftExtra={<Entypo name="graduation-cap" size={pxToDp(32)} color={themeColor.primary} />}
        // titleLeftExtra={<MaterialCommunityIcons name="chart-box" size={pxToDp(32)} color={themeColor.primary} />}
        // titleLeftExtra={<FontAwesome6 name="user-group" size={pxToDp(32)} color={themeColor.primary} />}
        // titleLeftExtra={<Entypo name="pie-chart" size={pxToDp(32)} color={themeColor.primary} />}
        // titleLeftExtra={<FontAwesome6 name="file-contract" size={pxToDp(32)} color={themeColor.primary} />}
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
    color: '#393939',
  },
})

export default BaseCollapseCard
