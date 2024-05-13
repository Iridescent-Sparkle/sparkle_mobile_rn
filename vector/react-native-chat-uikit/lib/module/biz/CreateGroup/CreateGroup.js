function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import * as React from 'react';
import { ContactList } from '../ContactList';
import { useCreateGroup } from './CreateGroup.hooks';
/**
 * Create Group Component.
 */
export function CreateGroup(props) {
  const {
    onCreateGroupResultValue
  } = useCreateGroup(props);
  return /*#__PURE__*/React.createElement(ContactList, _extends({
    contactType: 'create-group',
    onCreateGroupResultValue: onCreateGroupResultValue
  }, props));
}
//# sourceMappingURL=CreateGroup.js.map