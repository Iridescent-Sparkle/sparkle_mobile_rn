"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UseSearchGroupParticipant = UseSearchGroupParticipant;
var _chat = require("../../chat");
var _List = require("../List");
function UseSearchGroupParticipant(props) {
  const {
    groupId,
    onClicked,
    testMode
  } = props;
  const flatListProps = (0, _List.useFlatList)({
    onInit: () => init()
  });
  const {
    dataRef
  } = flatListProps;
  const im = (0, _chat.useChatContext)();
  const init = async () => {
    if (testMode === 'only-ui') {} else {
      const owner = await im.getGroupOwner({
        groupId
      });
      im.getGroupAllMembers({
        groupId: groupId,
        owner,
        onResult: result => {
          const {
            isOk,
            value,
            error
          } = result;
          if (isOk === true && value) {
            dataRef.current = value.map(item => {
              return {
                ...item,
                memberId: item.memberId,
                memberName: item.memberName ?? item.memberId,
                isOwner: item.memberId === (owner === null || owner === void 0 ? void 0 : owner.memberId)
              };
            });
          } else {
            if (error) {
              im.sendError({
                error
              });
            }
          }
        }
      });
    }
  };
  return {
    ...flatListProps,
    onClicked
  };
}
//# sourceMappingURL=SearchGroupParticipant.hooks.js.map