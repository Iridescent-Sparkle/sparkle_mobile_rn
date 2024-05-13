function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import * as React from 'react';
import { useChatContext } from '../../chat';
import { ContactList } from '../ContactList';

/**
 * Add Group Participant Component properties.
 */

/**
 * Add Group Participant Component.
 */
export function AddGroupParticipant(props) {
  const {
    groupId,
    onAddedResult
  } = props;
  const im = useChatContext();
  const onAddGroupParticipantResult = React.useCallback(added => {
    if (added && added.length > 0 && groupId) {
      im.addGroupMembers({
        groupId,
        members: added.map(item => {
          return {
            memberId: item.userId,
            memberName: item.userName,
            memberAvatar: item.userAvatar
          };
        }),
        welcomeMessage: 'Welcome to the group',
        onResult: result => {
          onAddedResult === null || onAddedResult === void 0 ? void 0 : onAddedResult(result);
        }
      });
    }
  }, [groupId, im, onAddedResult]);
  return /*#__PURE__*/React.createElement(ContactList, _extends({
    contactType: 'add-group-member',
    onAddGroupParticipantResult: onAddGroupParticipantResult
  }, props));
}
//# sourceMappingURL=AddGroupParticipant.js.map