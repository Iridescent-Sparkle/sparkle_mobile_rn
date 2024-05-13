function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import * as React from 'react';
import { GroupParticipantList } from './GroupParticipantList';
export function SelectSingleParticipant(props) {
  const {
    onSelectResult
  } = props;
  const onSelectedSingle = React.useCallback(data => {
    onSelectResult === null || onSelectResult === void 0 ? void 0 : onSelectResult({
      isOk: true,
      value: data,
      error: undefined
    });
  }, [onSelectResult]);
  return /*#__PURE__*/React.createElement(GroupParticipantList, _extends({
    participantType: 'mention',
    onClickedItem: onSelectedSingle
  }, props));
}
//# sourceMappingURL=SelectSingleParticipant.js.map