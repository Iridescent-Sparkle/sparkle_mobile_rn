import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import RecentJobList from '../../components/recruit/recruit-list/recent-job-list'
import UserCard from '../../components/recruit/recruit-list/recruit-user-card'
import RecruitSearchBar from '../../components/recruit/recruit-list/recruit-search-bar'
import { create } from '@/core/styleSheet'

export default function GeniusHome() {
  const insets = useSafeAreaInsets()

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <UserCard />
      <RecruitSearchBar />
      <RecentJobList />
    </View>
  )
}

const styles = create({
  container: {
    flex: 1,
    paddingHorizontal: 44,
    backgroundColor: '#FFF',
  },
})
