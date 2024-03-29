import { FlatList, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import PageHeader from './components/PageHeader'
import RecruitJobCard from '@/menu/genius/home/components/recruit-job-card'
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
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <PageHeader title="管理招聘" />
      <View style={styles.list}>
        <FlatList data={jobList} renderItem={job => <RecruitJobCard data={job} />} keyExtractor={item => item.id} />
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
  },
})
