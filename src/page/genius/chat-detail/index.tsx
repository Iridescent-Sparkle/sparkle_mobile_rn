import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import type { ChatCustomMessageBody } from 'react-native-chat-sdk'
import { ChatMessageType } from 'react-native-chat-sdk'
import type { MessageModel, SystemMessageModel, TimeMessageModel } from 'react-native-chat-uikit'
import { ConversationDetail, gCustomMessageCardEventType } from 'react-native-chat-uikit'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import ListRenderItem from 'react-native'

type Props = NativeStackScreenProps<any>

export default function GeniusChatDetail(props: Props) {
  const insets = useSafeAreaInsets()
  const { navigation, route } = props
  const convId = ((route.params as any)?.params as any)?.convId
  const convType = ((route.params as any)?.params as any)?.convType
  // const user = im.getRequestData(msg.from);
  // const url = im.user(im.userId)?.avatarURL;

  // return {
  //   userId: msg.from,
  //   modelType: 'message',
  //   layoutType:
  //     messageLayoutType ??
  //     (msg.from === im.userId ? 'right' : 'left'),
  //   msg: msg,
  //   quoteMsg: quoteMsg,
  //   userName: user?.name,
  //   userAvatar: msg.from === im.userId ? url : user?.avatar,
  // } as MessageModel;
  return (
    <GestureHandlerRootView style={{ flex: 1, paddingTop: insets.top, backgroundColor: '#FFF' }}>
      <ConversationDetail
        containerStyle={{
          flexGrow: 1,
          backgroundColor: '#FFF',
        }}

        convId={convId}
        convType={convType}

        list={{
          props: {
            onClickedItem: (
              id: string,
              model: SystemMessageModel | TimeMessageModel | MessageModel,
            ) => {
              // 点击消息列表项的回调通知
              if (model.modelType !== 'message')
                return

              const msgModel = model as MessageModel
              if (msgModel.msg.body.type === ChatMessageType.IMAGE) {
                navigation.push('ImageMessagePreview', {
                  params: {
                    msgId: msgModel.msg.msgId,
                    localMsgId: msgModel.msg.localMsgId,
                  },
                })
              }
              else if (msgModel.msg.body.type === ChatMessageType.VIDEO) {
                navigation.push('VideoMessagePreview', {
                  params: {
                    msgId: msgModel.msg.msgId,
                    localMsgId: msgModel.msg.localMsgId,
                  },
                })
              }
              else if (msgModel.msg.body.type === ChatMessageType.FILE) {
                navigation.push('FileMessagePreview', {
                  params: {
                    msgId: msgModel.msg.msgId,
                    localMsgId: msgModel.msg.localMsgId,
                  },
                })
              }
              else if (msgModel.msg.body.type === ChatMessageType.CUSTOM) {
                const body = msgModel.msg.body as ChatCustomMessageBody
                const event = body.event
                const params = body.params
                if (event === gCustomMessageCardEventType) {
                  const cardParams = params as {
                    userId: string
                    nickname: string
                    avatar: string
                  }
                  navigation.push('ContactInfo', {
                    params: {
                      userId: cardParams.userId,
                    },
                  })
                }
              }
            },

          },
        }}
        onBack={() => {
          navigation.goBack()
        }}
      />
    </GestureHandlerRootView>
  )
}
