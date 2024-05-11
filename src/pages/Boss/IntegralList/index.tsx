import { Button, Loading, Toast } from '@fruits-chain/react-native-xiaoshu'
import { StackActions, useFocusEffect, useNavigation } from '@react-navigation/native'
import React, { Fragment, useCallback, useRef, useState } from 'react'
import { FlatList, Text, View } from 'react-native'
import type { barDataItem, pieDataItem } from 'react-native-gifted-charts'
import { BarChart, PieChart } from 'react-native-gifted-charts'
import ConsumeListCard from './components/ConsumeListCard'
import { themeColor } from '@/core/styleSheet/themeColor'
import { create, pxToDp } from '@/core/styleSheet'
import { request } from '@/core/api'
import { useUserStore } from '@/store/user'
import Page from '@/core/components/Page'
import { useRefState } from '@/core/hooks/useRefState'

export default function IntegralList() {
  const userStore = useUserStore()

  const navigation = useNavigation()

  const [consumeList, setConsumeList] = useState([] as IntegralRecord[])

  const [pieData, setPieData] = useState([] as pieDataItem[])

  const [barData, setBarData] = useState([] as barDataItem[])

  const [selectPie, setSelectPie] = useState({})

  const [loading, setLoading, getLoading] = useRefState(false)

  const [isLoadEnd, setIsLoadEnd, getIsLoaded] = useRefState(false)

  const currentPage = useRef(1)

  const getInitData = async () => {
    try {
      const [{ data: consumeListData }, { data: pieData }, { data: barData }] = await Promise.all([
        request.post({
          current: currentPage.current,
          pageSize: 5,
        }, {
          url: `/boss/consume/user`,
        }),
        request.post({}, {
          url: `/boss/consume/usage/type`,
        }),
        request.post({}, {
          url: `/boss/consume/usage/days`,
        }),
      ])
      currentPage.current += 1
      setConsumeList(consumeListData)
      const formatPieData = pieData.map((item: any) => ({ value: Number(item.totalIntegral), color: PIE_DATA_MAP[item.type].color, text: PIE_DATA_MAP[item.type].label }))
      setPieData(formatPieData)
      setBarData(barData.map((item: any) => ({ ...item, frontColor: '#177AD5' })))
      setSelectPie(formatPieData[0])
    }
    catch (error) {

    }
  }

  const onReachBottom = async () => {
    if (getLoading() || getIsLoaded()) {
      return
    }

    try {
      setLoading(true)

      const { data: { data: consumeListData, total } } = await request.post({
        current: currentPage.current,
        pageSize: 5,
      }, {
        url: `/boss/consume/user`,
      })

      setConsumeList([...consumeList, ...consumeListData])

      if (currentPage.current * 5 >= total) {
        setIsLoadEnd(true)
        return
      }
      setIsLoadEnd(false)
      currentPage.current += 1
    }
    catch (error) {
      Toast.fail({
        message: '网络错误',
        duration: 500,
      })
    }
    finally {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setLoading(false)
    }
  }

  useFocusEffect(useCallback(() => {
    getInitData()
  }, []))
  const handleRechargeClick = () => {
    navigation.dispatch(StackActions.replace('RechargeIntegral'))
  }
  const ListFooterComponent = () => {
    if (isLoadEnd) {
      return <Text style={{ textAlign: 'center', color: themeColor.black65 }}>没有更多了</Text>
    }
    if (loading) {
      return <View style={{ height: pxToDp(100), marginBottom: pxToDp(20) }}>
        <Loading vertical size={pxToDp(40)}>加载中...</Loading>
      </View>
    }
    return null
  }
  const PIE_DATA_MAP = {
    publish: { color: '#006DFF', label: '发布职位' },
    chat: { color: '#79D2DE', label: '发起聊天' },
    recharge: { color: '#ED6665', label: '充值积分' },
    refund: { color: '#dfef4e', label: '退款积分' },

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
      <Fragment>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            marginBottom: 10,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: 120,
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
        <View style={{ flexDirection: 'row', justifyContent: 'center', width: '100%', }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: 120,
            }}
          >
            {renderDot('#ED6665')}
            <Text style={{ color: themeColor.black85 }}>充值积分</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: 120,
              }}
            >
              {renderDot('#dfef4e')}
              <Text style={{ color: themeColor.black85 }}>退款积分</Text>
            </View>
          </View>
        </View>
      </Fragment>
    )
  }
  return (
    <Page title='我的积分' isScrollView={false} conntentStyle={styles.page}>
      <FlatList
        style={styles.container}
        ListHeaderComponent={(
          <Fragment>
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
                  <Text style={styles.title}>积分记录分布情况</Text>
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
                            {`${Math.floor(Number(selectPie.value) / Number(pieTotal) * 100)}%`}
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
          </Fragment>
        )}
        data={consumeList}
        renderItem={item => (
          <ConsumeListCard data={item.item}></ConsumeListCard>
        )}
        onEndReached={onReachBottom}
        ListFooterComponent={ListFooterComponent}
      />
    </Page>
  )
}

const styles = create({
  page: {
    paddingHorizontal: 0,
    backgroundColor: '#F5F6FA',
  },
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
