import * as React from 'react';
import { ListSearch } from '../ListSearch';
import { UseSearchGroupParticipant } from './SearchGroupParticipant.hooks';
export function SearchGroupParticipant(props) {
  const {
    onCancel,
    containerStyle
  } = props;
  const {
    data,
    onClicked
  } = UseSearchGroupParticipant(props);
  return /*#__PURE__*/React.createElement(ListSearch, {
    initData: data,
    onCancel: onCancel,
    containerStyle: containerStyle,
    searchType: 'group-list',
    onClicked: onClicked
  });
}
//# sourceMappingURL=SearchGroupParticipant.js.map