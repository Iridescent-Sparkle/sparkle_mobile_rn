import { FlatList, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import PageHeader from '../manage/components/PageHeader'
import ResumeListCard from './components/ResumeCard'
import SearchBar from '@/components/recruit/recruit-list/recruit-search-bar'
import { create } from '@/core/styleSheet'

export default function BossManage() {
  const insets = useSafeAreaInsets()
  const jobList = [
    {
      id: '1',
      title: 'Web前端开发工程师',
      description: '负责公司网站前端开发',
      date: '2021-08-01',
      salary: '10000-15000',
      address: '北京',
      contact: '18888888888',
    },
  ]

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
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <PageHeader title={tip} />
      <SearchBar />
      <View style={styles.list}>
        <FlatList data={jobList} renderItem={job => <ResumeListCard data={job} />} keyExtractor={item => item.id} />
      </View>
    </View>
  )
}

const styles = create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 44,
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
  list: {
    width: '100%',
    height: 960,
    marginTop: 24,
  },
})
