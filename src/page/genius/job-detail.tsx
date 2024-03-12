import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Button, Card, NavBar } from '@fruits-chain/react-native-xiaoshu'
import React, { useRef, useState } from 'react'
import { FlatList, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import RecruitAboutCard from '@/components/recruit/recruit-detail/recruit-about-card'
import RecruitDescriptionCard from '@/components/recruit/recruit-detail/recruit-description-card'
import RecruitDetailCard from '@/components/recruit/recruit-detail/recruit-detail-card'
import RecruitSummaryCard from '@/components/recruit/recruit-detail/recruit-summary-card'
import RecruitTagCard from '@/components/recruit/recruit-detail/recruit-tags-card'
import FilterTabs from '@/components/recruit/recruit-search/recruit-filter-tabs'
import { create, pxToDp } from '@/core/styleSheet'
import { themeColor } from '@/core/styleSheet/themeColor'

const tabData = [{
  id: '1',
  title: '工作描述',
}, {
  id: '2',
  title: '最低资格',
}, {
  id: '3',
  title: '福利',
}, {
  id: '4',
  title: '所需技能',
}, {
  id: '5',
  title: '工作总结',
}, {
  id: '6',
  title: '关于',
}]

function listData(listRef: any) {
  return [
    {
      id: '0',
      title: '工作描述',
      component: <FilterTabs listRef={listRef} data={tabData} />,
    },
    {
      id: '1',
      title: '工作描述',
      component: <RecruitDescriptionCard title="工作描述" data={['能够运行设计冲刺交付最好的用户', '基于研究的经验。', '有领导团队的能力，能委派工作，有主动性。', '能够指导初级设计师制定战略', '如何收集特定的功能。', '能够对数据进行汇总和处理', '正在发生的决定。']} />,
    },
    {
      id: '2',
      title: '最低资格',
      component: <RecruitDescriptionCard title="最低资格" data={['2年以上UI/UX设计经验', '使用Figma、Sketch和Miro平台。', '具有数值设计的分析和转换能力', '冲刺到UI/UX。', '有相关B2C用户中心产品开发经验。']} />,
    },
    {
      id: '3',
      title: '福利',
      component: <RecruitTagCard title="福利" data={['医疗/健康保险', '医疗、处方或视力计划', '绩效奖金', '带薪病假', '带薪休假', '交通津贴']} />,
    },
    {
      id: '4',
      title: '所需技能',
      component: <RecruitTagCard title="所需技能" data={['创造性思维', 'UI / UX设计', 'Figma', '平面设计', '网页设计', '布局']} />,
    },
    {
      id: '5',
      title: '工作总结',
      component: <RecruitSummaryCard
        title="工作经验"
        data={[
          { title: '经验', desc: '1 - 3年' },
          { title: '教育', desc: '学士学位' },
          { title: '工作水平', desc: '助理/主管' },
          { title: '工作类型 ', desc: '资讯科技及软件' },
          { title: '空缺', desc: '2' },
          { title: '网站', desc: 'www.google.com' },
        ]}
                 />,
    },
    {
      id: '6',
      title: '关于',
      component: <RecruitAboutCard
        title="关于"
        content="<span>谷歌有限责任公司是一家美国跨国公司专注于搜索引擎的科技公司科技，在线广告，云计算计算机软件，量子计算，e- 商业、人工智能和消费者电子产品。<br/> 谷歌成立于1998年9月4日</span>"
                 />,
    },
  ]
}

function JobDetail() {
  const insets = useSafeAreaInsets()
  const listRef = useRef<FlatList>(null)
  const [popupVisible, setPopupVisible] = useState(false)

  const handlePopupShow = () => {
    setPopupVisible(true)
  }

  // const handlePopupClose = () => {
  //   setPopupVisible(false)
  // }

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <NavBar rightExtra={<FontAwesome name="bookmark" size={pxToDp(48)} color={themeColor.primary} />} rightStyle={styles.rightExtra} divider={false} />
      <View style={styles.list}>
        <FlatList
          ListHeaderComponent={<RecruitDetailCard />}
          stickyHeaderIndices={[1]}
          ref={listRef}
          data={listData(listRef)}
          renderItem={item => item.item.component}
          keyExtractor={item => item.id}
        />
      </View>
      <Card>
        <View style={styles.buttonWrapper}>
          <Button style={styles.button} onPress={handlePopupShow}>投递</Button>
        </View>
      </Card>
      {/* <Popup
        safeAreaInsetBottom
        visible={popupVisible}
        position="bottom"
        onPressOverlay={handlePopupClose}
        round
      >
        <Popup.Header title="投递简历" showClose={false} style={styles.popupHeader} titleTextStyle={styles.popupHeaderText} divider={true} />
        <View style={styles.popupWrapper}>
          <Button style={styles.popupButton} onPress={handlePopupShow} type="hazy">投递</Button>
          <Button style={styles.popupButton} onPress={handlePopupShow}>投递</Button>
        </View>
      </Popup> */}
    </View>
  )
}

const styles = create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  rightExtra: {

  },
  tabBar: {
    height: 114,
    paddingHorizontal: 0,
  },
  list: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 24,
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    width: 660,
    borderRadius: 40,
  },
  popupHeader: {
    height: 180,
  },
  popupHeaderText: {
    fontSize: 36,
  },
  popupWrapper: {
    flexDirection: 'row',
    paddingHorizontal: 40,
    justifyContent: 'space-between',
  },
  popupButton: {
    width: 320,
    borderRadius: 40,
  },
})

export default JobDetail
