import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import { Button } from '@fruits-chain/react-native-xiaoshu'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { create, pxToDp } from '@/core/styleSheet'
import { request } from '@/core/api'
import { themeColor } from '@/core/styleSheet/themeColor'

export default function RechargeIntegral() {
  const [jobList, setJobList] = useState([] as JobDetail[])

  const getInitData = async () => {
    try {
      const { data: jobListData } = await request.get({}, {
        url: `/genius/deliveries/user`,
      })
      setJobList(jobListData)
    }
    catch (error) {

    }
  }

  useFocusEffect(useCallback(() => {
    getInitData()
  }, []))
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>剩余积分</Text>
            <Text style={styles.headerDesc}>积分可用于发布职位、发起聊天</Text>
          </View>
          <Button type="hazy" style={styles.headerButton} size="s">积分明细</Button>
        </View>
        <View style={styles.panelWrapper}>
          <Text style={styles.panelTitle}>请选择充值数量</Text>
          <View style={styles.panel}>
            <Pressable style={styles.panelItem}>
              <Text style={styles.panelItemHeader}>15积分</Text>
              <Text style={styles.panelItemBottom}>¥20</Text>
            </Pressable>
            <Pressable style={styles.panelItem}>
              <Text style={styles.panelItemHeader}>15积分</Text>
              <Text style={styles.panelItemBottom}>¥20</Text>
            </Pressable>
            <Pressable style={styles.panelItem}>
              <Text style={styles.panelItemHeader}>15积分</Text>
              <Text style={styles.panelItemBottom}>¥20</Text>
            </Pressable>
            <Pressable style={styles.panelItem}>
              <Text style={styles.panelItemHeader}>15积分</Text>
              <Text style={styles.panelItemBottom}>¥20</Text>
            </Pressable>
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
          <Text style={styles.payNumber}>¥20</Text>
        </View>
        <Button style={styles.payButton}>立即支付</Button>
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
  panelItemHeader: {
    height: 100,
    color: themeColor.primary,
    textAlign: 'center',
    textAlignVertical: 'center',
    lineHeight: 100,
    fontSize: 32,
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
