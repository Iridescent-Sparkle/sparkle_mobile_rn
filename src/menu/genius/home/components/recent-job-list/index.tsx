import { Tabs } from '@fruits-chain/react-native-xiaoshu'
import React, { useState } from 'react'
import { FlatList, View } from 'react-native'
import RecruitListCard from '../recruit-list-card'
import { useJobStore } from '@/store/job'
import { themeColor } from '@/core/styleSheet/themeColor'
import { create, pxToDp } from '@/core/styleSheet'

interface Props {
  onTabChange: (tab: string) => void
  jobList: JobDetail[]
}

function RecentJobList(props: Props) {
  const { jobList, onTabChange } = props

  const jobStore = useJobStore()
  const [activeTab, setActiveTab] = useState('1')
  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    onTabChange && onTabChange(tab)
  }

  return (
    <View>
      <Tabs activeKey={activeTab} tabBarStyle={styles.tabBar} tabAlign="left" indicatorColor={themeColor.primary} indicatorWidth={pxToDp(64)} activeTextColor={themeColor.primary} onChange={handleTabChange}>
        {
          jobStore.jobCategoryOptions.map(category => (
            <Tabs.TabPane key={String(category?.value)} tab={category?.label}>
              <View style={styles.list}>
                <FlatList data={jobList} renderItem={jobDetail => <RecruitListCard data={jobDetail.item} />} keyExtractor={jobDetail => String(jobDetail.id)} />
              </View>
            </Tabs.TabPane>
          ))
        }
      </Tabs>
    </View>
  )
}

const styles = create({
  tabBar: {
    height: 114,
    padding: 0,
  },
  list: {
    width: '100%',
    height: 960,
    paddingTop: 32,
  },
})

export default RecentJobList
