"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChangeGroupOwner = ChangeGroupOwner;
var React = _interopRequireWildcard(require("react"));
var _chat = require("../../chat");
var _GroupParticipantList = require("./GroupParticipantList");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
/**
 * Change Group Owner Component properties.
 */

/**
 * Change Group Owner Component.
 */
function ChangeGroupOwner(props) {
  const {
    groupId,
    onChangeResult
  } = props;
  const im = (0, _chat.useChatContext)();
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
  return /*#__PURE__*/React.createElement(_GroupParticipantList.GroupParticipantList, _extends({
    participantType: 'change-owner',
    onChangeOwner: onChangeOwnerCallback
  }, props));
}
//# sourceMappingURL=ChangeGroupOwner.js.map