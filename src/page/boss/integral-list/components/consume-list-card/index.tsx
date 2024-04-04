import { FlatList, Pressable, Text, View } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { create, pxToDp } from '@/core/styleSheet'
import { themeColor } from '@/core/styleSheet/themeColor'

interface Props {
  name: string
  date: string
  number: string
}

export default function ConsumeListCard(props: Props) {
  const { name, date, number } = props
  return (
    <Pressable style={styles.contentBox}>
      <View style={styles.left}>
        <View style={styles.img}>
          {name}
        </View>
        <Text style={styles.title}>{date}</Text>
      </View>
      <Text>{number}</Text>
    </Pressable>
  )
}

const styles = create({
  contentBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 120,
    borderRadius: 16,
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
    fontSize: 34,
  },
  list: {
    width: '100%',

    marginTop: 24,
  },
})
