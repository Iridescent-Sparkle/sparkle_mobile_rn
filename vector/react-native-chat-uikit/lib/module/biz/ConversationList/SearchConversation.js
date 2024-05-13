import * as React from 'react';
import { ListSearch } from '../ListSearch';
import { useSearchConversation } from './SearchConversation.hooks';
export function SearchConversation(props) {
  const {
    onCancel,
    containerStyle
  } = props;
  const {
    data,
    onClicked
  } = useSearchConversation(props);
  return /*#__PURE__*/React.createElement(ListSearch, {
    initData: data,
    onCancel: onCancel,
    containerStyle: containerStyle,
    searchType: 'conv-list',
    onClicked: onClicked
  });
}
//# sourceMappingURL=SearchConversation.js.map