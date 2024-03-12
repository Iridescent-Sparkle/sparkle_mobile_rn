import { FlatList, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import React, { useState } from 'react'
import { Button, Popup } from '@fruits-chain/react-native-xiaoshu'
import RecruitListHeader from '../../components/recruit/recruit-list/recruit-job-header'
import RecruitListCard from '../../components/recruit/recruit-list/recruit-list-card'
import RecruitSearchBar from '../../components/recruit/recruit-list/recruit-search-bar'
import { create } from '@/core/styleSheet'

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

export default function GeniusCollect() {
  const insets = useSafeAreaInsets()
  const [popupVisible, setPopupVisible] = useState(false)

  const handlePopupShow = () => {
    setPopupVisible(true)
  }
  const handlePopupClose = () => {
    setPopupVisible(false)
  }
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <RecruitListHeader title="收藏的工作" />
      <RecruitSearchBar />
      <FlatList style={styles.list} data={DATA} renderItem={() => <RecruitListCard handleCollectClick={handlePopupShow} />} keyExtractor={item => item.id} />
      <Popup
        safeAreaInsetBottom
        visible={popupVisible}
        position="bottom"
        onPressOverlay={handlePopupClose}
        round
      >
        <Popup.Header title="投递简历" showClose={false} style={styles.popupHeader} titleTextStyle={styles.popupHeaderText} divider={true} />
        <View style={styles.popupWrapper}>
          <RecruitListCard handleCollectClick={handlePopupShow} />
          <View style={styles.buttonWrapper}>
            <Button style={styles.popupButton} onPress={handlePopupShow} type="hazy">取消</Button>
            <Button style={styles.popupButton} onPress={handlePopupShow}>是的，移除</Button>
          </View>
        </View>
      </Popup>
    </View>
  )
}

const styles = create({
  container: {
    flex: 1,
    paddingHorizontal: 44,
    backgroundColor: '#FFF',
  },
  list: {
    marginTop: 40,
  },
  popupHeader: {
    height: 180,
  },
  popupHeaderText: {
    fontSize: 36,
  },
  popupWrapper: {
    paddingHorizontal: 40,
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  popupButton: {
    width: 320,
    borderRadius: 40,
  },
})
