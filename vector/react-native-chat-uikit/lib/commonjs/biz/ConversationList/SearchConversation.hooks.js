"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSearchConversation = useSearchConversation;
var _reactNativeChatSdk = require("react-native-chat-sdk");
var _chat = require("../../chat");
var _List = require("../List");
function useSearchConversation(props) {
  const {
    onClicked,
    testMode,
    filterEmptyConversation
  } = props;
  const flatListProps = (0, _List.useFlatList)({
    isShowAfterLoaded: false,
    onInit: () => init()
  });
  const {
    setData,
    dataRef,
    isAutoLoad
  } = flatListProps;
  const im = (0, _chat.useChatContext)();
  const init = async () => {
    if (testMode === 'only-ui') {
      const array = Array.from({
        length: 10
      }, (_, index) => ({
        id: index.toString()
      }));
      const testList = array.map((item, i) => {
        return {
          convId: item.id,
          convType: i % 2 === 0 ? 0 : 1,
          convAvatar: 'https://cdn2.iconfinder.com/data/icons/valentines-day-flat-line-1/58/girl-avatar-512.png',
          convName: 'user',
          unreadMessageCount: 1,
          isPinned: i % 2 === 0,
          id: item.id,
          name: item.id + 'name'
        };
      });
      setData(testList);
      return;
    }
    if (isAutoLoad === true) {
      im.getAllConversations({
        onResult: result => {
          const {
            isOk,
            value: list
          } = result;
          if (isOk && list) {
            if (list) {
              for (const conv of list) {
                dataRef.current.push({
                  ...conv,
                  id: conv.convId,
                  name: conv.convName,
                  avatar: conv.convAvatar,
                  type: conv.convType === _reactNativeChatSdk.ChatConversationType.GroupChat ? 'group' : 'user'
                });
              }
              dataRef.current = dataRef.current.filter(item => {
                return item.convId !== _chat.gNewRequestConversationId;
              });
              if (filterEmptyConversation === true) {
                dataRef.current = dataRef.current.filter(item => {
                  return item.lastMessage !== undefined;
                });
              }
              setData([...dataRef.current]);
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
//# sourceMappingURL=SearchConversation.hooks.js.map