import { Button, Space } from '@fruits-chain/react-native-xiaoshu'
import { StackActions, useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useUserStore } from '@/store/user'
import { themeColor } from '@/core/styleSheet/themeColor'
import { create, pxToDp } from '@/core/styleSheet'
import { IMAGE_PREFIX } from '@/core/constants'
import Page from '@/core/components/Page'
import Visible from '@/core/components/Visible'

function ResetGuide() {
  const userStore = useUserStore()

  const navigation = useNavigation()

  const [selectWay, setSelectWay] = useState({
    type: 'phone',
    value: userStore.userInfo.username,
  })

  const handleContinueClick = () => {
    navigation.dispatch(StackActions.replace('VerifyCodeForm', selectWay))
  }

  return (
    <Page title="重置密码">
      <View style={styles.bannerWrapper}>
        <FastImage
          style={styles.banner}
          source={{
            uri: `${IMAGE_PREFIX}/my_password.png`,
          }}
        >
        </FastImage>
      </View>
      <Text style={styles.title}>选择使用哪种联系方式来重置您的密码</Text>
      <Pressable
        onPress={() => setSelectWay({
          type: 'phone',
          value: userStore.userInfo.username,
        })}
        style={[styles.card, selectWay.type === 'phone' ? styles.cardActive : null]}
      >
        <View style={styles.circle}>
          <AntDesign name="message1" size={pxToDp(48)} color="#3E7CFD" />
        </View>
        <Space>
          <Text style={styles.desc}>通过短信：</Text>
          <Text style={styles.content}>
            {`+86 ${userStore.userInfo.username}`}
          </Text>
        </Space>
      </Pressable>
      <Visible visible={userStore.userInfo.email}>
        <Pressable
          onPress={() => setSelectWay({
            type: 'email',
            value: userStore.userInfo.email,
          })}
          style={[styles.card, selectWay.type === 'email' ? styles.cardActive : null]}
        >
          <View style={styles.circle}>
            <MaterialCommunityIcons name="email-outline" size={pxToDp(48)} color="#3E7CFD" />
          </View>
          <Space>
            <Text style={styles.desc}>通过邮箱：</Text>
            <Text style={styles.content}>
              {userStore.userInfo.email}
            </Text>
          </Space>
        </Pressable>
      </Visible>
      <Button style={styles.button} onPress={handleContinueClick}>继续</Button>
    </Page>
  )
}

const styles = create({
  bannerWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  banner: {
    width: 630,
    height: 540,
  },
  title: {
    textAlign: 'center',
    color: themeColor.black85,
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 42,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 40,
    marginBottom: 48,
    borderRadius: 64,
    borderWidth: 2,
    borderColor: '#F2F1F1',
  },
  cardActive: {
    borderWidth: 4,
    padding: 38,
    borderColor: '#3E7CFD',
  },
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 40,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#EEF5FF',
  },
  desc: {
    color: themeColor.black45,
  },
  content: {
    color: themeColor.black65,
    fontWeight: '700',
  },
  button: {
    width: '100%',
    borderRadius: 40,
    marginBottom: 40,
  },
})

export default ResetGuide
