import { StyleSheet, Text, View } from 'react-native'
import { create } from '@/core/styleSheet'

export default function UserCard() {
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Account</Text>
      <View style={styles.content}>
        <View style={styles.contentBox}>
          <View style={styles.left}>
            <View style={styles.img}></View>
            <Text>Presonal Data</Text>
          </View>
          <View style={styles.right}></View>
        </View>
        <View style={styles.contentBox}>
          <View style={styles.left}>
            <View style={styles.img}></View>
            <Text>Presonal Data</Text>
          </View>
          <View style={styles.right}></View>
        </View>
        <View style={styles.contentBox}>
          <View style={styles.left}>
            <View style={styles.img}></View>
            <Text>Presonal Data</Text>
          </View>
          <View style={styles.right}></View>
        </View>
      </View>
    </View>
  )
}
const styles = create({
  container: {
    width: '90%',
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 32,
    borderWidth: 4,
    borderColor: '#F0F1F1',
    borderRadius: 32,
    // backgroundColor: '#FAFAFA',
    height: 620,
  },
  headerTitle: {
    color: '#D4D4D4',
    fontSize: 30,
    marginBottom: 20,
  },
  content: {
    flex: 1,
    gap: 12,
  },
  contentBox: {
    flex: 1,
    width: '100%',
    height: 80,
    backgroundColor: '#646466',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  left: {
    width: '40%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  img: {
    width: 70,
    height: 70,
    backgroundColor: '#733423',
    borderRadius: 30,
    marginRight: 20,
    marginLeft: 20,
  },
  right: {
    width: 70,
    height: 70,
    backgroundColor: '#232323',
    borderRadius: 30,
    marginRight: 30,
  },
})
