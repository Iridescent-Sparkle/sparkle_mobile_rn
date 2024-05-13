import { useChatContext } from '../../chat';
import { useFlatList } from '../List';
export function UseSearchGroupParticipant(props) {
  const {
    groupId,
    onClicked,
    testMode
  } = props;
  const flatListProps = useFlatList({
    onInit: () => init()
  });
  const {
    dataRef
  } = flatListProps;
  const im = useChatContext();
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