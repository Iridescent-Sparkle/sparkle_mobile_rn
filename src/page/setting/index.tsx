import { Cell } from '@fruits-chain/react-native-xiaoshu'
import { View } from 'react-native'
import { useChatContext } from 'react-native-chat-uikit'
import Feather from 'react-native-vector-icons/Feather'
import { useAppStore } from '../../store/index'
import { create, pxToDp } from '@/core/styleSheet'

export default function Setting() {
  const appStore = useAppStore()
  const im = useChatContext()

  const handleLogout = async () => {
    await appStore.logout()
    im.logout({
      result(params) {
        console.log(params)
      },
    })
  }
  return (
    <View style={styles.container}>
      <Cell
        title="退出登录"
        isLink
        onPress={handleLogout}
        titleExtra={(
          <View style={styles.icon}>
            <Feather name="log-out" size={pxToDp(32)} color="black" />
          </View>
        )}
      />
      <Cell
        title="重置密码"
        isLink
        titleExtra={(
          <View style={styles.icon}>
            <Feather name="rotate-ccw" size={pxToDp(32)} color="black" />
          </View>
        )}
      />
      {/* <Cell
        title="注销"
        isLink
        titleExtra={(
          <View style={styles.icon}>
            <Feather name="trash" size={pxToDp(32)} color="black" />
          </View>
        )}
      /> */}
    </View>
  )
}

const styles = create({
  container: {
    flex: 1,
    paddingHorizontal: 44,
    backgroundColor: '#FFF',
  },
  icon: {
    justifyContent: 'center',
    marginRight: 16,
  },
})
