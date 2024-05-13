"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useMineInfoActions = useMineInfoActions;
var _chat = require("../../chat");
var _i18n = require("../../i18n");
var _useCloseAlert = require("./useCloseAlert");
var _useCloseMenu = require("./useCloseMenu");
function useMineInfoActions(props) {
  const {
    menuRef,
    alertRef
  } = props;
  const {
    closeMenu
  } = (0, _useCloseMenu.useCloseMenu)({
    menuRef
  });
  const {} = (0, _useCloseAlert.useCloseAlert)({
    alertRef
  });
  const {} = (0, _i18n.useI18nContext)();
  const im = (0, _chat.useChatContext)();
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