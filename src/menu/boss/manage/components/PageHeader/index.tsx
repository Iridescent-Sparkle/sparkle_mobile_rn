import { Text, View } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import { create, pxToDp } from '@/core/styleSheet'

interface Props {
  title: string
}
export default function PageHeader(props: Props) {
  const { title } = props

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
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
