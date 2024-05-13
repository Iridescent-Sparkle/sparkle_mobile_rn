"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSearchContact = useSearchContact;
var React = _interopRequireWildcard(require("react"));
var _chat = require("../../chat");
var _List = require("../List");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
// import { DeviceEventEmitter } from 'react-native';

/**
 * Search Contacts component.
 */
function useSearchContact(props) {
  const {
    onClicked,
    testMode,
    searchType,
    onCancel,
    groupId
  } = props;
  const flatListProps = (0, _List.useFlatList)({
    isShowAfterLoaded: false,
    onInit: () => init()
  });
  const im = (0, _chat.useChatContext)();
  const {
    setData,
    isAutoLoad,
    dataRef
  } = flatListProps;
  // const [initialized, setInitialized] = React.useState(false);

  const onCheckClickedCallback = React.useCallback(data => {
    if ((data === null || data === void 0 ? void 0 : data.checked) !== undefined) {
      for (let i = 0; i < dataRef.current.length; i++) {
        const item = dataRef.current[i];
        if (item) {
          if (item.userId === data.userId) {
            dataRef.current[i] = {
              ...item,
              checked: !data.checked
            };
            if (searchType === 'create-group') {
              im.setModelState({
                tag: searchType,
                id: data.userId,
                state: {
                  checked: !data.checked
                }
              });
            } else if (searchType === 'add-group-member') {
              if (groupId) {
                im.setModelState({
                  tag: groupId,
                  id: data.userId,
                  state: {
                    checked: !data.checked
                  }
                });
              }
            }
            setData([...dataRef.current]);
            break;
          }
        }
      }
    }
  }, [dataRef, groupId, im, searchType, setData]);
  const onCancelCallback = React.useCallback(() => {
    if (searchType === 'create-group' || searchType === 'add-group-member') {
      if (onCancel) {
        onCancel([...dataRef.current]);
      }
    } else {
      onCancel === null || onCancel === void 0 ? void 0 : onCancel();
    }
  }, [dataRef, onCancel, searchType]);
  const init = async () => {
    if (testMode === 'only-ui') {
      return;
    }
    if (isAutoLoad === true) {
      im.getAllContacts({
        onResult: result => {
          const {
            isOk,
            value,
            error
          } = result;
          if (isOk === true) {
            if (value) {
              dataRef.current = value.map(item => {
                const getChecked = () => {
                  if (searchType === 'create-group') {
                    var _im$getModelState;
                    return ((_im$getModelState = im.getModelState({
                      tag: searchType,
                      id: item.userId
                    })) === null || _im$getModelState === void 0 ? void 0 : _im$getModelState.checked) ?? false;
                  } else if (searchType === 'add-group-member') {
                    if (groupId) {
                      var _im$getModelState2;
                      const isExisted = im.getGroupMember({
                        groupId,
                        userId: item.userId
                      });
                      const checked = (_im$getModelState2 = im.getModelState({
                        tag: groupId,
                        id: item.userId
                      })) === null || _im$getModelState2 === void 0 ? void 0 : _im$getModelState2.checked;
                      return isExisted !== undefined || (checked !== undefined ? checked : false);
                    }
                  }
                  return undefined;
                };
                const getState = () => {
                  if (groupId && item.userId) {
                    return im.getGroupMember({
                      groupId,
                      userId: item.userId
                    }) !== undefined;
                  }
                  return false;
                };
                return {
                  ...item,
                  id: item.userId,
                  name: item.userName,
                  checked: getChecked(),
                  disable: getState(),
                  onCheckClicked: 'create-group' ? onCheckClickedCallback : undefined
                };
              });
              setData([...dataRef.current]);
              // setInitialized(true);
            }
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
  };
  return {
    ...flatListProps,
    onClicked,
    onCancel: onCancelCallback
  };
}
//# sourceMappingURL=SearchContact.hooks.js.map