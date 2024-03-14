import { Cell } from '@fruits-chain/react-native-xiaoshu'
import { View } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import { create, pxToDp } from '@/core/styleSheet'

export default function Setting() {
  return (
    <View style={styles.container}>
      <Cell
        title="退出登录"
        isLink
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
