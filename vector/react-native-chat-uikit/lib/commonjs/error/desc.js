"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ErrorDescription = void 0;
let ErrorDescription = /*#__PURE__*/function (ErrorDescription) {
  ErrorDescription["none"] = "no error";
  ErrorDescription["common"] = "common error";
  ErrorDescription["enum"] = "type not support";
  ErrorDescription["existed"] = "object has existed.";
  ErrorDescription["params"] = "input parameters are invalid.";
  ErrorDescription["max_count"] = "Maximum quantity limit exceeded.";
  ErrorDescription["network"] = "network error.";
  ErrorDescription["chat_sdk"] = "chat sdk error.";
  ErrorDescription["chat_uikit"] = "chat uikit error.";
  ErrorDescription["chat_callkit"] = "chat callkit error.";
  ErrorDescription["chatroom_uikit"] = "chatroom uikit error.";
  ErrorDescription["init_error"] = "An initialization error occurred.";
  ErrorDescription["login_error"] = "A login error occurred.";
  ErrorDescription["logout_error"] = "A log out error occurred.";
  ErrorDescription["refresh_token_error"] = "refresh token error occurred.";
  ErrorDescription["network_error"] = "A network error occurred.";
  ErrorDescription["ui_error"] = "An error occurred in the UI.";
  ErrorDescription["not_impl"] = "The code has not been implemented yet and is under development.";
  ErrorDescription["msg_send_error"] = "message send failed.";
  ErrorDescription["msg_recall_error"] = "message recall failed.";
  ErrorDescription["msg_translate_error"] = "message translate failed.";
  ErrorDescription["msg_report_error"] = "message report failed.";
  ErrorDescription["get_all_conversations_error"] = "get all conversations failed.";
  ErrorDescription["room_join_error"] = "join chatroom failed.";
  ErrorDescription["room_leave_error"] = "leave chatroom failed.";
  ErrorDescription["room_kick_member_error"] = "kick member in chatroom is failed.";
  ErrorDescription["room_mute_member_error"] = "mute member in chatroom is failed.";
  ErrorDescription["room_unmute_member_error"] = "unmute member in chatroom is failed.";
  ErrorDescription["room_fetch_member_list_error"] = "fetch member list in chatroom is failed.";
  ErrorDescription["room_fetch_mute_member_list_error"] = "fetch mute member list in chatroom is failed.";
  ErrorDescription["room_fetch_member_info_error"] = "fetch member detail in chatroom is failed.";
  ErrorDescription["room_fetch_room_list_error"] = "fetch room list in chatroom is failed.";
  ErrorDescription["room_upload_user_info_error"] = "upload self user info is failed.";
  return ErrorDescription;
}({});
exports.ErrorDescription = ErrorDescription;
//# sourceMappingURL=desc.js.map