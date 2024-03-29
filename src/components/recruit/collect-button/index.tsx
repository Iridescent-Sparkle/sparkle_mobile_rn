import { Button, Popup, Toast } from '@fruits-chain/react-native-xiaoshu'
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { themeColor } from '@/core/styleSheet/themeColor'
import { create, pxToDp } from '@/core/styleSheet'
import { request } from '@/core/api'

interface Props {
  jobDetail: JobDetail
  handleCollectClick?: () => void
}

function CollectButton(props: Props) {
  const { jobDetail, handleCollectClick } = props

  const [collected, setCollected] = useState(jobDetail.isCollected)
  const [popupVisible, setPopupVisible] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)

  const onCollectConfirm = async () => {
    console.log(jobDetail.id)
    try {
      setCollected(true)
      await request.post({
        jobId: jobDetail.id,
      }, {
        url: '/genius/favorite/create',
      })
      handleCollectClick && handleCollectClick()
    }
    catch (error) {
      setCollected(false)
      Toast.fail('收藏失败')
    }
  }

  const onCollectCancel = () => {
    setPopupVisible(true)
  }

  const handlePopupClose = () => {
    setPopupVisible(false)
  }

  const handleConfirmClick = async () => {
    try {
      setConfirmLoading(true)

      await request.post({
        favoriteId: jobDetail.jobCollectId,
      }, {
        url: '/genius/favorite/remove',
      })

      setCollected(false)
      handlePopupClose()
      handleCollectClick && handleCollectClick()
    }
    catch (error) {
      Toast.fail('移除收藏失败')
    }
    finally {
      setConfirmLoading(false)
    }
  }
  return (
    <>
      {
        collected
          ? <FontAwesome suppressHighlighting name="bookmark" size={pxToDp(48)} color={themeColor.primary} onPress={onCollectCancel} />
          : <FontAwesome suppressHighlighting name="bookmark-o" size={pxToDp(48)} color={themeColor.primary} onPress={onCollectConfirm} />
      }
      <Popup
        safeAreaInsetBottom
        visible={popupVisible}
        position="bottom"
        round
      >
        <Popup.Header title="是否要取消收藏" showClose={false} style={styles.popupHeader} titleTextStyle={styles.popupHeaderText} divider={true} />
        <View style={styles.popupWrapper}>
          <Button style={styles.popupButton} onPress={handlePopupClose} type="hazy" disabled={confirmLoading}>取消</Button>
          <Button style={styles.popupButton} onPress={handleConfirmClick} loading={confirmLoading} loadingText="确认">确认</Button>
        </View>
      </Popup>
    </>
  )
}

const styles = create({
  popupHeader: {
    height: 180,
  },
  popupHeaderText: {
    fontSize: 36,
  },
  popupWrapper: {
    flexDirection: 'row',
    paddingHorizontal: 40,
    justifyContent: 'space-between',
  },
  popupButton: {
    width: 320,
    borderRadius: 40,
  },
})

export default CollectButton
