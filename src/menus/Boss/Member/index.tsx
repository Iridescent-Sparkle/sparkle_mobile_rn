import { create, pxToDp } from '@/core/styleSheet'
import { themeColor } from '@/core/styleSheet/themeColor'
import { useUserStore } from '@/store/user'
import { useFocusEffect } from '@react-navigation/native'
import { useCallback } from 'react'
import { ScrollView, View } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Feather from 'react-native-vector-icons/Feather'
import PageHeader from '../Manage/components/PageHeader'
import MenuList from './components/MenuList'
import UserCard from './components/UserCard'

const MENU_ACCOUNT = [
  {
    title: '个人信息',
    icon: <Feather name="users" size={pxToDp(36)} color={themeColor.primary} />,
    route: 'GeniusUpdateProfile',
  },
  {
    title: '企业信息',
    icon: <Feather name="briefcase" size={pxToDp(36)} color={themeColor.primary} />,
    route: 'CompanyInfo',
  },
]
const MENU_JOB = [
  {
    title: '发布职位',
    icon: <AntDesign name="solution1" size={pxToDp(36)} color={themeColor.primary} />,
    route: 'PublishJob',
  },
  {
    title: '积分充值',
    icon: <AntDesign name="rocket1" size={pxToDp(36)} color={themeColor.primary} />,
    route: 'RechargeIntegral',
  },
]
const MENU_OTHER = [
  {
    title: '设置',
    icon: <SimpleLineIcons name="settings" size={pxToDp(36)} color={themeColor.primary} />,
    route: 'Setting',
  },
]
export default function BossMember() {
  const userStore = useUserStore()

  useFocusEffect(useCallback(() => {
    userStore.getUserInfo()
  }, []))

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <PageHeader title="会员中心" />
        <UserCard />
        <MenuList data={MENU_ACCOUNT} title="账户设置" />
        <MenuList data={MENU_JOB} title="账户设置" />
        <MenuList data={MENU_OTHER} title="其他" />
      </View>
    </ScrollView>
  )
}

const styles = create({
  scrollView: {
    flex: 1,
    paddingHorizontal: 66,
    backgroundColor: '#fff',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
})
