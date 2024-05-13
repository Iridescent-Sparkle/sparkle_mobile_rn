function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import * as React from 'react';
import { useChatContext } from '../../chat';
import { GroupParticipantList } from './GroupParticipantList';

/**
 * Delete Group Participant Component properties.
 */

/**
 * Delete Group Participant Component.
 */
export function DelGroupParticipant(props) {
  const {
    groupId,
    onDelResult
  } = props;
  const im = useChatContext();
  const onDelParticipantCallback = React.useCallback(data => {
    if (data) {
      im.removeGroupMembers({
        groupId,
        members: data.map(item => item.memberId),
        onResult: result => {
          onDelResult === null || onDelResult === void 0 ? void 0 : onDelResult(result);
        }
      });
    }
  }, [groupId, im, onDelResult]);
  return /*#__PURE__*/React.createElement(GroupParticipantList, _extends({
    participantType: 'delete',
    onDelParticipant: onDelParticipantCallback
  }, props));
}
//# sourceMappingURL=DelGroupParticipant.js.map