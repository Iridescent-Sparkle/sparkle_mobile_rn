import Page from '@/core/components/Page'
import { IMAGE_PREFIX } from '@/core/constants'
import { create } from '@/core/styleSheet'
import { themeColor } from '@/core/styleSheet/themeColor'
import { useUserStore } from '@/store/user'
import { Button, Dialog } from '@fruits-chain/react-native-xiaoshu'
import React, { useEffect } from 'react'
import { ScrollView, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import ResumeCardHeader from '../ResumeDetail/components/ResumeCardHeader'
import { useChatContext } from 'react-native-chat-uikit'
import { StackActions, useNavigation } from '@react-navigation/native'
import { request } from '@/core/api'

export default function CompanyInfo() {
  const userStore = useUserStore()
  const im = useChatContext()
  const navigation = useNavigation()
  useEffect(() => {
    userStore.getUserInfo()
  }, [])

  useEffect(() => {
    handleCompanyError()
  }, [userStore.userInfo.company?.id])

  const handleCompanyError = async () => {
    if (!userStore.userInfo.company?.id) {
      await im.logout({})

      await userStore.changeUser(userStore.role === 'genius' ? 'boss' : 'genius')

      navigation.dispatch(StackActions.replace(userStore.role === 'genius' ? 'Boss' : 'Genius'))
    }
  }

  const handleUnbindCompany = () => {
    Dialog({
      title: '解绑企业',
      message: '请确认是否要解绑企业',
      confirmButtonText: '解绑',
      cancelButtonText: '取消',
      showCancelButton: true,
    }).then(async action => {
      if (action === 'confirm') {

        await request.post({
          id: userStore.userInfo.company?.id
        }, {
          url: '/boss/company/delete',
        })

        await im.logout({})

        await userStore.changeUser(userStore.role === 'genius' ? 'boss' : 'genius')

        navigation.dispatch(StackActions.replace(userStore.role === 'genius' ? 'Boss' : 'Genius'))
      }
    })
  }

  return (
    <Page title='企业信息' isScrollView={false}>
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.wrapper}>
            <View style={styles.header}>
              <Text style={styles.name} numberOfLines={1} ellipsizeMode='tail'>
                {userStore.userInfo.company?.companyName}
              </Text>
              <Text style={styles.work} numberOfLines={1} ellipsizeMode='tail'>
                {userStore.userInfo.company?.companyDesc}
              </Text>
            </View>
            <FastImage style={styles.avatar} source={{ uri: userStore.userInfo.company?.companyAvatar || `${IMAGE_PREFIX}/stars.png` }} ></FastImage>
          </View>
          <ResumeCardHeader title="关于企业" />
          <View style={styles.about}>
            <Text style={styles.content}>
              {userStore.userInfo.company?.companyDesc}
            </Text>
          </View>
          <ResumeCardHeader title="营业执照" />
          <FastImage source={{ uri: userStore.userInfo.company?.companyLicense || `${IMAGE_PREFIX}/license.png` }} style={styles.license} resizeMode="contain"></FastImage>
        </ScrollView>
        {
          userStore.userInfo.company?.status === 1 ? <Button style={styles.payButton} onPress={handleUnbindCompany}>解除绑定</Button> : <Button style={styles.payButton}>审核中</Button>
        }
      </View>
    </Page>
  )
}

const styles = create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    flex: 1,
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
    borderRadius: 24,
  },
  wrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 168,
    borderBottomWidth: 4,
    borderBottomColor: '#F2F2F2',
  },
  avatar: {
    width: 108,
    height: 108,
    borderRadius: 54,
  },
  name: {
    fontSize: 38,
    fontWeight: '700',
    color: themeColor.black85,
  },
  work: {
    fontSize: 28,
    color: themeColor.black65,
  },
  content: {
    fontSize: 28,
    lineHeight: 42,
    color: themeColor.black65,
    paddingVertical: 16,
  },
  about: {
    borderBottomWidth: 4,
    borderBottomColor: '#F2F2F2',
  },
})
