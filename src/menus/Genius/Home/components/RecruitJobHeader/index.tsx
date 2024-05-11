import { Space } from '@fruits-chain/react-native-xiaoshu'
import { StackActions, useNavigation } from '@react-navigation/native'
import { default as React } from 'react'
import { Pressable, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import Feather from 'react-native-vector-icons/Feather'
import { themeColor } from '@/core/styleSheet/themeColor'
import { create, pxToDp } from '@/core/styleSheet'
import { IMAGE_PREFIX } from '@/core/constants'

interface Props {
  title: string
}

function RecruitListHeader(props: Props) {
  const { title } = props

  const navigation = useNavigation()

  const handleSettingClick = () => {
    navigation.dispatch(StackActions.push('Setting'))
  }
  return (
    <View style={styles.container}>
      <Space direction="horizontal">
        <FastImage style={styles.logo} source={{ uri: `${IMAGE_PREFIX}/stars.png` }}></FastImage>
        <Text style={styles.title}>
          {title}
        </Text>
      </Space>
      <Pressable style={styles.button} onPress={handleSettingClick}>
        <Feather name="settings" size={pxToDp(46)} color={themeColor.black85} />
      </Pressable>
    </View>
  )
}

const styles = create({
  container: {
    flexDirection: 'row',
    height: 164,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  title: {
    height: 80,
    lineHeight: 80,
    fontSize: 42,
    fontWeight: '700',
    color: themeColor.black85,
  },
  name: {
    fontSize: 36,
    fontWeight: '700',
    color: themeColor.black85,
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default RecruitListHeader
