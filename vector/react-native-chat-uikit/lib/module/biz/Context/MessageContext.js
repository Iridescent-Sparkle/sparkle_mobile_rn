import * as React from 'react';
import { timeoutTask } from '../../utils';
/**
 * Context of the Message.
 */
export const MessageContext = /*#__PURE__*/React.createContext(undefined);
MessageContext.displayName = 'UIKitMessageContext';

/**
 * Properties of the Message context.
 */

/**
 * The Message context's provider.
 */
export function MessageContextProvider(_ref) {
  let {
    value,
    children
  } = _ref;
  const {} = value;
  const _value = React.useMemo(() => {
    const _list = new Map();
    const _listeners = new Set();
    return {
      addListener: onUpdateUserInfo => {
        _listeners.add(onUpdateUserInfo);
        const deleter = () => {
          _listeners.delete(onUpdateUserInfo);
        };
        return deleter;
      },
      getUserInfo: userId => {
        return _list.get(userId);
      },
      dispatchUserInfo: params => {
        _list.set(params.userId, {
          userName: params.userName,
          userAvatar: params.userAvatar
        });
        timeoutTask(0, () => {
          _listeners.forEach(listener => {
            listener(params);
          });
        });
      }
    };
  }, []);
  return /*#__PURE__*/React.createElement(MessageContext.Provider, {
    value: _value
  }, children);
}

/**
 * Get the Message context's value.
 * @returns The Message context's value.
 */
export function useMessageContext() {
  const msg = React.useContext(MessageContext);
  if (!msg) throw Error(`${MessageContext.displayName} is not provided`);
  return msg;
}
//# sourceMappingURL=MessageContext.js.map