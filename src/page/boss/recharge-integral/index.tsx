import { StackActions, useFocusEffect, useNavigation } from '@react-navigation/native'
import React, { useCallback, useEffect, useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import { Button, Toast } from '@fruits-chain/react-native-xiaoshu'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Alipay from 'alipay-rn'
import { create, pxToDp, s } from '@/core/styleSheet'
import { request } from '@/core/api'
import { themeColor } from '@/core/styleSheet/themeColor'
import { useUserStore } from '@/store/user'

const alipayErrorReason = {
  6001: '支付取消',
  6002: '网络连接出错',
  4000: '支付失败',
  5000: '重复请求',
} as Record<string, string>
export default function RechargeIntegral() {
  const [integralMeal, setIntegralMeal] = useState([] as IntegralMeal[])
  const [selectMeal, setSelectMeal] = useState({} as IntegralMeal)
  const navigation = useNavigation()
  const userStore = useUserStore()

  const getInitData = async () => {
    try {
      const { data: { data: integralMealData } } = await request.post({}, {
        url: `/boss/integral/all`,
      })
      const sortedIntegralMealData: IntegralMeal[] = integralMealData.sort((cur: { integralNum: number }, next: { integralNum: number }) => cur.integralNum - next.integralNum)
      const defaultSelectMeal: IntegralMeal = sortedIntegralMealData.find(item => item.isDefault) || sortedIntegralMealData[0]
      setSelectMeal(defaultSelectMeal)
      setIntegralMeal(sortedIntegralMealData)
    }
    catch (error: any) {
      if (error.resultStatus)
        Toast.fail(alipayErrorReason[error.resultStatus])
    }
  }

  useEffect(() => {
    getInitData()
  }, [])
  const handleMealClick = (item: IntegralMeal) => {
    setSelectMeal(item)
  }
  const handlePayClick = async () => {
    try {
      const { data } = await request.post({
        totalAmount: selectMeal.price,
        subject: '积分充值',
      }, {
        url: `/boss/order/create`,
      })
      Alipay.setSandbox(true)

      const payResponse = await Alipay.pay(data)

      if (JSON.parse(payResponse.result).alipay_trade_app_pay_response?.code === '10000') {
        await request.post({
          integral: selectMeal.integralNum,
        }, { url: 'boss/integral/recharge' })
        await userStore.getUserInfo()

        await request.post({
          integral: selectMeal.integralNum,
          type: 'recharge',
        }, { url: 'boss/consume/create' })

        Toast.success('充值成功')
      }

      alipayErrorReason[payResponse.resultStatus] && Toast.fail(alipayErrorReason[payResponse.resultStatus])
    }
    catch (error: any) {
      Toast.fail('支付失败')
    }
  }
  const handleViewListClick = () => {
    navigation.dispatch(StackActions.replace('IntegralList'))
  }
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>{`剩余积分 ${userStore.userInfo.integral}`}</Text>
            <Text style={styles.headerDesc}>积分可用于发布职位、发起聊天</Text>
          </View>
          <Button onPress={handleViewListClick} type="hazy" style={styles.headerButton} size="s">积分明细</Button>
        </View>
        <View style={styles.panelWrapper}>
          <Text style={styles.panelTitle}>请选择充值数量</Text>
          <View style={styles.panel}>
            {
              integralMeal.map((item, index) => {
                return (
                  <Pressable key={index} style={[styles.panelItem, selectMeal.id === item.id ? styles.selectPanelItem : null]} onPress={() => handleMealClick(item)}>
                    <Text style={[styles.panelItemHeader, selectMeal.id === item.id ? styles.selectPanelItemHeader : null]}>
                      {item?.integralNum}
                      积分
                    </Text>
                    <Text style={[styles.panelItemBottom, selectMeal.id === item.id ? styles.selectPanelItemBottom : null]}>
                      ¥
                      {item?.price}
                    </Text>
                  </Pressable>
                )
              })
            }

          </View>
        </View>
        <View style={styles.payway}>
          <View style={styles.paywayTitle}>
            <AntDesign name="alipay-square" size={pxToDp(48)} color="#1678FF" />
            <Text style={styles.payDesc}>支付宝支付</Text>
          </View>

          <AntDesign name="checkcircle" size={pxToDp(48)} color={themeColor.primary} />
          {/* <AntDesign name="checkcircleo" size={pxToDp(48)} color={themeColor.primary} /> */}

        </View>
      </View>
      <View style={styles.footer}>
        <View style={styles.footerTitle}>
          <Text style={styles.payTitle}>订单金额：</Text>
          <Text style={styles.payNumber}>
            ¥
            {selectMeal?.price}
          </Text>
        </View>
        <Button style={styles.payButton} onPress={handlePayClick}>立即支付</Button>
      </View>
    </View>
  )
}

const styles = create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#F5F6FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 16,
    paddingHorizontal: 24,
    marginHorizontal: 24,
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
  panelWrapper: {
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 32,
    marginHorizontal: 24,
    backgroundColor: '#FFFFFF',
  },
  panelTitle: {
    fontSize: 24,
    color: themeColor.black45,
    marginBottom: 24,
  },
  panel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 24,
  },
  panelItem: {
    width: 200,
    height: 144,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#F5F6FA',
  },
  selectPanelItem: {
    borderWidth: 4,
    borderColor: themeColor.primary,
  },
  panelItemHeader: {
    height: 100,
    color: themeColor.primary,
    textAlign: 'center',
    textAlignVertical: 'center',
    lineHeight: 100,
    fontSize: 32,
  },
  selectPanelItemHeader: {
    fontWeight: '700',
  },
  panelItemBottom: {
    height: 44,
    textAlign: 'center',
    textAlignVertical: 'center',
    lineHeight: 44,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    backgroundColor: '#E0F3FF',
    fontSize: 24,
    color: themeColor.black65,
  },
  selectPanelItemBottom: {
    color: '#FFFFFF',
    backgroundColor: themeColor.primary,
  },
  payway: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 40,
    margin: 24,
    backgroundColor: '#FFFFFF',
  },
  paywayTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  payDesc: {
    marginLeft: 24,
    color: themeColor.black85,
    fontSize: 32,
    fontWeight: '700',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#FFFFFF',
  },
  footerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  payTitle: {
    color: themeColor.black85,
    fontSize: 28,
    fontWeight: '700',
  },
  payNumber: {
    color: themeColor.primary,
    fontSize: 32,
    fontWeight: '700',
  },
  payButton: {
    paddingHorizontal: 32,
    borderRadius: 20,
  },
})
