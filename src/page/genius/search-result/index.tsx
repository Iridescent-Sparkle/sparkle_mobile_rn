import { Loading, NavBar, Space } from '@fruits-chain/react-native-xiaoshu'
import { FlatList, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import FastImage from 'react-native-fast-image'
import Octicons from 'react-native-vector-icons/Octicons'
import { create, pxToDp } from '@/core/styleSheet'
import SearchBar from '@/components/recruit/recruit-list/recruit-search-bar'
import RecruitJobCard from '@/components/recruit/recruit-list/recruit-list-card'
import Visible from '@/core/components/Visible'
import { IMAGE_PREFIX } from '@/core/constants'
import { themeColor } from '@/core/styleSheet/themeColor'

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
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
]

export default function SearchResult() {
  const insets = useSafeAreaInsets()

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <NavBar rightExtra={<SearchBar />} rightStyle={styles.searchBar} divider={false} />
      <Visible visible={false}>
        <View style={styles.loading}>
          <Loading vertical>加载中...</Loading>
        </View>
      </Visible>

      <Visible visible={true}>
        <View style={styles.header}>
          <Text style={styles.result}>3779个结果</Text>
          {/* <Octicons name="sort-asc" size={pxToDp(48)} color={themeColor.primary} /> */}
          <Octicons name="sort-desc" size={pxToDp(48)} color={themeColor.primary} />
        </View>
        <View style={styles.list}>
          {
            DATA.length
              ? <FlatList data={DATA} renderItem={() => <RecruitJobCard />} keyExtractor={item => item.id} />
              : (
                <Space>
                  <FastImage
                    style={styles.banner}
                    source={
                    {
                      uri: `${IMAGE_PREFIX}/not_found.png`,
                    }
                  }
                  />
                  <Text style={styles.tip}>对不起，您输入的关键字未找到匹配的结果，请重新检查或搜索另一个关键字。</Text>
                </Space>
                )
          }
        </View>
      </Visible>
    </View>
  )
}

const styles = create({
  container: {
    flex: 1,
  },
  searchBar: {
    marginLeft: 64,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 128,
    paddingHorizontal: 40,
  },
  result: {
    fontSize: 32,
    color: themeColor.black65,
    fontWeight: '700',
  },
  list: {
    flex: 1,
    paddingHorizontal: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  banner: {
    height: 540,
  },
  tip: {
    textAlign: 'center',
    fontSize: 32,
    color: themeColor.black65,
  },
})
