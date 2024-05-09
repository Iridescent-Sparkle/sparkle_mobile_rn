import { Empty } from '@fruits-chain/react-native-xiaoshu'
import { StackActions, useFocusEffect, useNavigation } from '@react-navigation/native'
import { useCallback, useState } from 'react'
import { FlatList, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import PageHeader from '../Manage/components/PageHeader'
import ResumeListCard from '../../../core/components/ResumeCard'
import { create } from '@/core/styleSheet'
import SearchBar from '@/core/components/SearchBar'
import { request } from '@/core/api'

export default function BossManage() {
  const insets = useSafeAreaInsets()

  const navigation = useNavigation()

  const [resumeList, setResumeList] = useState([] as UserProfileList[])

  const getInitData = async () => {
    try {
      const { data: { data: resumeListData } } = await request.post({}, {
        url: `/genius/profile/all`,
      })
      setResumeList(resumeListData)
    }
    catch (error) {

    }
  }

  useFocusEffect(useCallback(() => {
    getInitData()
  }, []))

  const tip = (function () {
    const date = new Date()
    const hours = date.getHours()

    if (hours >= 6 && hours < 12)
      return '早上好'
    else if (hours >= 12 && hours < 18)
      return '下午好'
    else
      return '晚上好'
  })()

  const onSearch = (value: string) => {
    navigation.dispatch(StackActions.push('BossSearch', {
      keyword: value,
    }))
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <PageHeader title={tip} />
      <SearchBar onSearch={onSearch} />
      {resumeList.length
        ? (
          <View style={styles.list}>
            <FlatList data={resumeList} renderItem={resume => <ResumeListCard data={resume.item} from="home" />} keyExtractor={item => String(item.id)} />
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
    height: 960,
    marginTop: 24,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
