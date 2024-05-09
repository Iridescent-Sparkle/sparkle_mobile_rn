import { StackActions, useNavigation } from '@react-navigation/native'
import type { ReactElement } from 'react'
import { Pressable, Text, View } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { themeColor } from '@/core/styleSheet/themeColor'
import { create, pxToDp } from '@/core/styleSheet'

interface Props {
  title: string
  data: {
    title: string
    icon: ReactElement
    route: string
  }[]
}
export default function MenuList(props: Props) {
  const { title, data } = props
  const navigation = useNavigation()

  const handleItemClick = (route: string) => {
    navigation.dispatch(StackActions.push(route))
  }

  return (
    <View>
      <Text style={styles.headerTitle}>{title}</Text>
      <View style={styles.content}>
        {
          data.map(item => (
            <Pressable onPress={() => handleItemClick(item.route)} style={styles.contentBox} key={item.title}>
              <View style={styles.left}>
                <View style={styles.img}>
                  {item.icon}
                </View>
                <Text style={styles.title}>{item.title}</Text>
              </View>
              <MaterialIcons name="arrow-forward-ios" size={pxToDp(32)} color={themeColor.black85} />
            </Pressable>
          ),
          )
        }
      </View>
    </View>
  )
}
const styles = create({
  headerTitle: {
    color: '#B5B5B5',
    fontSize: 30,
    fontWeight: '700',
    paddingTop: 60,
    paddingBottom: 20,
  },
  content: {
    gap: 12,
  },
  contentBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 120,
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
    fontSize: 34,
  },
})
