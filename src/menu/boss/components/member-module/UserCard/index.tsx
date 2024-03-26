import { StyleSheet, Text, View } from 'react-native'
import { create } from '@/core/styleSheet'

export default function UserCard() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.image}></View>
        <Text style={styles.name}>沃是嫩爹</Text>
        <Text style={styles.desc}>陕西广福</Text>
        <View style={styles.ability}>
          <View style={styles.abilityBox}>
            <Text>31</Text>
            <Text>Applied</Text>
          </View>
          <View style={styles.abilityBox}>
            <Text>17</Text>
            <Text>Reviewed</Text>
          </View>
          <View style={styles.abilityBox}>
            <Text>5</Text>
            <Text>Contacted</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = create({
  container: {
    marginTop: 72,
    width: '90%',
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 32,
    borderWidth: 4,
    borderColor: '#F0F1F1',
    borderRadius: 32,
    backgroundColor: '#FAFAFA',
    height: 256,
  },
  card: {
    borderRadius: 20,
    flex: 1,
    gap: 12,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#000000',
    position: 'relative',
    top: -40,
  },
  image: {
    width: 100,
    height: 100,
    backgroundColor: '#9CB8A7',
    borderRadius: 50,
  },
  name: {
    color: '#808080',
    fontSize: 16,
  },
  desc: {
    fontSize: 12,
    color: '#C2C2C2',
  },
  ability: {
    width: '80%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  abilityBox: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  Applied: {

  },
  Reviewed: {

  },
  Contacted: {

  },
})
