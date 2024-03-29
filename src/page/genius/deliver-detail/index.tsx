import { Button, Card, NavBar, Tag } from '@fruits-chain/react-native-xiaoshu'
import React from 'react'
import { Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { create } from '@/core/styleSheet'
import RecruitDetailCard from '@/page/boss/recruit-detail/recruit-detail-card'

function DeliverDetail() {
  const insets = useSafeAreaInsets()

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <NavBar title="投递状态" divider={false} />
      <View style={styles.list}>
        <RecruitDetailCard />
        <View style={styles.status}>
          <Text style={styles.statusTitle}>你的投递状态</Text>
          <Tag innerStyle={styles.statusDesc} type="hazy" size="l">未查看</Tag>
        </View>
      </View>
      <Card>
        <View style={styles.buttonWrapper}>
          <Button style={styles.button}>投递</Button>
        </View>
      </Card>
    </View>
  )
}

const styles = create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  list: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 24,
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    width: 660,
    borderRadius: 40,
  },
  status: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    borderTopWidth: 4,
    borderColor: '#F7F7F7',
  },
  statusTitle: {
    fontSize: 36,
    paddingVertical: 48,
  },
  statusDesc: {
    width: '100%',
    height: 96,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 36,
  },

})

export default DeliverDetail
