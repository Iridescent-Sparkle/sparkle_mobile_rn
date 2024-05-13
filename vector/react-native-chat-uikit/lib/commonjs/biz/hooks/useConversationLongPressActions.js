"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useConversationLongPressActions = useConversationLongPressActions;
var _i18n = require("../../i18n");
function useConversationLongPressActions(props) {
  const {
    menuRef,
    alertRef,
    onDisturb,
    onPin,
    onRead,
    onRemove,
    onInit
  } = props;
  const {
    tr
  } = (0, _i18n.useI18nContext)();
  const onShowMenu = conv => {
    var _menuRef$current5, _menuRef$current5$sta;
    let items = [{
      name: conv.doNotDisturb ? 'unmute' : 'mute',
      isHigh: false,
      onClicked: () => {
        var _menuRef$current, _menuRef$current$star;
        onDisturb({
          ...conv,
          doNotDisturb: !conv.doNotDisturb
        });
        (_menuRef$current = menuRef.current) === null || _menuRef$current === void 0 ? void 0 : (_menuRef$current$star = _menuRef$current.startHide) === null || _menuRef$current$star === void 0 ? void 0 : _menuRef$current$star.call(_menuRef$current);
      }
    }, {
      name: conv.isPinned ? 'unpin' : 'pin',
      isHigh: false,
      onClicked: () => {
        var _menuRef$current2, _menuRef$current2$sta;
        onPin({
          ...conv,
          isPinned: !conv.isPinned
        });
        (_menuRef$current2 = menuRef.current) === null || _menuRef$current2 === void 0 ? void 0 : (_menuRef$current2$sta = _menuRef$current2.startHide) === null || _menuRef$current2$sta === void 0 ? void 0 : _menuRef$current2$sta.call(_menuRef$current2);
      }
    }, {
      name: '_uikit_conv_menu_read',
      isHigh: false,
      onClicked: () => {
        var _menuRef$current3, _menuRef$current3$sta;
        onRead({
          ...conv,
          unreadMessageCount: 0
        });
        (_menuRef$current3 = menuRef.current) === null || _menuRef$current3 === void 0 ? void 0 : (_menuRef$current3$sta = _menuRef$current3.startHide) === null || _menuRef$current3$sta === void 0 ? void 0 : _menuRef$current3$sta.call(_menuRef$current3);
      }
    }, {
      name: '_uikit_conv_menu_delete',
      isHigh: true,
      onClicked: () => {
        var _menuRef$current4;
        (_menuRef$current4 = menuRef.current) === null || _menuRef$current4 === void 0 ? void 0 : _menuRef$current4.startHide(() => {
          onShowAlert(conv);
        });
      }
    }];
    items = onInit ? onInit(items) : items;
    (_menuRef$current5 = menuRef.current) === null || _menuRef$current5 === void 0 ? void 0 : (_menuRef$current5$sta = _menuRef$current5.startShowWithInit) === null || _menuRef$current5$sta === void 0 ? void 0 : _menuRef$current5$sta.call(_menuRef$current5, items, {
      title: conv.convName
    });
  };
  const onShowAlert = conv => {
    var _alertRef$current, _alertRef$current$ale;
    (_alertRef$current = alertRef.current) === null || _alertRef$current === void 0 ? void 0 : (_alertRef$current$ale = _alertRef$current.alertWithInit) === null || _alertRef$current$ale === void 0 ? void 0 : _alertRef$current$ale.call(_alertRef$current, {
      title: tr('_uikit_conv_alert_title'),
      buttons: [{
        text: tr('cancel'),
        onPress: () => {
          var _alertRef$current2, _alertRef$current2$cl;
          (_alertRef$current2 = alertRef.current) === null || _alertRef$current2 === void 0 ? void 0 : (_alertRef$current2$cl = _alertRef$current2.close) === null || _alertRef$current2$cl === void 0 ? void 0 : _alertRef$current2$cl.call(_alertRef$current2);
        }
      }, {
        text: tr('remove'),
        isPreferred: true,
        onPress: () => {
          var _alertRef$current3, _alertRef$current3$cl;
          (_alertRef$current3 = alertRef.current) === null || _alertRef$current3 === void 0 ? void 0 : (_alertRef$current3$cl = _alertRef$current3.close) === null || _alertRef$current3$cl === void 0 ? void 0 : _alertRef$current3$cl.call(_alertRef$current3);
          onRemove(conv);
        }
      }]
    });
  };
  return {
    onShowConversationLongPressActions: onShowMenu
  };
}
//# sourceMappingURL=useConversationLongPressActions.js.map