import { useChatContext } from '../../chat';
import { useI18nContext } from '../../i18n';
import { useCloseAlert } from './useCloseAlert';
import { useCloseMenu } from './useCloseMenu';
export function useMineInfoActions(props) {
  const {
    menuRef,
    alertRef
  } = props;
  const {
    closeMenu
  } = useCloseMenu({
    menuRef
  });
  const {} = useCloseAlert({
    alertRef
  });
  const {} = useI18nContext();
  const im = useChatContext();
  const onShowMenu = () => {
    var _menuRef$current;
    (_menuRef$current = menuRef.current) === null || _menuRef$current === void 0 ? void 0 : _menuRef$current.startShowWithProps({
      onRequestModalClose: closeMenu,
      layoutType: 'center',
      hasCancel: true,
      initItems: [{
        name: 'Online',
        isHigh: false,
        onClicked: () => {
          closeMenu(() => {
            im.publishPresence({
              status: 'online',
              onResult: () => {}
            });
          });
        }
      }, {
        name: 'Busy',
        isHigh: false,
        onClicked: () => {
          closeMenu(() => {
            im.publishPresence({
              status: 'busy',
              onResult: () => {}
            });
          });
        }
      }, {
        name: 'Leave',
        isHigh: false,
        onClicked: () => {
          closeMenu(() => {
            im.publishPresence({
              status: 'leave',
              onResult: () => {}
            });
          });
        }
      }, {
        name: 'Not Disturb',
        isHigh: false,
        onClicked: () => {
          closeMenu(() => {
            im.publishPresence({
              status: 'no-disturb',
              onResult: () => {}
            });
          });
        }
      }]
    });
  };
  return {
    onShowMineInfoActions: onShowMenu
  };
}
//# sourceMappingURL=useMineInfoActions.js.map