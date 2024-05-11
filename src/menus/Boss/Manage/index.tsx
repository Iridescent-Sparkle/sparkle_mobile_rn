import { FlatList, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useCallback, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { Empty } from '@fruits-chain/react-native-xiaoshu'
import PageHeader from './components/PageHeader'
import { create } from '@/core/styleSheet'
import { request } from '@/core/api'
import { useUserStore } from '@/store/user'
import RecruitJobCard from '@/core/components/RecruitJobCard'

export default function BossManage() {
  const insets = useSafeAreaInsets()
  const userStore = useUserStore()
  const [jobList, setJobList] = useState([] as JobDetail[])
  const getInitData = async () => {
    try {
      const { data: { data: jobListData } } = await request.post({
        userId: userStore.userInfo.id,
      }, {
        url: `boss/job/all`,
      })
      setJobList(jobListData)

    }
    catch (error) {

    }
  }
  
  useFocusEffect(useCallback(() => {
    getInitData()
  }, []))

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <PageHeader title="管理招聘" />
      {jobList.length
        ? (
          <View style={styles.list}>
            <FlatList data={jobList} renderItem={job => <RecruitJobCard data={job.item} type="manage" />} keyExtractor={item => String(item.id)} />
          </View>
          )
        : <View style={styles.empty}><Empty /></View>}
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
    flex: 1,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
