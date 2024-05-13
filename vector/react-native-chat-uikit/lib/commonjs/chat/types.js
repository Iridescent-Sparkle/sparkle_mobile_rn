"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DisconnectReasonType = void 0;
/**
 * Event type. Usually calling the interface provided by `ChatService` will trigger a callback notification. The event type in the callback notification is the name of the calling interface.
 */
/**
 * The type of disconnect reason.
 */
let DisconnectReasonType = /*#__PURE__*/function (DisconnectReasonType) {
  DisconnectReasonType["token_will_expire"] = "token_will_expire";
  DisconnectReasonType["token_did_expire"] = "token_did_expire";
  DisconnectReasonType["app_active_number_reach_limit"] = "app_active_number_reach_limit";
  DisconnectReasonType["user_did_login_from_other_device"] = "user_did_login_from_other_device";
  DisconnectReasonType["user_did_remove_from_server"] = "user_did_remove_from_server";
  DisconnectReasonType["user_did_forbid_by_server"] = "user_did_forbid_by_server";
  DisconnectReasonType["user_did_change_password"] = "user_did_change_password";
  DisconnectReasonType["user_did_login_too_many_device"] = "user_did_login_too_many_device";
  DisconnectReasonType["user_kicked_by_other_device"] = "user_kicked_by_other_device";
  DisconnectReasonType["user_authentication_failed"] = "user_authentication_failed";
  DisconnectReasonType["others"] = "others";
  return DisconnectReasonType;
}({});
/**
 * The callback type of the calling interface. Might return a result if the call completes, or an error object if it fails.
 */
/**
 * The type of data model.
 */
/**
 * The type of data model.
 */
/**
 * User from type.
 */
/**
 * The type of user data.
 */
/**
 * The type of user data.
 */
/**
 * The type of client listener.
 */
/**
 * The type of message listener.
 */
/**
 * The type of conversation listener.
 */
/**
 * The type of group listener.
 */
/**
 * The type of contact listener.
 */
/**
 * The type of presence listener.
 */
/**
 * The type of custom listener.
 */
/**
 * The type of multi device state listener.
 */
/**
 * When calling the `ChatService` common interface, the corresponding event will be triggered. Events before calling the interface, calling completion events and calling failure events.
 */
/**
 * A collection of listeners.
 *
 * You can use one or more listeners, for example: only care about changes in the contact list.
 *
 * @example
 *
 * ```tsx
 * React.useEffect(() => {
 *   const listener: ContactServiceListener = {
 *     onContactAdded: async (_userId: string) => {
 *       if (userId === _userId) {
 *         setIsContact(true);
 *       }
 *     },
 *     onContactDeleted: async (_userId: string) => {
 *       if (userId === _userId) {
 *         setIsContact(false);
 *       }
 *     },
 *   };
 *   im.addListener(listener);
 *   return () => {
 *     im.removeListener(listener);
 *   };
 * }, [im, userId]);
 * ```
 */
/**
 * The type of conversation service.
 */
/**
 * The type of contact service.
 */
/**
 * The type of user service.
 */
/**
 * The type of message service.
 */
/**
 * The type of presence service.
 */
/**
 * The type of chat service.
 *
 * Interfaces are mainly divided into two categories: synchronous method and asynchronous method. Synchronous method may throw exceptions, but asynchronous method do not. The main difference between them is whether `ResultCallback` is included in the parameters.
 */
/**
 * ChatOptionsType is the initialization parameters of ChatService.
 *
 * appKey, autoLogin and debugModel is required.
 *
 * This parameter option is consistent with `Agora Chat SDK`.
 *
 */
/**
 * ChatServiceInit is the initialization parameters of ChatService.
 */
exports.DisconnectReasonType = DisconnectReasonType;
//# sourceMappingURL=types.js.map