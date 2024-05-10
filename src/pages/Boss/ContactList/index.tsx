import { Empty, NavBar } from '@fruits-chain/react-native-xiaoshu'
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
import { FlatList, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { create } from '@/core/styleSheet'
import { request } from '@/core/api'
import ResumeListCard from '@/core/components/ResumeCard'
import Page from '@/core/components/Page'

export default function ContactList() {
  const [resumeList, setResumeList] = useState([] as UserProfileList[])

  const getInitData = async () => {
    try {
      const { data: resumeListData } = await request.post({

      }, {
        url: `boss/contact/user`,
      })

      setResumeList(resumeListData)
    }
    catch (error) {

    }
  }

  useFocusEffect(useCallback(() => {
    getInitData()
  }, []))

  return (
    <Page title="联系记录" isScrollView={false}>
      {resumeList.length
        ? <FlatList style={styles.list} data={resumeList} renderItem={job => <ResumeListCard data={job.item.profile} />} keyExtractor={job => String(job.id)} />
        : <View style={styles.empty}><Empty /></View>}
    </Page>
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
