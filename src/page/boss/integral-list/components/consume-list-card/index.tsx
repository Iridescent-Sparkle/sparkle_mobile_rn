import dayjs from 'dayjs'
import { Pressable, Text, View } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { themeColor } from '@/core/styleSheet/themeColor'
import { create, pxToDp } from '@/core/styleSheet'

interface Props {
  data: IntegralRecord
}
const DESC_MAP = {
  chat: {
    title: '发起聊天',
    icon: <Ionicons name="chatbox-ellipses-outline" size={pxToDp(36)} color={themeColor.primary} />,
  },
  publish: {
    title: '发布职位',
    icon: <AntDesign name="solution1" size={pxToDp(36)} color={themeColor.primary} />,
  },
  recharge: {
    title: '充值积分',
    icon: <Entypo name="rocket" size={pxToDp(36)} color={themeColor.primary} />,
  },
  refund: {
    title: '退款',
    icon: <MaterialIcons name="currency-yuan" size={pxToDp(36)} color={themeColor.primary} />,
  },
}
export default function ConsumeListCard(props: Props) {
  const { data } = props
  return (
    <Pressable style={styles.contentBox}>
      <View style={styles.left}>
        <View style={styles.img}>
          {DESC_MAP[data.type]?.icon}
        </View>
        <View>
          <Text style={styles.title}>
            {DESC_MAP[data.type]?.title}
          </Text>
          <Text style={styles.date}>
            {dayjs(data.updateTime).format('YYYY-MM-DD HH:mm:ss')}
          </Text>
        </View>
      </View>
      <Text style={styles.integral}>{`${data.type === 'recharge' ? '+' : '-'}${data.integral}`}</Text>
    </Pressable>
  )
}

const styles = create({
  contentBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 32,
    width: '100%',
    height: 120,
    // borderRadius: 16,
    backgroundColor: '#fff',
  },
  left: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 32,
  },
  img: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 80,
    backgroundColor: '#E7F0F9',
    borderRadius: 30,
  },
  title: {
    color: themeColor.black85,
    fontWeight: '700',
    fontSize: 32,
  },
  date: {
    color: themeColor.black45,
    fontWeight: '700',
    fontSize: 24,
  },
  integral: {
    color: themeColor.black85,
    fontWeight: '700',
    fontSize: 34,
  },
})
