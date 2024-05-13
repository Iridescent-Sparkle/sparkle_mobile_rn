function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import * as React from 'react';
import { FlatList as RNFlatList, View } from 'react-native';
import { getElement } from '../../hook';
export const _FlatList = (props, ref) => {
  const {
    ListErrorComponent,
    ListLoadingComponent
  } = props;
  return /*#__PURE__*/React.createElement(View, {
    style: {
      flexGrow: 1
    }
  }, /*#__PURE__*/React.createElement(RNFlatList, _extends({
    ref: ref
  }, props)), getElement(ListErrorComponent), getElement(ListLoadingComponent));
};

/**
 * @example
 *
 * export const FlatList = FlatListFactory<{ id: string }>();
 * export function FlatList() {}
 * @returns
 */
export function FlatListFactory() {
  return /*#__PURE__*/React.forwardRef(_FlatList);
}
//# sourceMappingURL=FlatList.js.map