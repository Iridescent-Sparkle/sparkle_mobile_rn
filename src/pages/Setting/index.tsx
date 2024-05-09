import { Cell, Notify } from '@fruits-chain/react-native-xiaoshu'
import { StackActions, useNavigation } from '@react-navigation/native'
import { View } from 'react-native'
import { useChatContext } from 'react-native-chat-uikit'
import Feather from 'react-native-vector-icons/Feather'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useUserStore } from '../../store/user/index'
import { create, pxToDp } from '@/core/styleSheet'
import Page from '@/core/components/Page'

export default function Setting() {
  const userStore = useUserStore()

  const im = useChatContext()

  const navigation = useNavigation()

  const handleLogout = async () => {
    await userStore.logout()
    im.logout({
      result() {
        Notify({
          type: 'warning',
          message: 'IM 聊天退出',
        })
      },
    })
  }

  const handleRoleChange = () => {
    navigation.dispatch(StackActions.push('UserChange'))
  }

  const handleBindEmail = () => {
    navigation.dispatch(StackActions.push('BindEmail'))
  }

  function handleResetPassword(): void {
    navigation.dispatch(StackActions.push('ResetGuide'))
  }

  return (
    <Page title="设置">
      <Cell
        title="切换角色"
        titleTextStyle={styles.title}
        isLink
        onPress={handleRoleChange}
        titleExtra={(
          <View style={styles.icon}>
            <Feather name="users" size={pxToDp(36)} color="black" />
          </View>
        )}
      />
      <Cell
        title="退出登录"
        titleTextStyle={styles.title}
        isLink
        onPress={handleLogout}
        titleExtra={(
          <View style={styles.icon}>
            <Feather name="log-out" size={pxToDp(36)} color="black" />
          </View>
        )}
      />
      <Cell
        title="重置密码"
        titleTextStyle={styles.title}
        isLink
        onPress={handleResetPassword}
        titleExtra={(
          <View style={styles.icon}>
            <Feather name="rotate-ccw" size={pxToDp(36)} color="black" />
          </View>
        )}
      />
      <Cell
        title="绑定邮箱"
        titleTextStyle={styles.title}
        isLink
        onPress={handleBindEmail}
        titleExtra={(
          <View style={styles.icon}>
            <MaterialCommunityIcons name="email-outline" size={pxToDp(36)} color="black" />
          </View>
        )}
      />
    </Page>
  )
}

const styles = create({
  container: {
    flex: 1,
    paddingHorizontal: 44,
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
  },
  icon: {
    justifyContent: 'center',
    marginRight: 16,
  },
})
