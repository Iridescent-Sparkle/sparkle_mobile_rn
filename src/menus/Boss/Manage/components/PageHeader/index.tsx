import { Pressable, Text, View } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { StackActions, useNavigation } from '@react-navigation/native'
import { create, pxToDp } from '@/core/styleSheet'
import { themeColor } from '@/core/styleSheet/themeColor'

interface Props {
  title?: string
  back?: boolean
}
export default function PageHeader(props: Props) {
  const { title, back } = props
  const navigation = useNavigation()
  const handleButtonClick = () => {
    navigation.dispatch(StackActions.push('Setting'))
  }
  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}
      {back && <AntDesign name="left" size={24} color="black" />}
      <Pressable style={styles.button} onPress={handleButtonClick}>
        <Feather name="more-horizontal" size={pxToDp(48)} color="black" />
      </Pressable>
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
    color: themeColor.black85,
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
