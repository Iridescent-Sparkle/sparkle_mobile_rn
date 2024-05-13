import * as React from 'react';
import { useChatContext } from '../../chat';
import { useLifecycle } from '../../hook';
import { useI18nContext } from '../../i18n';
import { useCloseMenu, useContactListMoreActions } from '../hooks';
import { useFlatList } from '../List';
import { NewRequestsItemMemo } from './NewRequests.item';
export function useNewRequests(props) {
  const {
    onClickedItem,
    onLongPressedItem,
    onButtonClicked,
    testMode,
    onSort: propsOnSort,
    ListItemRender: propsListItemRender
  } = props;
  const flatListProps = useFlatList({
    listState: 'normal',
    onInit: () => init()
  });
  const {
    setData,
    dataRef
  } = flatListProps;
  const im = useChatContext();
  const {
    tr
  } = useI18nContext();
  const ListItemRenderRef = React.useRef(propsListItemRender ?? NewRequestsItemMemo);
  const menuRef = React.useRef({});
  const alertRef = React.useRef({});
  const {
    closeMenu
  } = useCloseMenu({
    menuRef
  });
  const {
    onShowContactListMoreActions
  } = useContactListMoreActions({
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
  useLifecycle(state => {
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