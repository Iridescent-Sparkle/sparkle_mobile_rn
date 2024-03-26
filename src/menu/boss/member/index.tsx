import { ScrollView, Text, View } from 'react-native'
import TableList from '../components/member-module/TableList'
import UserCard from '../components/member-module/UserCard'
import PageHeader from '../manage/components/PageHeader'
import { create } from '@/core/styleSheet'

export default function BossMember() {
  const tip = (function () {
    const date = new Date()
    const hours = date.getHours()
    if (hours >= 6 && hours < 12)
      return '早上好'
    else if (hours >= 12 && hours < 18)
      return '下午好'
    else
      return '晚上好'
  })()
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <PageHeader title={tip} />
        <UserCard />
        <TableList />
        <TableList />
        <Text>12</Text>
      </View>
    </ScrollView>
  )
}

const styles = create({
  scrollView: {
    marginHorizontal: 20,
  },
  container: {
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
