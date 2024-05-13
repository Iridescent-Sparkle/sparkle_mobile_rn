"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGroupList = useGroupList;
var React = _interopRequireWildcard(require("react"));
var _reactNativeChatSdk = require("react-native-chat-sdk");
var _chat = require("../../chat");
var _i18n = require("../../i18n");
var _const = require("../const");
var _hooks = require("../hooks");
var _List = require("../List");
var _GroupList = require("./GroupList.item");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function useGroupList(props) {
  const {
    testMode,
    onClickedItem,
    onLongPressedItem,
    onNoMore,
    ListItemRender: propsListItemRender,
    onStateChanged,
    propsRef,
    flatListProps: propsFlatListProps
    // onRequestGroupData,
  } = props;
  const flatListProps = (0, _List.useFlatList)({
    listState: testMode === 'only-ui' ? 'normal' : 'loading',
    // onInit: () => init(),
    // onMore: () => onMore(),
    onVisibleItems: items => onVisibleItems(items)
  });
  const {
    setData,
    dataRef,
    setListState,
    ref: flatListRef
  } = flatListProps;
  const im = (0, _chat.useChatContext)();
  const currentPageNumberRef = React.useRef(0);
  const alertRef = React.useRef(null);
  const menuRef = React.useRef(null);
  const {
    closeMenu
  } = (0, _hooks.useCloseMenu)({
    menuRef
  });
  const isNoMoreRef = React.useRef(false);
  const {
    tr
  } = (0, _i18n.useI18nContext)();
  const ListItemRenderRef = React.useRef(propsListItemRender ?? _GroupList.GroupListItemMemo);
  const [groupCount, setGroupCount] = React.useState(0);
  const updateState = React.useCallback(state => {
    setListState === null || setListState === void 0 ? void 0 : setListState(state);
    onStateChanged === null || onStateChanged === void 0 ? void 0 : onStateChanged(state);
  }, [onStateChanged, setListState]);
  const onClickedCallback = React.useCallback(data => {
    onClickedItem === null || onClickedItem === void 0 ? void 0 : onClickedItem(data);
  }, [onClickedItem]);
  const onLongPressCallback = React.useCallback(data => {
    onLongPressedItem === null || onLongPressedItem === void 0 ? void 0 : onLongPressedItem(data);
  }, [onLongPressedItem]);
  const removeDuplicateData = React.useCallback(list => {
    const uniqueList = list.filter((item, index, self) => index === self.findIndex(t => t.data.groupId === item.data.groupId));
    return uniqueList;
  }, []);
  const refreshToUI = React.useCallback(list => {
    dataRef.current = removeDuplicateData(list);
    setData([...dataRef.current]);
  }, [dataRef, removeDuplicateData, setData]);
  const addGroupToUI = React.useCallback((list, pos) => {
    const propsList = list.map(v => {
      return {
        id: v.groupId,
        data: v
      };
    });
    if (pos === 'before') {
      dataRef.current = [...propsList, ...dataRef.current];
    } else {
      dataRef.current = [...dataRef.current, ...propsList];
    }
    refreshToUI(dataRef.current);
    setGroupCount(dataRef.current.length);
  }, [dataRef, refreshToUI]);
  const updateGroupToUI = React.useCallback(data => {
    dataRef.current = dataRef.current.map(item => {
      if (item.data.groupId === data.groupId) {
        item.data = {
          ...item.data,
          ...data
        };
      }
      return item;
    });
    refreshToUI(dataRef.current);
  }, [dataRef, refreshToUI]);
  const removeGroupToUI = React.useCallback(groupId => {
    dataRef.current = dataRef.current.filter(item => item.id !== groupId);
    refreshToUI(dataRef.current);
    setGroupCount(dataRef.current.length);
  }, [dataRef, refreshToUI]);
  const requestList = React.useCallback(pageNum => {
    if (testMode === 'only-ui') {} else {
      im.getPageGroups({
        pageSize: _const.gGroupListPageNumber,
        pageNum: pageNum,
        onResult: result => {
          const {
            isOk,
            value,
            error
          } = result;
          if (isOk === true) {
            if (pageNum === 0) {
              currentPageNumberRef.current = 0;
              dataRef.current = [];
              isNoMoreRef.current = false;
            }
            if (value) {
              addGroupToUI(value, 'after');
              if ((value === null || value === void 0 ? void 0 : value.length) < _const.gGroupListPageNumber) {
                isNoMoreRef.current = true;
                onNoMore === null || onNoMore === void 0 ? void 0 : onNoMore();
              } else {
                currentPageNumberRef.current = pageNum + 1;
              }
            }
            updateState('normal');
          } else {
            if (error) {
              im.sendError({
                error
              });
            }
          }
        }
      });
    }
  }, [addGroupToUI, dataRef, im, onNoMore, testMode, updateState]);
  const init = React.useCallback(() => {
    // im.setGroupParticipantOnRequestData(onRequestGroupData);
    requestList(0);
  }, [requestList]);
  const onMore = React.useCallback(() => {
    if (isNoMoreRef.current === true) {
      return;
    }
    requestList(currentPageNumberRef.current);
  }, [requestList]);
  const onVisibleItems = _items => {};
  const onAddedGroup = React.useCallback(params => {
    const isExisted = dataRef.current.find(item => item.id === params.groupId);
    if (isExisted === undefined) {
      im.getGroupInfo({
        groupId: params.groupId,
        onResult: result => {
          const {
            isOk,
            value,
            error
          } = result;
          if (isOk === true && value) {
            addGroupToUI([value], 'before');
          } else {
            if (error) {
              im.sendError({
                error
              });
            }
          }
        }
      });
    }
  }, [addGroupToUI, dataRef, im]);
  const updateGroupName = item => {
    var _dataRef$current$find;
    const data = (_dataRef$current$find = dataRef.current.find(t => t.id === item.groupId)) === null || _dataRef$current$find === void 0 ? void 0 : _dataRef$current$find.data;
    if (data && data.groupName !== item.groupName && item.groupName) {
      im.setGroupName({
        groupId: item.groupId,
        groupNewName: item.groupName
      });
    }
  };
  const updateGroupDescription = item => {
    var _dataRef$current$find2;
    const data = (_dataRef$current$find2 = dataRef.current.find(t => t.id === item.groupId)) === null || _dataRef$current$find2 === void 0 ? void 0 : _dataRef$current$find2.data;
    if (data && data.description !== item.description && item.description) {
      im.setGroupDescription({
        groupId: item.groupId,
        groupDescription: item.description
      });
    }
  };
  const updateGroupMyRemark = item => {
    var _dataRef$current$find3;
    const data = (_dataRef$current$find3 = dataRef.current.find(t => t.id === item.groupId)) === null || _dataRef$current$find3 === void 0 ? void 0 : _dataRef$current$find3.data;
    if (data && data.myRemark !== item.myRemark && im.userId && item.myRemark) {
      im.setGroupMyRemark({
        groupId: item.groupId,
        memberId: im.userId,
        groupMyRemark: item.myRemark
      });
    }
  };
  const updateGroupOwner = item => {
    var _dataRef$current$find4;
    const data = (_dataRef$current$find4 = dataRef.current.find(t => t.id === item.groupId)) === null || _dataRef$current$find4 === void 0 ? void 0 : _dataRef$current$find4.data;
    if (data && data.owner !== item.owner && item.owner) {
      im.changeGroupOwner({
        groupId: item.groupId,
        newOwnerId: item.owner
      });
    }
  };
  if (propsRef !== null && propsRef !== void 0 && propsRef.current) {
    propsRef.current.deleteItem = item => {
      if (item.owner === im.userId) {
        im.destroyGroup({
          groupId: item.groupId
        });
      } else {
        im.quitGroup({
          groupId: item.groupId
        });
      }
    };
    propsRef.current.getAlertRef = () => alertRef;
    propsRef.current.getMenuRef = () => menuRef;
    propsRef.current.getFlatListRef = () => flatListRef;
    propsRef.current.refreshList = () => {
      refreshToUI(dataRef.current);
    };
    propsRef.current.reloadList = () => {
      init();
    };
    propsRef.current.updateItem = item => {
      updateGroupDescription(item);
      updateGroupName(item);
      updateGroupMyRemark(item);
      updateGroupOwner(item);
    };
  }
  React.useEffect(() => {
    const uiListener = {
      onAddedEvent: data => {
        addGroupToUI([data], 'before');
      },
      onUpdatedEvent: data => {
        updateGroupToUI(data);
      },
      onDeletedEvent: data => {
        removeGroupToUI(data.groupId);
      },
      onRequestRefreshEvent: () => {
        refreshToUI(dataRef.current);
      },
      onRequestReloadEvent: () => {
        init();
      },
      type: _chat.UIListenerType.Group
    };
    im.addUIListener(uiListener);
    return () => {
      im.removeUIListener(uiListener);
    };
  }, [addGroupToUI, dataRef, im, init, refreshToUI, removeGroupToUI, updateGroupToUI]);
  const listenerRef = React.useRef({
    onMemberRemoved: params => {
      removeGroupToUI(params.groupId);
    },
    onDestroyed: params => {
      removeGroupToUI(params.groupId);
    },
    onAutoAcceptInvitation: params => {
      onAddedGroup({
        ...params
      });
    },
    onDetailChanged: group => {
      updateGroupToUI(group);
    },
    onStateChanged: _group => {},
    onGroupEvent: (event, target, _usernames) => {
      if (event === _reactNativeChatSdk.ChatMultiDeviceEvent.GROUP_CREATE) {
        if (target) {
          onAddedGroup({
            groupId: target,
            inviter: ''
          });
        }
      } else if (event === _reactNativeChatSdk.ChatMultiDeviceEvent.GROUP_DESTROY) {
        if (target) {
          removeGroupToUI(target);
        }
      } else if (event === _reactNativeChatSdk.ChatMultiDeviceEvent.GROUP_JOIN) {
        if (target) {
          onAddedGroup({
            groupId: target,
            inviter: ''
          });
        }
      } else if (event === _reactNativeChatSdk.ChatMultiDeviceEvent.GROUP_LEAVE) {
        if (target) {
          removeGroupToUI(target);
        }
      } else if (event === _reactNativeChatSdk.ChatMultiDeviceEvent.GROUP_INVITE_ACCEPT) {
        if (target) {
          onAddedGroup({
            groupId: target,
            inviter: ''
          });
        }
      }
    }
  });
  (0, _chat.useChatListener)(listenerRef.current);
  React.useEffect(() => {
    init();
  }, [init]);
  return {
    ...flatListProps,
    onMore,
    onClicked: onClickedCallback,
    onLongPress: onLongPressCallback,
    tr,
    ListItemRender: ListItemRenderRef.current,
    alertRef,
    menuRef,
    closeMenu,
    flatListProps: propsFlatListProps,
    groupCount
  };
}
//# sourceMappingURL=GroupList.hooks.js.map