import { Empty } from '@fruits-chain/react-native-xiaoshu'
import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
import { FlatList, View } from 'react-native'
import { request } from '@/core/api'
import { create } from '@/core/styleSheet'
import RecruitJobCard from '@/menu/genius/home/components/recruit-job-card'
import RecruitSearchBar from '@/menu/genius/home/components/recruit-search-bar'

export default function ContactList() {
  const [jobList, setJobList] = useState([] as JobDetail[])

  const getInitData = async () => {
    try {
      const { data: jobListData } = await request.get({}, {
        url: `/genius/deliveries/user`,
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
    <View style={styles.container}>
      {/* 标题 */}
      {/* 饼图 */}
      {/* 折线图 */}
      {/* 消费记录列表 */}
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
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
