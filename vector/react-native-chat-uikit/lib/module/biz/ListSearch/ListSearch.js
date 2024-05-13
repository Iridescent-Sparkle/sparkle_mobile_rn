function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import * as React from 'react';
import { View } from 'react-native';
import { FlatListFactory } from '../../ui/FlatList';
import { EmptyPlaceholder } from '../Placeholder';
import { Search } from '../Search';
import { useListSearch } from './ListSearch.hooks';
import { ListSearchItem } from './ListSearch.item';
export function ListSearch(props) {
  const {
    onCancel,
    containerStyle,
    ItemRender,
    searchType
  } = props;
  const FlatList = React.useMemo(() => FlatListFactory(), []);
  const ListSearchItemMemo = React.useMemo(() => ItemRender ? /*#__PURE__*/React.memo(ItemRender) : /*#__PURE__*/React.memo(ListSearchItem), [ItemRender]);
  const [value, setValue] = React.useState('');
  const {
    ref,
    data,
    deferSearch,
    onClicked
  } = useListSearch(props);
  return /*#__PURE__*/React.createElement(View, {
    style: [{
      flexGrow: 1
    }, containerStyle]
  }, /*#__PURE__*/React.createElement(Search, {
    onCancel: onCancel,
    onChangeText: v => {
      setValue(v);
      deferSearch === null || deferSearch === void 0 ? void 0 : deferSearch(v);
    },
    value: value
  }), /*#__PURE__*/React.createElement(View, {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(FlatList, {
    ref: ref,
    style: {
      flexGrow: 1
    },
    contentContainerStyle: {
      flexGrow: 1
    },
    data: data,
    renderItem: info => {
      const {
        item
      } = info;
      return /*#__PURE__*/React.createElement(ListSearchItemMemo, _extends({}, item, {
        onClicked: onClicked,
        searchType: searchType
      }));
    },
    keyExtractor: item => {
      return item.id;
    },
    ListEmptyComponent: EmptyPlaceholder
  })));
}
//# sourceMappingURL=ListSearch.js.map