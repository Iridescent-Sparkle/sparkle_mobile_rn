import { Space } from '@fruits-chain/react-native-xiaoshu'
import { Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { themeColor } from '@/core/styleSheet/themeColor'
import { create } from '@/core/styleSheet'
import { IMAGE_PREFIX } from '@/core/constants'

interface Props {
  data: UserProfileList
}
function ResumeUserCard(props: Props) {
  const { data } = props
  return (
    <View style={styles.container}>
      <Space>
        <Text style={styles.name}>
          {
            data.user?.nickname
          }
        </Text>
        <Text style={styles.work}>
          {
          data.user?.occupation
        }
        </Text>
      </Space>
      <FastImage style={styles.avatar} source={{ uri: data.user?.avatar || `${IMAGE_PREFIX}/stars.png` }}></FastImage>
    </View>
  )
}

const styles = create({
  container: {
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
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 80,
  },
})

export default ResumeUserCard
