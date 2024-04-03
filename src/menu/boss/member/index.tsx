import { ScrollView, View } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import PageHeader from '../manage/components/PageHeader'
import MenuList from './components/member-module/MenuList'
import UserCard from './components/member-module/UserCard'
import { themeColor } from '@/core/styleSheet/themeColor'
import { create, pxToDp } from '@/core/styleSheet'

const MENU_ACCOUNT = [
  {
    title: '个人信息',
    icon: <Feather name="users" size={pxToDp(36)} color={themeColor.primary} />,
    route: 'GeniusUpdateProfile',
  },
  {
    title: '企业信息',
    icon: <FontAwesome name="suitcase" size={pxToDp(36)} color={themeColor.primary} />,
    route: 'CompanyAuth',
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
    icon: <Entypo name="rocket" size={pxToDp(36)} color={themeColor.primary} />,
    route: 'RechargeIntegral',
  },
  // {
  //   title: '招聘数据',
  //   icon: <Entypo name="bar-graph" size={pxToDp(36)} color={themeColor.primary} />,
  //   route: '',
  // },
]
const MENU_OTHER = [
  {
    title: '设置',
    icon: <Entypo name="cog" size={pxToDp(36)} color={themeColor.primary} />,
    route: 'Setting',
  },
]
export default function BossMember() {
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
