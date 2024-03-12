import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Space } from '@fruits-chain/react-native-xiaoshu'
import { Text, View } from 'react-native'
import { create, pxToDp } from '@/core/styleSheet'
import { themeColor } from '@/core/styleSheet/themeColor'

interface Props {
  title: string
  data: any[]
}

function RecruitDescriptionCard(props: Props) {
  const { title, data } = props

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{`${title}：`}</Text>
      {
        data.map((text, index) => (
          <Space key={index} direction="horizontal" style={styles.desc}>
            <FontAwesome name="circle" size={pxToDp(8)} color={themeColor.black45} />
            <Text style={styles.text}>{text}</Text>
          </Space>
        ))
      }
    </View>
  )
}

const styles = create({
  container: {
    overflow: 'hidden',
    marginBottom: 32,
  },
  titleText: {
    fontSize: 36,
    fontWeight: '700',
    color: themeColor.black85,
    marginVertical: 32,
  },
  desc: {
    marginHorizontal: 20,
    alignItems: 'center',
  },
  text: {
    color: themeColor.black65,
    fontSize: 24,
    lineHeight: 36,
  },
})

export default RecruitDescriptionCard
