import * as React from 'react';
import { ListSearch } from '../ListSearch';
export function SearchGroup(props) {
  const {
    onCancel,
    containerStyle
  } = props;
  return /*#__PURE__*/React.createElement(ListSearch, {
    initData: [],
    onCancel: onCancel,
    containerStyle: containerStyle,
    searchType: 'group-list'
  });
}
//# sourceMappingURL=SearchGroup.js.map