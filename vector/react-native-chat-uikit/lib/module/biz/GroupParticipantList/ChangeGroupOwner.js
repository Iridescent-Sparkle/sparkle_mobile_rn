function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import * as React from 'react';
import { useChatContext } from '../../chat';
import { GroupParticipantList } from './GroupParticipantList';

/**
 * Change Group Owner Component properties.
 */

/**
 * Change Group Owner Component.
 */
export function ChangeGroupOwner(props) {
  const {
    groupId,
    onChangeResult
  } = props;
  const im = useChatContext();
  const onChangeOwnerCallback = React.useCallback(data => {
    im.getGroupInfo({
      groupId,
      onResult: result => {
        if (result.isOk === true && result.value) {
          if (result.value.owner !== (data === null || data === void 0 ? void 0 : data.memberId) && data !== null && data !== void 0 && data.memberId) {
            im.changeGroupOwner({
              groupId,
              newOwnerId: data.memberId,
              onResult: result => {
                onChangeResult === null || onChangeResult === void 0 ? void 0 : onChangeResult({
                  isOk: result.isOk,
                  value: data.memberId,
                  error: result.error
                });
              }
            });
          }
        }
      }
    });
  }, [groupId, im, onChangeResult]);
  return /*#__PURE__*/React.createElement(GroupParticipantList, _extends({
    participantType: 'change-owner',
    onChangeOwner: onChangeOwnerCallback
  }, props));
}
//# sourceMappingURL=ChangeGroupOwner.js.map