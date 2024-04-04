import { Button, NavBar } from '@fruits-chain/react-native-xiaoshu'
import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { request } from '@/core/api'
import { IMAGE_PREFIX } from '@/core/constants'
import { create } from '@/core/styleSheet'
import { themeColor } from '@/core/styleSheet/themeColor'

export default function CompanyInfo() {
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
      {/* <NavBar /> */}
      <ScrollView>
        <View style={styles.header}>
          <FastImage source={{ uri: `${IMAGE_PREFIX}/stars.png` }} style={styles.logo} resizeMode="contain"></FastImage>
          <Text style={styles.title}>成都鱼泡科技有限公司</Text>
          <FastImage source={{ uri: `${IMAGE_PREFIX}/license.png` }} style={styles.license} resizeMode="contain"></FastImage>
          <Text style={styles.desc}>成都鱼泡科技有限公司于2017年成立，法定代表人周峰。成都鱼泡科技有限公司是一家致力于数字技术在建筑用工领域创新应用的国家高新技术企业 [1]，成都市重点梯度培育企业 [2]。主要为工程建筑、装修及物流等行业工友或企业，提供集"智能招聘+用工SaaS"于一体的数字化用工服务。鱼泡网是国内领先的技术蓝领招聘平台，专为建筑劳务工人、班组和企业提供安全、高效的招工找活服务。</Text>
          <Text style={styles.desc}>成都鱼泡科技有限公司于2017年成立，法定代表人周峰。成都鱼泡科技有限公司是一家致力于数字技术在建筑用工领域创新应用的国家高新技术企业 [1]，成都市重点梯度培育企业 [2]。主要为工程建筑、装修及物流等行业工友或企业，提供集"智能招聘+用工SaaS"于一体的数字化用工服务。鱼泡网是国内领先的技术蓝领招聘平台，专为建筑劳务工人、班组和企业提供安全、高效的招工找活服务。</Text>
        </View>
      </ScrollView>
      <Button style={styles.payButton}>解除绑定</Button>
    </View>
  )
}

const styles = create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
    justifyContent: 'space-between',
  },
  header: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 16,
    paddingHorizontal: 24,
    marginHorizontal: 24,
    paddingVertical: 32,
    marginVertical: 24,
    backgroundColor: '#FFFFFF',
    gap: 32,
  },
  title: {
    fontSize: 32,
    color: themeColor.black85,
    fontWeight: '700',
  },
  logo: {
    width: 160,
    height: 160,
  },
  license: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 340,
    marginVertical: 24,
    borderRadius: 24,
  },
  desc: {
    fontSize: 28,
    color: themeColor.black65,

  },
  payButton: {
    paddingHorizontal: 32,
    borderRadius: 20,
  },
})
