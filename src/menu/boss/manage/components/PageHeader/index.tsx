import { Text, View } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { create, pxToDp } from '@/core/styleSheet'

interface Props {
  title?: string
  back?: boolean
}
export default function PageHeader(props: Props) {
  const { title, back } = props

  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}
      {back && <AntDesign name="left" size={24} color="black" />}
      <View style={styles.button}>
        <Feather name="more-horizontal" size={pxToDp(48)} color="black" />
      </View>
    </View>
  )
}

const styles = create({
  container: {
    width: '100%',
    height: 144,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingHorizontal: 44,
    borderBottomWidth: 4,
    borderRadius: 12,
    borderColor: '#F7F7F7',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  button: {
    width: 90,
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: 12,
    borderColor: '#F7F7F7',
  },
})
