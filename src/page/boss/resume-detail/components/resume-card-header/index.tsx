import { Text, View } from 'react-native'
import { create, pxToDp } from '@/core/styleSheet'
import { themeColor } from '@/core/styleSheet/themeColor'

interface Props {
  title: string
}
function ResumeCardHeader(props: Props) {
  const { title } = props

  return (
    <View style={styles.titleWrapper}>
      <View style={styles.circle} />
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}

const styles = create({
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 90,
    marginVertical: 12,
    gap: 12,
  },
  circle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: themeColor.primary,
    marginRight: pxToDp(20),
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: themeColor.black85,
  },
})

export default ResumeCardHeader
