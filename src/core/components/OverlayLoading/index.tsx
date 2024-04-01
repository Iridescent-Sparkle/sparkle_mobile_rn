import type { LoadingProps } from '@fruits-chain/react-native-xiaoshu'
import { Loading, Overlay } from '@fruits-chain/react-native-xiaoshu'
import React from 'react'
import { create } from '@/core/styleSheet'

interface Props extends LoadingProps {}

function OverlayLoading(props: Props) {
  return (
    <Overlay visible={true} style={styles.loading}>
      <Loading type="spinner" size={18} {...props} />
    </Overlay>
  )
}

const styles = create({
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default OverlayLoading
