import * as React from 'react';
/**
 * use close menu.
 */
export function useCloseMenu(props) {
  const {
    menuRef
  } = props;
  const closeMenu = React.useCallback(onFinished => {
    var _menuRef$current, _menuRef$current$star;
    (_menuRef$current = menuRef.current) === null || _menuRef$current === void 0 ? void 0 : (_menuRef$current$star = _menuRef$current.startHide) === null || _menuRef$current$star === void 0 ? void 0 : _menuRef$current$star.call(_menuRef$current, () => {
      onFinished === null || onFinished === void 0 ? void 0 : onFinished();
    });
  }, [menuRef]);
  return {
    closeMenu
  };
}
//# sourceMappingURL=useCloseMenu.js.map