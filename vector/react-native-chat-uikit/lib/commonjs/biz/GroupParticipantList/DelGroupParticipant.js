"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DelGroupParticipant = DelGroupParticipant;
var React = _interopRequireWildcard(require("react"));
var _chat = require("../../chat");
var _GroupParticipantList = require("./GroupParticipantList");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
/**
 * Delete Group Participant Component properties.
 */

/**
 * Delete Group Participant Component.
 */
function DelGroupParticipant(props) {
  const {
    groupId,
    onDelResult
  } = props;
  const im = (0, _chat.useChatContext)();
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
  return /*#__PURE__*/React.createElement(_GroupParticipantList.GroupParticipantList, _extends({
    participantType: 'delete',
    onDelParticipant: onDelParticipantCallback
  }, props));
}
//# sourceMappingURL=DelGroupParticipant.js.map