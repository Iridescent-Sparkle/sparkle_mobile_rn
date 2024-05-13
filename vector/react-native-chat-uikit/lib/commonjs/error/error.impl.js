"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDescription = getDescription;
var _code = require("./code");
var _desc = require("./desc");
function getDescription(code) {
  let ret = _desc.ErrorDescription.none;
  switch (code) {
    case _code.ErrorCode.none:
      ret = _desc.ErrorDescription.none;
      break;
    case _code.ErrorCode.common:
      ret = _desc.ErrorDescription.common;
      break;
    case _code.ErrorCode.enum:
      ret = _desc.ErrorDescription.enum;
      break;
    case _code.ErrorCode.existed:
      ret = _desc.ErrorDescription.existed;
      break;
    case _code.ErrorCode.params:
      ret = _desc.ErrorDescription.params;
      break;
    case _code.ErrorCode.max_count:
      ret = _desc.ErrorDescription.max_count;
      break;
    case _code.ErrorCode.network:
      ret = _desc.ErrorDescription.network;
      break;
    case _code.ErrorCode.chat_sdk:
      ret = _desc.ErrorDescription.chat_sdk;
      break;
    case _code.ErrorCode.chat_uikit:
      ret = _desc.ErrorDescription.chat_uikit;
      break;
    case _code.ErrorCode.chat_callkit:
      ret = _desc.ErrorDescription.chat_callkit;
      break;
    case _code.ErrorCode.chatroom_uikit:
      ret = _desc.ErrorDescription.chatroom_uikit;
      break;
    case _code.ErrorCode.init_error:
      ret = _desc.ErrorDescription.init_error;
      break;
    case _code.ErrorCode.login_error:
      ret = _desc.ErrorDescription.login_error;
      break;
    case _code.ErrorCode.logout_error:
      ret = _desc.ErrorDescription.logout_error;
      break;
    case _code.ErrorCode.refresh_token_error:
      ret = _desc.ErrorDescription.refresh_token_error;
      break;
    case _code.ErrorCode.network_error:
      ret = _desc.ErrorDescription.network_error;
      break;
    case _code.ErrorCode.ui_error:
      ret = _desc.ErrorDescription.ui_error;
      break;
    case _code.ErrorCode.not_impl:
      ret = _desc.ErrorDescription.not_impl;
      break;
    case _code.ErrorCode.msg_send_error:
      ret = _desc.ErrorDescription.msg_send_error;
      break;
    case _code.ErrorCode.msg_recall_error:
      ret = _desc.ErrorDescription.msg_recall_error;
      break;
    case _code.ErrorCode.msg_translate_error:
      ret = _desc.ErrorDescription.msg_translate_error;
      break;
    case _code.ErrorCode.msg_report_error:
      ret = _desc.ErrorDescription.msg_report_error;
      break;
    case _code.ErrorCode.get_all_conversations_error:
      ret = _desc.ErrorDescription.get_all_conversations_error;
      break;
    case _code.ErrorCode.room_join_error:
      ret = _desc.ErrorDescription.room_join_error;
      break;
    case _code.ErrorCode.room_leave_error:
      ret = _desc.ErrorDescription.room_leave_error;
      break;
    case _code.ErrorCode.room_kick_member_error:
      ret = _desc.ErrorDescription.room_kick_member_error;
      break;
    case _code.ErrorCode.room_mute_member_error:
      ret = _desc.ErrorDescription.room_mute_member_error;
      break;
    case _code.ErrorCode.room_unmute_member_error:
      ret = _desc.ErrorDescription.room_unmute_member_error;
      break;
    case _code.ErrorCode.room_fetch_member_list_error:
      ret = _desc.ErrorDescription.room_fetch_member_list_error;
      break;
    case _code.ErrorCode.room_fetch_mute_member_list_error:
      ret = _desc.ErrorDescription.room_fetch_mute_member_list_error;
      break;
    case _code.ErrorCode.room_fetch_member_info_error:
      ret = _desc.ErrorDescription.room_fetch_member_info_error;
      break;
    case _code.ErrorCode.room_fetch_room_list_error:
      ret = _desc.ErrorDescription.room_fetch_room_list_error;
      break;
    case _code.ErrorCode.room_upload_user_info_error:
      ret = _desc.ErrorDescription.room_upload_user_info_error;
      break;
    default:
      break;
  }
  return ret;
}
//# sourceMappingURL=error.impl.js.map