import { Tabs } from '@fruits-chain/react-native-xiaoshu'
import React from 'react'
import { FlatList, View } from 'react-native'
import RecruitListCard from '../recruit-list-card'
import { themeColor } from '@/core/styleSheet/themeColor'
import { create, pxToDp } from '@/core/styleSheet'

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
]

function RecentJobList() {
  return (
    <View>
      <Tabs tabBarStyle={styles.tabBar} tabAlign="left" indicatorColor={themeColor.primary} indicatorWidth={pxToDp(64)} activeTextColor={themeColor.primary}>
        <Tabs.TabPane key="1" tab="全部">
          <View style={styles.list}>
            <FlatList data={DATA} renderItem={() => <RecruitListCard />} keyExtractor={item => item.id} />
          </View>
        </Tabs.TabPane>
        <Tabs.TabPane key="2" tab="前端开发">
          <View style={styles.list}>
            <FlatList data={DATA} renderItem={() => <RecruitListCard />} keyExtractor={item => item.id} />
          </View>
        </Tabs.TabPane>
        <Tabs.TabPane key="3" tab="Web前端">
          <View style={styles.list}>
            <FlatList data={DATA} renderItem={() => <RecruitListCard />} keyExtractor={item => item.id} />
          </View>
        </Tabs.TabPane>
        <Tabs.TabPane key="4" tab="后端开发工程师">
          <View style={styles.list}>
            <FlatList data={DATA} renderItem={() => <RecruitListCard />} keyExtractor={item => item.id} />
          </View>
        </Tabs.TabPane>
        <Tabs.TabPane key="5" tab="大数据工程师">
          <View style={styles.list}>
            <FlatList data={DATA} renderItem={() => <RecruitListCard />} keyExtractor={item => item.id} />
          </View>
        </Tabs.TabPane>
        <Tabs.TabPane key="6" tab="测试工程师">
          <View style={styles.list}>
            <FlatList data={DATA} renderItem={() => <RecruitListCard />} keyExtractor={item => item.id} />
          </View>
        </Tabs.TabPane>
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
