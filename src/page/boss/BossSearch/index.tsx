import { Search } from '@fruits-chain/react-native-xiaoshu'
import Page from '@/core/components/Page'
import { create } from '@/core/styleSheet'
import TabList from '@/page/boss/BossSearch/components/TabList'

export default function BossSearch() {
  const data = [
    'UI/UX Designer',
    'UI/UX Designer',
    'UI/UX Designer',
  ]

  return (
    <Page title="搜索">
      <Search style={styles.search} showSearchButton={true} />
      <TabList title="搜索历史" data={data} />
    </Page>
  )
}
const styles = create({
  search: {
    width: '100%',
    height: 96,
    borderRadius: 24,
    paddingRight: 16,
    marginTop: 24,
  },
})
