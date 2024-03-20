import { Tabs } from '@fruits-chain/react-native-xiaoshu'
import React, { useEffect } from 'react'
import { FlatList, View } from 'react-native'
import RecruitListCard from '../recruit-list-card'
import { themeColor } from '@/core/styleSheet/themeColor'
import { create, pxToDp } from '@/core/styleSheet'

interface Props {
  categoryList: {
    id: number
    categoryName: string
    createTime: string
    updateTime: string
  }[]
  jobList: any[]
  onTabChange: (tab: number) => void
}
function RecentJobList(props: Props) {
  const { categoryList, jobList, onTabChange } = props

  const handleTabChange = (tab: number) => {
    onTabChange && onTabChange(tab)
  }

  return (
    <View>
      <Tabs tabBarStyle={styles.tabBar} tabAlign="left" indicatorColor={themeColor.primary} indicatorWidth={pxToDp(64)} activeTextColor={themeColor.primary} onChange={handleTabChange}>
        {
          categoryList.map(category => (
            <Tabs.TabPane key={String(category.id)} tab={category.categoryName}>
              <View style={styles.list}>
                <FlatList data={jobList} renderItem={job => <RecruitListCard data={job} />} keyExtractor={item => item.id} />
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
