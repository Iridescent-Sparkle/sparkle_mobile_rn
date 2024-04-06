import { Empty, NavBar } from '@fruits-chain/react-native-xiaoshu'
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
import { FlatList, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import ResumeListCard from '@/menu/boss/home/components/ResumeCard'
import { create } from '@/core/styleSheet'
import { request } from '@/core/api'

export default function DeliverList() {
  const insets = useSafeAreaInsets()

  const navigation = useNavigation()

  const route = useRoute<{ key: any, name: any, params: { jobId: string } }>()

  const [resumeList, setResumeList] = useState([] as UserProfileList[])

  const getInitData = async () => {
    try {
      const { data: resumeListData } = await request.post({
        jobId: route.params.jobId,
      }, {
        url: `/boss/job/deliver`,
      })
      setResumeList(resumeListData)
    }
    catch (error) {

    }
  }

  useFocusEffect(useCallback(() => {
    getInitData()
  }, []))

  const handleBackClick = () => {
    navigation.goBack()
  }

  return (
    <View style={[styles.container, { top: insets.top, paddingBottom: insets.bottom }]}>
      <NavBar title="投递者列表" onPressBackArrow={handleBackClick} />
      {resumeList.length
        ? <FlatList style={styles.list} data={resumeList} renderItem={job => <ResumeListCard data={job.item} />} keyExtractor={job => String(job.id)} />
        : <View style={styles.empty}><Empty /></View>}
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
