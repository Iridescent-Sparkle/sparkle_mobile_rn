import { Button } from '@fruits-chain/react-native-xiaoshu'
import { StackActions, useFocusEffect, useNavigation } from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
import { FlatList, Text, View } from 'react-native'
import { BarChart, PieChart } from 'react-native-gifted-charts'
import ConsumeListCard from './components/consume-list-card'
import { themeColor } from '@/core/styleSheet/themeColor'
import { create, pxToDp } from '@/core/styleSheet'
import { request } from '@/core/api'
import { useUserStore } from '@/store/user'

export default function IntegralList() {
  const userStore = useUserStore()
  const navigation = useNavigation()
  const [consumeList, setConsumeList] = useState([] as IntegralRecord[])
  const getInitData = async () => {
    try {
      const { data: consumeListData } = await request.post({}, {
        url: `/boss/consume/user`,
      })
      setConsumeList(consumeListData)
    }
    catch (error) {

    }
  }

  useFocusEffect(useCallback(() => {
    getInitData()
  }, []))
  const handleRechargeClick = () => {
    navigation.dispatch(StackActions.replace('RechargeIntegral'))
  }

  const pieData = [
    { value: 54, color: '#177AD5' },
    { value: 40, color: '#79D2DE' },
    { value: 20, color: '#ED6665' },
  ]

  const barData = [
    { value: 250, label: 'M' },
    { value: 500, label: 'T', frontColor: '#177AD5' },
    { value: 745, label: 'W', frontColor: '#177AD5' },
    { value: 320, label: 'T' },
    { value: 600, label: 'F', frontColor: '#177AD5' },
    { value: 256, label: 'S' },
    { value: 300, label: 'S' },
  ]
  return (
    <FlatList
      style={styles.container}
      ListHeaderComponent={(
        <>
          {/* 标题 */}
          <View style={styles.header}>
            <View>
              <Text style={styles.headerTitle}>
                {`当前积分 ${userStore.userInfo.integral}`}
              </Text>
              <Text style={styles.headerDesc}>积分可用于发布职位、发起聊天</Text>
            </View>
            <Button onPress={handleRechargeClick} type="hazy" style={styles.headerButton} size="s">去充值</Button>
          </View>
          {/* 饼图 */}
          <View style={styles.pieWrapper}>
            <PieChart
              data={pieData}
              showText
              textColor="black"
              radius={pxToDp(200)}
              textSize={pxToDp(24)}
              focusOnPress
              showValuesAsLabels
              showTextBackground
              textBackgroundRadius={pxToDp(26)}
            />
          </View>
          {/* 折线图 */}
          <View style={styles.barWrapper}>
            <BarChart
              barWidth={pxToDp(36)}
              barBorderRadius={pxToDp(24)}
              frontColor="lightgray"
              data={barData}
              yAxisThickness={0}
              xAxisThickness={0}
            />
          </View>
        </>
      )}
      data={consumeList}
      renderItem={item => (
        <ConsumeListCard data={item.item}></ConsumeListCard>
      )}
    />

  )
}

const styles = create({
  container: {
    backgroundColor: '#F5F6FA',
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 32,
    marginVertical: 24,
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    color: themeColor.primary,
    fontWeight: '700',
    fontSize: 36,
  },
  headerDesc: {
    color: themeColor.black65,
  },
  headerButton: {
    borderRadius: 48,
  },
  pieWrapper: {
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 32,
    backgroundColor: '#FFFFFF',
  },
  barWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    marginVertical: 24,
    paddingVertical: 32,
    backgroundColor: '#FFFFFF',
  },
})
