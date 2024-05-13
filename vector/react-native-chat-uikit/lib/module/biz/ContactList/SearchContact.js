function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import * as React from 'react';
import { ListSearch } from '../ListSearch';
import { useSearchContact } from './SearchContact.hooks';
/**
 * Search Contacts component.
 */
export function SearchContact(props) {
  const {
    containerStyle,
    searchType
  } = props;
  const {
    data,
    onClicked,
    onCancel
  } = useSearchContact(props);
  return /*#__PURE__*/React.createElement(ListSearch, _extends({}, props, {
    initData: data,
    onCancel: onCancel,
    containerStyle: containerStyle,
    searchType: searchType,
    onClicked: onClicked
  }));
}
//# sourceMappingURL=SearchContact.js.map