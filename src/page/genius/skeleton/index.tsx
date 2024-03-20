import { Skeleton as XiaoshuSkeleton } from '@fruits-chain/react-native-xiaoshu'
import React from 'react'
import { View } from 'react-native'
import { create } from '@/core/styleSheet'

function Skeleton() {
  return (
    <View style={styles.skeleton}>
      <XiaoshuSkeleton
        avatar
        loading={true}
        active
        paragraph={{
          rows: 6,
          widths: [100, 100, 70, 100, 100, 20],
        }}
      />
      <XiaoshuSkeleton
        loading={true}
        active
        paragraph={{
          rows: 3,
          widths: [100, 100, 70, 100, 100, 20],
        }}
      />
      <XiaoshuSkeleton
        loading={true}
        active
        paragraph={{
          rows: 6,
          widths: [100, 100, 70, 100, 100, 20],
        }}
      />
      <XiaoshuSkeleton
        loading={true}
        active
        paragraph={{
          rows: 6,
          widths: [100, 100, 70, 100, 100, 20],
        }}
      />
    </View>
  )
}
const styles = create({
  skeleton: {
    padding: 20,
    gap: 108,
  },
})
export default Skeleton
