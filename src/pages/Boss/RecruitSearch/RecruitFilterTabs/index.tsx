import { Tabs } from '@fruits-chain/react-native-xiaoshu'
import type { RefObject } from 'react'
import type { FlatList } from 'react-native'
import { themeColor } from '@/core/styleSheet/themeColor'
import { create, pxToDp } from '@/core/styleSheet'

interface Props {
  data: {
    id: string
    title: string
    component?: JSX.Element
  }[]
  listRef: RefObject<FlatList<any>>
}

function RecruitFilterTabs(props: Props) {
  const { data, listRef } = props

  const handleTabChange = (activeKey: string) => {
    listRef.current?.scrollToIndex({
      index: Number(activeKey) - 1,
    })
  }

  return (
    <Tabs onChange={handleTabChange} tabBarStyle={styles.tabBar} tabAlign="left" indicatorColor={themeColor.primary} indicatorWidth={pxToDp(64)} activeTextColor={themeColor.primary}>
      {
            data.map(item => <Tabs.TabPane key={item.id} tab={item.title} />)
          }
    </Tabs>
  )
}

const styles = create({
  tabBar: {
    height: 114,
    paddingHorizontal: 0,
  },
})
export default RecruitFilterTabs
