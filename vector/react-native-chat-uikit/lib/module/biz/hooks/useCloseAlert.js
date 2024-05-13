import * as React from 'react';
/**
 * use close alert
 */
export function useCloseAlert(props) {
  const {
    alertRef
  } = props;
  const closeAlert = React.useCallback(onFinished => {
    var _alertRef$current, _alertRef$current$clo;
    (_alertRef$current = alertRef.current) === null || _alertRef$current === void 0 ? void 0 : (_alertRef$current$clo = _alertRef$current.close) === null || _alertRef$current$clo === void 0 ? void 0 : _alertRef$current$clo.call(_alertRef$current, () => {
      onFinished === null || onFinished === void 0 ? void 0 : onFinished();
    });
  }, [alertRef]);
  return {
    closeAlert
  };
}
//# sourceMappingURL=useCloseAlert.js.map