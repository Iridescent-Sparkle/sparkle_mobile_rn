"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UIListenerType = void 0;
let UIListenerType = /*#__PURE__*/function (UIListenerType) {
  UIListenerType["Conversation"] = "ConversationModel";
  UIListenerType["Contact"] = "ContactModel";
  UIListenerType["Group"] = "GroupModel";
  UIListenerType["GroupParticipant"] = "GroupParticipantModel";
  UIListenerType["NewRequest"] = "NewRequestModel";
  return UIListenerType;
}({});
/**
 * The state of the new request.
 */
/**
 * Used when making multiple or single selections.
 */
/**
 * ConversationModel: The data model of the conversation list UI component.
 */
/**
 * ContactModel: The data model of the contact list UI component.
 */
/**
 * GroupModel: The data model of the group list UI component.
 */
/**
 * GroupParticipantModel: The data model of the group member list UI component.
 */
/**
 * NewRequestModel: The data model of the new request notification list UI component.
 */
/**
 * The UI component will pay attention to the listener and refresh the UI when the data changes. For example: conversation list, contact list, group list, group member list, new request notification list, etc.
 *
 * DataModel: The data model of the UI component. For example: ConversationModel, ContactModel, GroupModel, etc. {@link ConversationModel} {@link ContactModel} {@link GroupModel} {@link GroupParticipantModel} {@link NewRequestModel}
 */
exports.UIListenerType = UIListenerType;
//# sourceMappingURL=types.ui.js.map