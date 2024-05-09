import { Button } from '@fruits-chain/react-native-xiaoshu'
import { StackActions, useFocusEffect, useNavigation } from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
import { FlatList, Text, View } from 'react-native'
import type { barDataItem, pieDataItem } from 'react-native-gifted-charts'
import { BarChart, PieChart } from 'react-native-gifted-charts'
import ConsumeListCard from './components/ConsumeListCard'
import { themeColor } from '@/core/styleSheet/themeColor'
import { create, pxToDp } from '@/core/styleSheet'
import { request } from '@/core/api'
import { useUserStore } from '@/store/user'

export default function IntegralList() {
  const userStore = useUserStore()
  const navigation = useNavigation()
  const [consumeList, setConsumeList] = useState([] as IntegralRecord[])

  const [pieData, setPieData] = useState([] as pieDataItem[])
  const [barData, setBarData] = useState([] as barDataItem[])
  const [selectPie, setSelectPie] = useState({})
  const getInitData = async () => {
    try {
      const [{ data: consumeListData }, { data: pieData }, { data: barData }] = await Promise.all([
        request.post({}, {
          url: `/boss/consume/user`,
        }),
        request.post({}, {
          url: `/boss/consume/usage/type`,
        }),
        request.post({}, {
          url: `/boss/consume/usage/days`,
        }),
      ])
      setConsumeList(consumeListData)
      const formatPieData = pieData.map((item: any) => ({ value: Number(item.totalIntegral), color: PIE_DATA_MAP[item.type].color, text: PIE_DATA_MAP[item.type].label }))
      setPieData(formatPieData)
      setBarData(barData.map((item: any) => ({ ...item, frontColor: '#177AD5' })))
      setSelectPie(formatPieData[0])
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

  const PIE_DATA_MAP = {
    publish: { color: '#006DFF', label: '发布职位' },
    chat: { color: '#79D2DE', label: '发起聊天' },
    recharge: { color: '#ED6665', label: '充值积分' },
  } as Record<string, any>

  const pieTotal = pieData.reduce((acc, cur) => acc + cur.value, 0)

  const renderDot = (color) => {
    return (
      <View
        style={{
          height: 10,
          width: 10,
          borderRadius: 5,
          backgroundColor: color,
          marginRight: 10,
        }}
      />
    )
  }
  const renderLegendComponent = () => {
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 10,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: 120,
              marginRight: 20,
            }}
          >
            {renderDot('#006DFF')}
            <Text style={{ color: themeColor.black85 }}>发布职位</Text>
          </View>
          <View
            style={{ flexDirection: 'row', alignItems: 'center', width: 120 }}
          >
            {renderDot('#79D2DE')}
            <Text style={{ color: themeColor.black85 }}>发起聊天</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: 120,
              marginRight: 20,
            }}
          >
            {renderDot('#ED6665')}
            <Text style={{ color: themeColor.black85 }}>充值积分</Text>
          </View>
        </View>
      </>
    )
  }
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
          {
            pieData && (
              <View style={styles.pieWrapper}>
                <Text style={styles.title}>积分使用分布情况</Text>
                <PieChart
                  data={pieData}
                  textColor="black"
                  radius={pxToDp(200)}
                  textSize={pxToDp(24)}
                  showValuesAsLabels
                  showTextBackground
                  onPress={(value) => { setSelectPie(value) }}
                  centerLabelComponent={() => {
                    return (
                      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text
                          style={{ fontSize: 22, color: themeColor.black85, fontWeight: 'bold' }}
                        >
                          {`${Number(selectPie.value) / Number(pieTotal) * 100}%`}
                        </Text>
                        <Text style={{ fontSize: 14, color: themeColor.black85 }}>{selectPie.text}</Text>
                      </View>
                    )
                  }}
                  textBackgroundRadius={pxToDp(26)}
                />
                <View style={{ marginTop: 20 }}>
                  {renderLegendComponent()}
                </View>
              </View>
            )
          }
          {/* 折线图 */}
          {
            barData && (
              <View style={styles.barWrapper}>
                <Text style={styles.title}>近七日积分使用情况</Text>
                <BarChart
                  barWidth={pxToDp(36)}
                  barBorderRadius={pxToDp(24)}
                  frontColor="lightgray"
                  data={barData}
                  showXAxisIndices
                  showYAxisIndices
                  yAxisTextStyle={{ color: 'black' }}
                  xAxisLabelTextStyle={{ color: 'black' }}
                  yAxisThickness={0}
                  xAxisThickness={0}
                />
              </View>
            )
          }
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
  title: {
    color: themeColor.black85,
    fontWeight: '700',
    fontSize: 32,
    marginBottom: 24,
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
