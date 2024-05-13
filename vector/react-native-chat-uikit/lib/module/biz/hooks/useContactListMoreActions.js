import { useI18nContext } from '../../i18n';
/**
 * use contact list more actions.
 *
 * Normally the default menu is displayed.
 */
export function useContactListMoreActions(props) {
  const {
    alertRef
  } = props;
  const {
    tr
  } = useI18nContext();
  const onShowAlert = onAddContact => {
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
  };
  return {
    onShowContactListMoreActions: onShowAlert
  };
}
//# sourceMappingURL=useContactListMoreActions.js.map