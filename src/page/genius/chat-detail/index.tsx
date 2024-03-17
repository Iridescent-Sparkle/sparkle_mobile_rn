import React from 'react'
import { View } from 'react-native'
import type { MessageModel, SystemMessageModel, TimeMessageModel } from 'react-native-chat-uikit'
import { ConversationDetail, gCustomMessageCardEventType, useChatContext } from 'react-native-chat-uikit'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import type { ChatCustomMessageBody } from 'react-native-chat-sdk'
import { ChatConversationType, ChatMessageChatType, ChatMessageType } from 'react-native-chat-sdk'
import { create } from '@/core/styleSheet'

type Props = NativeStackScreenProps<any>
export default function GeniusChatDetail(props: Props) {
  const insets = useSafeAreaInsets()
  const { navigation, route } = props
  const convId = ((route.params as any)?.params as any)?.convId
  const convType = ((route.params as any)?.params as any)?.convType
  const operateType = ((route.params as any)?.params as any)?.operateType
  const selectedContacts = ((route.params as any)?.params as any)
    ?.selectedContacts
  const { top, bottom } = useSafeAreaInsets()
  const im = useChatContext()

  return (

    <ConversationDetail
      containerStyle={{
        flexGrow: 1,
        paddingTop: insets.top,
      }}
      convId={convId}
      convType={convType}
      input={{
        props: {
          top,
          bottom,
          onClickedCardMenu: () => {
            // 跳转到共享联系人页面
            navigation.push('ShareContact', {
              params: {
                convId,
                convType,
                convName,
                operateType: 'share_card',
              },
            })
          },
        },
      }}
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
          onClickedItemAvatar: (id, model) => {
            // 点击头像的回调通知
            if (model.modelType !== 'message')
              return

            const msgModel = model as MessageModel
            const userId = msgModel.msg.from

            const userType = msgModel.msg.chatType as number
            if (userType === ChatMessageChatType.PeerChat) {
              navigation.navigate('ContactInfo', {
                params: { userId },
              })
            }
            else if (userType === ChatMessageChatType.GroupChat) {
              const groupId = msgModel.msg.conversationId
              const selfId = im.userId
              if (selfId === im.userId) {
                navigation.navigate('ContactInfo', {
                  params: {
                    userId,
                  },
                })
              }
              else {
                navigation.navigate('GroupParticipantInfo', {
                  params: {
                    groupId,
                    userId,
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
      onClickedAvatar={(params: {
        convId: string
        convType: ChatConversationType
        ownerId?: string | undefined
      }) => {
        // 点击会话头像的回调通知
        if (params.convType === ChatConversationType.PeerChat) {
          navigation.navigate({
            name: 'ContactInfo',
            params: { params: { userId: params.convId } },
            merge: true,
          })
        }
        else if (params.convType === ChatConversationType.GroupChat) {
          navigation.navigate({
            name: 'GroupInfo',
            params: {
              params: { groupId: params.convId, ownerId: params.ownerId },
            },
            merge: true,
          })
        }
      }}
    />

  )
}

const styles = create({

})
