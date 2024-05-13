"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useConversationListMoreActions = useConversationListMoreActions;
var React = _interopRequireWildcard(require("react"));
var _i18n = require("../../i18n");
var _useCloseMenu = require("./useCloseMenu");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function useConversationListMoreActions(props) {
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
  } = (0, _useCloseMenu.useCloseMenu)({
    menuRef
  });
  const {
    tr
  } = (0, _i18n.useI18nContext)();
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