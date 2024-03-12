import { Space, Tag } from '@fruits-chain/react-native-xiaoshu'
import { Text, View } from 'react-native'
import { create } from '@/core/styleSheet'
import { themeColor } from '@/core/styleSheet/themeColor'

interface Props {
  title: string
  data: {
    title: string
    desc: string
  }[]
}

function RecruitSummaryCard(props: Props) {
  const { title, data } = props

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{`${title}：`}</Text>
      <View style={styles.itemWrapper}>
        {
        data.map((item, index) => (
          <Space key={index} style={styles.item}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.desc}>{item.desc}</Text>
          </Space>
        ))
      }
      </View>
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
    color: '#212121',
    marginVertical: 32,
  },
  itemWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    width: 310,
    marginRight: 16,
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#363636',
  },
  desc: {
    fontSize: 28,
    color: themeColor.primary,
  },
})

export default RecruitSummaryCard
