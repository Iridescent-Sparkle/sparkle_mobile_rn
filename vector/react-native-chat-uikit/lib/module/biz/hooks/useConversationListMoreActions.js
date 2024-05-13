import * as React from 'react';
import { useI18nContext } from '../../i18n';
import { useCloseMenu } from './useCloseMenu';
export function useConversationListMoreActions(props) {
  const {
    onClickedNewConversation,
    onClickedNewGroup,
    onClickedNewContact,
    menuRef,
    alertRef,
    onInit,
    onAddContact
  } = props;
  const {
    closeMenu
  } = useCloseMenu({
    menuRef
  });
  const {
    tr
  } = useI18nContext();
  const onShowMenu = React.useCallback(() => {
    var _menuRef$current, _menuRef$current$star;
    let items = [{
      name: '_uikit_contact_menu_new_conv',
      isHigh: false,
      icon: 'bubble_fill',
      onClicked: () => {
        closeMenu(() => {
          onClickedNewConversation === null || onClickedNewConversation === void 0 ? void 0 : onClickedNewConversation();
        });
      }
    }, {
      name: '_uikit_contact_menu_add_contact',
      isHigh: false,
      icon: 'person_add_fill',
      onClicked: () => {
        closeMenu(() => {
          if (onClickedNewContact) {
            onClickedNewContact();
          } else {
            var _alertRef$current, _alertRef$current$ale;
            (_alertRef$current = alertRef.current) === null || _alertRef$current === void 0 ? void 0 : (_alertRef$current$ale = _alertRef$current.alertWithInit) === null || _alertRef$current$ale === void 0 ? void 0 : _alertRef$current$ale.call(_alertRef$current, {
              title: tr('_uikit_contact_alert_title'),
              message: tr('_uikit_contact_alert_content'),
              supportInput: true,
              isSaveInput: false,
              enableClearButton: true,
              autoFocus: true,
              buttons: [{
                text: tr('cancel'),
                onPress: () => {
                  var _alertRef$current2, _alertRef$current2$cl;
                  (_alertRef$current2 = alertRef.current) === null || _alertRef$current2 === void 0 ? void 0 : (_alertRef$current2$cl = _alertRef$current2.close) === null || _alertRef$current2$cl === void 0 ? void 0 : _alertRef$current2$cl.call(_alertRef$current2);
                }
              }, {
                text: tr('add'),
                isPreferred: true,
                onPress: value => {
                  var _alertRef$current3, _alertRef$current3$cl;
                  (_alertRef$current3 = alertRef.current) === null || _alertRef$current3 === void 0 ? void 0 : (_alertRef$current3$cl = _alertRef$current3.close) === null || _alertRef$current3$cl === void 0 ? void 0 : _alertRef$current3$cl.call(_alertRef$current3, () => {
                    if (value) onAddContact(value);
                  });
                }
              }]
            });
          }
        });
      }
    }, {
      name: '_uikit_contact_menu_create_group',
      isHigh: false,
      icon: 'person_double_fill',
      onClicked: () => {
        closeMenu(() => {
          onClickedNewGroup === null || onClickedNewGroup === void 0 ? void 0 : onClickedNewGroup();
        });
      }
    }];
    items = onInit ? onInit(items) : items;
    (_menuRef$current = menuRef.current) === null || _menuRef$current === void 0 ? void 0 : (_menuRef$current$star = _menuRef$current.startShowWithProps) === null || _menuRef$current$star === void 0 ? void 0 : _menuRef$current$star.call(_menuRef$current, {
      initItems: items,
      onRequestModalClose: closeMenu,
      layoutType: 'left',
      hasCancel: false
    });
  }, [alertRef, closeMenu, menuRef, onAddContact, onClickedNewContact, onClickedNewConversation, onClickedNewGroup, onInit, tr]);
  return {
    onShowConversationListMoreActions: onShowMenu
  };
}
//# sourceMappingURL=useConversationListMoreActions.js.map