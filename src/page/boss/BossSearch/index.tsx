import { Search } from '@fruits-chain/react-native-xiaoshu'
import { View } from 'react-native'
import Page from '@/core/components/Page'
import { create } from '@/core/styleSheet'
import Recommendation from '@/page/boss/BossSearch/components/Recommendation'
import TabList from '@/page/boss/BossSearch/components/TabList'

export default function BossSearch() {
  const data = [
    {
      title: 'UI/UX Designer',
      desc: '120 Result',
    },
    {
      title: 'UI/UX Designer',
      desc: '120 Result',
    },
    {
      title: 'UI/UX Designer',
      desc: '120 Result',
    },
  ]

  const data1 = [
    {
      title: '12',
      desc: 'asdad',
      area: '成都',
      money: '$15-30$',
    },
    {
      title: '11',
      desc: 'sad',
      area: '北京',
      money: '$22-30$',
    },
  ]

  return (
    <Page title="搜索">
      <View style={styles.container}>
        <View style={styles.SearchBox}>
          <Search style={styles.search} showSearchButton={false} />
          <Search showSearchButton={false} />
        </View>
        <TabList title="Search History" record={data} />
        <TabList title="Search History" record={data} />
        <Recommendation title="Recommended for you" record={data1}></Recommendation>
      </View>
    </Page>
  )
}
const styles = create({
  scrollView: {
    marginHorizontal: 20,
  },
  container: {
    backgroundColor: '#FFFFFF',
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
  SearchBox: {
    width: 624,
  },
  search: {
    width: '100%',
    height: 96,
    borderRadius: 24,
    // padding: 10,
    borderWidth: 1,
    borderColor: '#F8F8F8',
    backgroundColor: '#FFFFFF',
  },
})
