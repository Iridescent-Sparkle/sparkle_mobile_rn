import { ScrollView, Text, View } from 'react-native'
import { Search } from '@fruits-chain/react-native-xiaoshu'
import Ionicons from 'react-native-vector-icons/Ionicons'
import PageHeader from '../../manage/components/PageHeader'
import { create } from '@/core/styleSheet'
import SearchBar from '@/components/recruit/recruit-list/recruit-search-bar'
import { themeColor } from '@/core/styleSheet/themeColor'
import TabList from '@/components/TabList'
import Recommendation from '@/components/Recommendation'

export default function SearchPage() {
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
    <ScrollView style={styles.scrollView}>
      <PageHeader back={true} />
      <View style={styles.container}>
        <View style={styles.SearchBox}>
          <Search style={styles.search} showSearchButton={false} />
          <Search showSearchButton={false} />
        </View>
        <TabList title="Search History" record={data} />
        <TabList title="Search History" record={data} />
        <Recommendation title="Recommended for you" record={data1}></Recommendation>

      </View>
    </ScrollView>
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
