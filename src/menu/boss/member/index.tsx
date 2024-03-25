import { ScrollView, View } from 'react-native'
import TableList from '../components/member-module/TableList'
import UserCard from '../components/member-module/UserCard'
import { create } from '@/core/styleSheet'

export default function BossMember() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <UserCard />
        <TableList />
        <TableList />
      </View>
    </ScrollView>
  )
}

const styles = create({
  container: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
})
