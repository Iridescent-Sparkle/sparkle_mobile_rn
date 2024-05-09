import { Button, NavBar } from '@fruits-chain/react-native-xiaoshu'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { ScrollView, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useUserStore } from '@/store/user'
import { themeColor } from '@/core/styleSheet/themeColor'
import { create } from '@/core/styleSheet'
import { IMAGE_PREFIX } from '@/core/constants'

export default function CompanyInfo() {
  const insets = useSafeAreaInsets()
  const userStore = useUserStore()
  const navigation = useNavigation()
  const handleBackClick = () => {
    navigation.goBack()
  }

  useEffect(() => {
    userStore.getUserInfo()
  }, [])

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom || 16 }]}>
      <NavBar onPressBackArrow={handleBackClick} />
      <ScrollView>
        <View style={styles.header}>
          <FastImage source={{ uri: userStore.userInfo.company?.companyAvatar || `${IMAGE_PREFIX}/stars.png` }} style={styles.logo} resizeMode="contain"></FastImage>
          <Text style={styles.title}>{userStore.userInfo.company?.companyName}</Text>
          <FastImage source={{ uri: userStore.userInfo.company?.companyLicense || `${IMAGE_PREFIX}/license.png` }} style={styles.license} resizeMode="contain"></FastImage>
          <Text style={styles.desc}>{userStore.userInfo.company?.companyDesc}</Text>
        </View>
      </ScrollView>
      <Button style={styles.payButton}>{userStore.userInfo.company.status === 1 ? '解除绑定' : '审核中'}</Button>
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
