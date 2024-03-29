import { Tag } from '@fruits-chain/react-native-xiaoshu'
import { Text, View } from 'react-native'
import { create } from '@/core/styleSheet'
import { themeColor } from '@/core/styleSheet/themeColor'

interface Props {
  title: string
  data: JobBonus[]
}

function RecruitTagCard(props: Props) {
  const { title, data } = props

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{`${title}：`}</Text>
      <View style={styles.tagWrapper}>
        {
        data.map(item => (
          <Tag innerStyle={styles.tag} type="ghost" size="l" key={item.id}>{item.bonusName}</Tag>
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
    color: themeColor.black85,
    marginVertical: 32,
  },
  tagWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    height: 64,
    marginRight: 16,
    marginBottom: 16,
  },
})

export default RecruitTagCard
