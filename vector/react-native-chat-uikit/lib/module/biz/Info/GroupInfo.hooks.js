import * as React from 'react';
import { ChatConversationType, ChatMultiDeviceEvent } from 'react-native-chat-sdk';
import { UIListenerType, useChatContext } from '../../chat';
import { useLifecycle } from '../../hook';
import { useI18nContext } from '../../i18n';
import { Services } from '../../services';
import { useGroupInfoActions } from '../hooks/useGroupInfoActions';
export function useGroupInfo(props, ref) {
  const {
    groupId,
    ownerId,
    groupName: propsGroupName,
    groupAvatar: propsGroupAvatar,
    groupDescription: propsGroupDescription,
    groupMyRemark: propsGroupMyRemark,
    doNotDisturb: propsDoNotDisturb,
    onDoNotDisturb: propsOnDoNotDisturb,
    onClearChat: propsOnClearChat,
    onGroupName: propsOnGroupName,
    onGroupMyRemark: propsOnGroupMyRemark,
    onGroupDescription: propsOnGroupDescription,
    onCopyId: propsOnCopyId,
    onParticipant: propsOnParticipant,
    onClickedChangeGroupOwner,
    onGroupDestroy,
    onGroupQuit,
    onInitMenu,
    onGroupKicked,
    onSendMessage: propsOnSendMessage,
    onAudioCall: propsOnAudioCall,
    onVideoCall: propsOnVideoCall,
    onClickedNavigationBarButton
  } = props;
  const im = useChatContext();
  const {
    tr
  } = useI18nContext();
  const alertRef = React.useRef({});
  const toastRef = React.useRef({});
  const menuRef = React.useRef({});
  const ownerIdRef = React.useRef('');
  const [doNotDisturb, setDoNotDisturb] = React.useState(propsDoNotDisturb);
  const [groupName, setGroupName] = React.useState(propsGroupName);
  const [groupAvatar, setGroupAvatar] = React.useState(propsGroupAvatar);
  const [groupDescription, setGroupDescription] = React.useState(propsGroupDescription);
  const [groupMyRemark, setGroupMyRemark] = React.useState(propsGroupMyRemark);
  const [groupMemberCount, setGroupMemberCount] = React.useState(0);
  const [isOwner, setIsOwner] = React.useState(false);
  const init = React.useCallback(() => {
    im.getGroupInfoFromServer({
      groupId,
      onResult: value => {
        ownerId;
        const {
          isOk
        } = value;
        if (isOk === true && value.value) {
          var _value$value, _value$value2, _value$value3;
          // todo: useReducer
          ownerIdRef.current = value.value.owner;
          setGroupDescription((_value$value = value.value) === null || _value$value === void 0 ? void 0 : _value$value.description);
          setGroupName((_value$value2 = value.value) === null || _value$value2 === void 0 ? void 0 : _value$value2.groupName);
          setGroupAvatar(value.value.groupAvatar);
          setGroupMemberCount(value.value.memberCount ?? 0);
          setGroupMyRemark((_value$value3 = value.value) === null || _value$value3 === void 0 ? void 0 : _value$value3.myRemark);
          setIsOwner(im.userId === value.value.owner);
        }
      }
    });
    im.getConversation({
      convId: groupId,
      convType: ChatConversationType.GroupChat,
      createIfNotExist: true,
      fromNative: true
    }).then(result => {
      if (result) {
        setDoNotDisturb(result.doNotDisturb ?? false);
      }
    }).catch();
    if (im.userId) {
      im.getGroupMyRemark({
        groupId,
        memberId: im.userId,
        onResult: value => {
          if (value.isOk && value.value) {
            setGroupMyRemark(value.value);
          }
        }
      });
    }
  }, [groupId, im, ownerId]);
  useLifecycle(React.useCallback(state => {
    if (state === 'load') {
      init();
    }
  }, [init]));
  const quitGroup = React.useCallback(() => {
    im.quitGroup({
      groupId
    });
  }, [groupId, im]);
  const destroyGroup = React.useCallback(() => {
    im.destroyGroup({
      groupId
    });
  }, [groupId, im]);
  const {
    onShowGroupInfoActions
  } = useGroupInfoActions({
    menuRef,
    alertRef,
    onQuitGroup: quitGroup,
    onDestroyGroup: destroyGroup,
    onClickedChangeGroupOwner,
    onInit: onInitMenu
  });
  const doNotDisturbCallback = value => {
    if (propsOnDoNotDisturb) {
      propsOnDoNotDisturb(value);
      return;
    }
    im.setConversationSilentMode({
      convId: groupId,
      convType: ChatConversationType.GroupChat,
      doNotDisturb: value
    });
  };
  const onClearConversation = () => {
    if (propsOnClearChat) {
      propsOnClearChat();
      return;
    }
    alertRef.current.alertWithInit({
      title: tr('_uikit_info_alert_clear_chat_title'),
      buttons: [{
        text: tr('cancel'),
        onPress: () => {
          alertRef.current.close();
        }
      }, {
        text: tr('confirm'),
        isPreferred: true,
        onPress: () => {
          alertRef.current.close(() => {
            im.removeConversationAllMessages({
              convId: groupId,
              convType: 1
            });
          });
        }
      }]
    });
  };
  const onGroupName = () => {
    if (propsOnGroupName) {
      propsOnGroupName(groupId, groupName);
      return;
    }
    alertRef.current.alertWithInit({
      message: tr('_uikit_info_alert_modify_group_name'),
      supportInput: true,
      supportInputStatistics: true,
      inputMaxCount: 200,
      buttons: [{
        text: tr('cancel'),
        onPress: () => {
          alertRef.current.close();
        }
      }, {
        text: tr('confirm'),
        isPreferred: true,
        onPress: text => {
          alertRef.current.close(() => {
            if (text) {
              im.setGroupName({
                groupId,
                groupNewName: text
              });
            }
          });
        }
      }]
    });
  };
  const onGroupAvatar = _newGroupAvatar => {
    if (propsOnGroupName) {
      propsOnGroupName(groupId, groupAvatar);
      return;
    }
  };
  const onGroupDescription = () => {
    if (propsOnGroupDescription) {
      propsOnGroupDescription(groupId, groupDescription);
      return;
    }
    alertRef.current.alertWithInit({
      message: tr('_uikit_info_alert_modify_group_desc'),
      supportInput: true,
      supportInputStatistics: true,
      inputMaxCount: 200,
      buttons: [{
        text: tr('cancel'),
        onPress: () => {
          alertRef.current.close();
        }
      }, {
        text: tr('confirm'),
        isPreferred: true,
        onPress: text => {
          alertRef.current.close(() => {
            if (text) {
              im.setGroupDescription({
                groupId,
                groupDescription: text
              });
            }
          });
        }
      }]
    });
  };
  const onGroupMyRemark = () => {
    if (propsOnGroupMyRemark) {
      propsOnGroupMyRemark(groupId, groupMyRemark);
      return;
    }
    alertRef.current.alertWithInit({
      message: tr('_uikit_info_alert_modify_group_remark'),
      supportInput: true,
      supportInputStatistics: true,
      inputMaxCount: 200,
      // isSaveInput: true,
      buttons: [{
        text: tr('cancel'),
        onPress: () => {
          alertRef.current.close();
        }
      }, {
        text: tr('confirm'),
        isPreferred: true,
        onPress: text => {
          alertRef.current.close(() => {
            if (text) {
              if (text.trim().length === 0) {
                return;
              }
              if (im.userId === undefined) {
                return;
              }
              im.setGroupMyRemark({
                groupId,
                memberId: im.userId,
                groupMyRemark: text
              });
            }
          });
        }
      }]
    });
  };
  const onCopyId = () => {
    if (propsOnCopyId) {
      propsOnCopyId(groupId);
      return;
    }
    Services.cbs.setString(groupId);
    toastRef.current.show({
      message: tr('copy_success')
    });
  };
  const onParticipant = () => {
    if (propsOnParticipant) {
      propsOnParticipant(groupId);
      return;
    }
  };
  const onRequestCloseMenu = () => {
    var _menuRef$current, _menuRef$current$star;
    (_menuRef$current = menuRef.current) === null || _menuRef$current === void 0 ? void 0 : (_menuRef$current$star = _menuRef$current.startHide) === null || _menuRef$current$star === void 0 ? void 0 : _menuRef$current$star.call(_menuRef$current);
  };
  const onMoreMenu = () => {
    if (onClickedNavigationBarButton) {
      onClickedNavigationBarButton();
    } else {
      onShowGroupInfoActions(im.userId ?? '', ownerIdRef.current, groupId);
    }
  };
  const onSendMessage = () => {
    if (propsOnSendMessage) {
      propsOnSendMessage(groupId);
    }
  };
  const onAudioCall = () => {
    if (propsOnAudioCall) {
      propsOnAudioCall(groupId);
    }
  };
  const onVideoCall = () => {
    if (propsOnVideoCall) {
      propsOnVideoCall(groupId);
    }
  };
  React.useEffect(() => {
    const listener = {
      onDestroyed: params => {
        onGroupDestroy === null || onGroupDestroy === void 0 ? void 0 : onGroupDestroy(params.groupId);
      },
      onMemberExited: params => {
        if (params.member === im.userId) {
          onGroupQuit === null || onGroupQuit === void 0 ? void 0 : onGroupQuit(params.groupId);
        } else {
          setGroupMemberCount(prev => prev - 1);
        }
      },
      onMemberRemoved: params => {
        onGroupKicked === null || onGroupKicked === void 0 ? void 0 : onGroupKicked(params.groupId);
      },
      onDetailChanged: group => {
        if (group.groupId === groupId) {
          setGroupName(prev => {
            if (prev === group.groupName) {
              return prev;
            }
            return group.groupName;
          });
          setGroupDescription(prev => {
            if (prev === group.description) {
              return prev;
            }
            return group.description;
          });
        }
      },
      onOwnerChanged: params => {
        if (params.groupId === groupId) {
          if (im.userId === params.newOwner) {
            ownerIdRef.current = params.newOwner;
            setIsOwner(true);
          } else {
            setIsOwner(false);
          }
        }
      },
      onGroupEvent: (event, target, _usernames) => {
        if (event === ChatMultiDeviceEvent.GROUP_ASSIGN_OWNER) {
          if (target === groupId) {
            if (im.userId === target) {
              ownerIdRef.current = target;
              setIsOwner(true);
            } else {
              setIsOwner(false);
            }
          }
        }
      }
    };
    im.addListener(listener);
    return () => {
      im.removeListener(listener);
    };
  }, [groupId, im, init, onGroupDestroy, onGroupKicked, onGroupQuit]);
  React.useEffect(() => {
    const listener = {
      onUpdatedEvent: data => {
        if (data.convId === groupId) {
          setDoNotDisturb(data.doNotDisturb ?? false);
        }
      },
      type: UIListenerType.Conversation
    };
    im.addUIListener(listener);
    return () => {
      im.removeUIListener(listener);
    };
  }, [groupId, im]);
  React.useEffect(() => {
    const uiListener = {
      onUpdatedEvent: data => {
        if (data.groupId === groupId) {
          setGroupName(prev => {
            if (prev === data.groupName) {
              return prev;
            }
            return data.groupName;
          });
          setGroupDescription(prev => {
            if (prev === data.description) {
              return prev;
            }
            return data.description;
          });
          if (data.owner !== ownerIdRef.current) {
            ownerIdRef.current = data.owner;
            setIsOwner(im.userId === data.owner);
          }
        }
      },
      onDeletedEvent: data => {
        if (data.groupId === groupId) {
          onGroupQuit === null || onGroupQuit === void 0 ? void 0 : onGroupQuit(data.groupId);
        }
      },
      type: UIListenerType.Group
    };
    im.addUIListener(uiListener);
    return () => {
      im.removeUIListener(uiListener);
    };
  }, [groupId, im, onGroupQuit]);
  React.useEffect(() => {
    const uiListener = {
      onUpdatedEvent: _data => {},
      onDeletedEvent: _data => {},
      onAddedEvent: data => {
        if (data.memberId === im.userId) {
          return;
        }
        setGroupMemberCount(prev => prev + 1);
      },
      type: UIListenerType.GroupParticipant
    };
    im.addUIListener(uiListener);
    return () => {
      im.removeUIListener(uiListener);
    };
  }, [groupId, im, onGroupQuit]);
  React.useImperativeHandle(ref, () => {
    return {
      setGroupName: (groupId, groupNewName) => {
        if (groupNewName === undefined || groupName === groupNewName) {
          return;
        }
        im.setGroupName({
          groupId,
          groupNewName: groupNewName
        });
      },
      setGroupDescription: (groupId, desc) => {
        if (desc === undefined || desc === groupDescription) {
          return;
        }
        im.setGroupDescription({
          groupId,
          groupDescription: desc
        });
      },
      setGroupMyRemark: (groupId, remark) => {
        if (remark === undefined || remark === groupMyRemark) {
          return;
        }
        im.setGroupMyRemark({
          groupId,
          memberId: im.userId ?? '',
          groupMyRemark: remark
        });
      }
    };
  }, [groupDescription, groupMyRemark, groupName, im]);
  return {
    ...props,
    doNotDisturb,
    onDoNotDisturb: doNotDisturbCallback,
    onClearChat: onClearConversation,
    groupName,
    onGroupName,
    groupAvatar,
    onGroupAvatar,
    groupDescription,
    onGroupDescription,
    onGroupMyRemark,
    alertRef,
    toastRef,
    onCopyId,
    onParticipant,
    onRequestCloseMenu,
    menuRef,
    onMore: onMoreMenu,
    groupMemberCount,
    isOwner,
    tr,
    onAudioCall,
    onVideoCall,
    onSendMessage
  };
}
//# sourceMappingURL=GroupInfo.hooks.js.map