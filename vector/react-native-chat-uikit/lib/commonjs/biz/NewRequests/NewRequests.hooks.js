"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useNewRequests = useNewRequests;
var React = _interopRequireWildcard(require("react"));
var _chat = require("../../chat");
var _hook = require("../../hook");
var _i18n = require("../../i18n");
var _hooks = require("../hooks");
var _List = require("../List");
var _NewRequests = require("./NewRequests.item");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function useNewRequests(props) {
  const {
    onClickedItem,
    onLongPressedItem,
    onButtonClicked,
    testMode,
    onSort: propsOnSort,
    ListItemRender: propsListItemRender
  } = props;
  const flatListProps = (0, _List.useFlatList)({
    listState: 'normal',
    onInit: () => init()
  });
  const {
    setData,
    dataRef
  } = flatListProps;
  const im = (0, _chat.useChatContext)();
  const {
    tr
  } = (0, _i18n.useI18nContext)();
  const ListItemRenderRef = React.useRef(propsListItemRender ?? _NewRequests.NewRequestsItemMemo);
  const menuRef = React.useRef({});
  const alertRef = React.useRef({});
  const {
    closeMenu
  } = (0, _hooks.useCloseMenu)({
    menuRef
  });
  const {
    onShowContactListMoreActions
  } = (0, _hooks.useContactListMoreActions)({
    menuRef,
    alertRef
  });
  const addContact = React.useCallback(userId => {
    im.addNewContact({
      userId: userId
    });
  }, [im]);
  const onClickedCallback = React.useCallback(data => {
    onClickedItem === null || onClickedItem === void 0 ? void 0 : onClickedItem(data);
  }, [onClickedItem]);
  const onLongPressedCallback = React.useCallback(data => {
    onLongPressedItem === null || onLongPressedItem === void 0 ? void 0 : onLongPressedItem(data);
  }, [onLongPressedItem]);
  const onButtonClickedCallback = React.useCallback(data => {
    if (onButtonClicked) {
      onButtonClicked(data);
    } else {
      // !!! accept invite. no have reject.
      if (data) {
        im.acceptInvitation({
          userId: data.requestId,
          onResult: () => {
            data.state === 'accepted';
            im.requestList.removeRequest(data);
          }
        });
      }
    }
  }, [im, onButtonClicked]);
  (0, _hook.useLifecycle)(state => {
    if (state === 'load') {
      im.requestList.addListener('newRequests', {
        onNewRequestListChanged: list => {
          dataRef.current = list.map(item => {
            return {
              id: item.requestId,
              data: item
            };
          });
          dataRef.current.sort(onSort);
          setData([...dataRef.current]);
        }
      });
    }
  });
  const init = async () => {
    if (testMode === 'only-ui') {} else {
      const state = await im.loginState();
      if (state === 'logged') {
        im.requestList.getRequestList({
          onResult: result => {
            if (result.isOk && result.value) {
              dataRef.current = result.value.map(item => {
                return {
                  id: item.requestId,
                  data: item
                };
              });
              dataRef.current.sort(onSort);
              setData([...dataRef.current]);
            }
          }
        });
      }
    }
  };
  const onSort = (prevProps, nextProps) => {
    if (propsOnSort) {
      return propsOnSort(prevProps, nextProps);
    } else {
      return sortRequest(prevProps, nextProps);
    }
  };
  const sortRequest = (prevProps, nextProps) => {
    var _prevProps$data$msg, _nextProps$data$msg;
    const prevTimestamp = (_prevProps$data$msg = prevProps.data.msg) === null || _prevProps$data$msg === void 0 ? void 0 : _prevProps$data$msg.localTime;
    const nextTimestamp = (_nextProps$data$msg = nextProps.data.msg) === null || _nextProps$data$msg === void 0 ? void 0 : _nextProps$data$msg.localTime;
    if (prevTimestamp !== undefined && nextTimestamp !== undefined) {
      return prevTimestamp === nextTimestamp ? 0 : prevTimestamp < nextTimestamp ? 1 : -1;
    } else {
      return 0;
    }
  };
  const onAddContact = React.useCallback(() => {
    onShowContactListMoreActions(addContact);
  }, [addContact, onShowContactListMoreActions]);
  return {
    ...flatListProps,
    onClicked: onClickedCallback,
    onLongPressed: onLongPressedCallback,
    onButtonClicked: onButtonClickedCallback,
    tr,
    ListItemRender: ListItemRenderRef.current,
    onAddContact,
    menuRef,
    alertRef,
    onRequestCloseMenu: closeMenu
  };
}
//# sourceMappingURL=NewRequests.hooks.js.map