import { Text, View } from 'react-native'
import { create } from '@/core/styleSheet'
import { themeColor } from '@/core/styleSheet/themeColor'

export default function UserCard() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.image}></View>
        <Text style={styles.name}>张楚焓</Text>
        <Text style={styles.desc}>非洲黑奴</Text>
        <View style={styles.sourceWrapper}>
          <View style={styles.sourceBox}>
            <Text style={styles.sourceNumber}>31</Text>
            <Text style={styles.sourceText}>我的积分</Text>
          </View>
          <View style={styles.sourceBox}>
            <Text style={styles.sourceNumber}>31</Text>
            <Text style={styles.sourceText}>我联系的</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = create({
  container: {
    height: 350,
    width: '100%',
    borderWidth: 2,
    marginTop: 100,
    borderColor: '#F0F1F1',
    borderRadius: 32,
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 96,
  },
  card: {
    position: 'relative',
    top: -64,
    borderRadius: 20,
    gap: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 130,
    height: 130,
    backgroundColor: '#FAFAFA',
    borderRadius: 65,
  },
  name: {
    color: themeColor.black85,
    fontSize: 36,
    fontWeight: '700',
  },
  desc: {
    fontSize: 28,
    color: themeColor.black45,
  },
  sourceWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  sourceBox: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    color: themeColor.black85,
  },
  sourceText: {
    color: themeColor.black45,
    fontSize: 24,
  },
  sourceNumber: {
    color: themeColor.black85,
    fontSize: 32,
    fontWeight: '700',
  },
})
