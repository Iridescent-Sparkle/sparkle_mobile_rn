import { useI18nContext } from '../../i18n';
import { useCloseAlert } from './useCloseAlert';
import { useCloseMenu } from './useCloseMenu';
export function useGroupInfoActions(props) {
  const {
    menuRef,
    alertRef,
    onQuitGroup,
    onDestroyGroup,
    onClickedChangeGroupOwner,
    onInit
  } = props;
  const {
    closeMenu
  } = useCloseMenu({
    menuRef
  });
  const {
    closeAlert
  } = useCloseAlert({
    alertRef
  });
  const {
    tr
  } = useI18nContext();
  const onShowMenu = (userId, ownerId, groupId) => {
    if (userId !== ownerId) {
      var _menuRef$current;
      let items = [{
        name: tr('_uikit_info_menu_quit_group'),
        isHigh: true,
        onClicked: () => {
          closeMenu(() => {
            var _alertRef$current;
            (_alertRef$current = alertRef.current) === null || _alertRef$current === void 0 ? void 0 : _alertRef$current.alertWithInit({
              title: tr('_uikit_info_alert_quit_group_title'),
              message: tr('_uikit_info_alert_quit_group_content'),
              buttons: [{
                text: tr('cancel'),
                onPress: () => {
                  closeAlert();
                }
              }, {
                text: tr('Quit'),
                isPreferred: true,
                onPress: () => {
                  closeAlert(() => {
                    onQuitGroup === null || onQuitGroup === void 0 ? void 0 : onQuitGroup(groupId);
                  });
                }
              }]
            });
          });
        }
      }];
      items = onInit ? onInit(items) : items;
      (_menuRef$current = menuRef.current) === null || _menuRef$current === void 0 ? void 0 : _menuRef$current.startShowWithProps({
        onRequestModalClose: closeMenu,
        hasCancel: true,
        layoutType: 'center',
        initItems: items
      });
    } else {
      var _menuRef$current2;
      let items = [{
        name: tr('_uikit_info_menu_change_group_owner'),
        isHigh: false,
        onClicked: () => {
          closeMenu(() => {
            onClickedChangeGroupOwner === null || onClickedChangeGroupOwner === void 0 ? void 0 : onClickedChangeGroupOwner(groupId, ownerId);
          });
        }
      }, {
        name: tr('_uikit_info_menu_destroy_group'),
        isHigh: true,
        onClicked: () => {
          closeMenu(() => {
            var _alertRef$current2;
            (_alertRef$current2 = alertRef.current) === null || _alertRef$current2 === void 0 ? void 0 : _alertRef$current2.alertWithInit({
              title: tr('_uikit_info_alert_destroy_group_title'),
              message: tr('_uikit_info_alert_destroy_group_content'),
              buttons: [{
                text: tr('cancel'),
                onPress: () => {
                  closeAlert();
                }
              }, {
                text: tr('confirm'),
                isPreferred: true,
                onPress: () => {
                  closeAlert(() => {
                    onDestroyGroup === null || onDestroyGroup === void 0 ? void 0 : onDestroyGroup(groupId);
                  });
                }
              }]
            });
          });
        }
      }];
      items = onInit ? onInit(items) : items;
      (_menuRef$current2 = menuRef.current) === null || _menuRef$current2 === void 0 ? void 0 : _menuRef$current2.startShowWithProps({
        onRequestModalClose: closeMenu,
        hasCancel: true,
        layoutType: 'center',
        initItems: items
      });
    }
  };
  return {
    onShowGroupInfoActions: onShowMenu,
    menuRef,
    alertRef
  };
}
//# sourceMappingURL=useGroupInfoActions.js.map