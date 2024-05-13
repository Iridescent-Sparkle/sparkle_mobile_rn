import { useI18nContext } from '../../i18n';
import { useCloseMenu } from './useCloseMenu';
/**
 * use contact info actions.
 *
 * Normally the default menu is displayed.
 */
export function useContactInfoActions(props) {
  const {
    menuRef,
    alertRef,
    onInit,
    onRemoveContact
  } = props;
  const {
    closeMenu
  } = useCloseMenu({
    menuRef
  });
  const {
    tr
  } = useI18nContext();
  const onShowMenu = (userId, userName) => {
    var _menuRef$current2;
    let items = [{
      name: '_uikit_info_menu_del_contact',
      isHigh: true,
      onClicked: () => {
        var _menuRef$current, _menuRef$current$star;
        (_menuRef$current = menuRef.current) === null || _menuRef$current === void 0 ? void 0 : (_menuRef$current$star = _menuRef$current.startHide) === null || _menuRef$current$star === void 0 ? void 0 : _menuRef$current$star.call(_menuRef$current, () => {
          var _alertRef$current;
          (_alertRef$current = alertRef.current) === null || _alertRef$current === void 0 ? void 0 : _alertRef$current.alertWithInit({
            title: tr('_uikit_info_alert_title_delete_contact'),
            message: tr('_uikit_info_alert_content_delete_contact', userName ?? userId),
            buttons: [{
              text: tr('cancel'),
              onPress: () => {
                var _alertRef$current2, _alertRef$current2$cl;
                (_alertRef$current2 = alertRef.current) === null || _alertRef$current2 === void 0 ? void 0 : (_alertRef$current2$cl = _alertRef$current2.close) === null || _alertRef$current2$cl === void 0 ? void 0 : _alertRef$current2$cl.call(_alertRef$current2);
              }
            }, {
              text: tr('confirm'),
              isPreferred: true,
              onPress: () => {
                var _alertRef$current3, _alertRef$current3$cl;
                (_alertRef$current3 = alertRef.current) === null || _alertRef$current3 === void 0 ? void 0 : (_alertRef$current3$cl = _alertRef$current3.close) === null || _alertRef$current3$cl === void 0 ? void 0 : _alertRef$current3$cl.call(_alertRef$current3, () => {
                  onRemoveContact === null || onRemoveContact === void 0 ? void 0 : onRemoveContact(userId);
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
      layoutType: 'center',
      hasCancel: true,
      initItems: items
    });
  };
  return {
    onShowContactInfoActions: onShowMenu
  };
}
//# sourceMappingURL=useContactInfoActions.js.map