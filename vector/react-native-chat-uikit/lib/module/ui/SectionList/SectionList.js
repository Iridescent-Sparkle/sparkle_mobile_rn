function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import * as React from 'react';
import { SectionList as RNSectionList, View } from 'react-native';
import { getElement } from '../../hook';
export const _SectionList = (props, ref) => {
  const {
    ListErrorComponent,
    ListLoadingComponent
  } = props;
  return /*#__PURE__*/React.createElement(View, {
    style: {
      flexGrow: 1
    }
  }, /*#__PURE__*/React.createElement(RNSectionList, _extends({
    ref: ref
  }, props)), getElement(ListErrorComponent), getElement(ListLoadingComponent));
};

/**
 * @example
 *
 * export const SectionList = SectionListFactory<{ id: string }>();
 * export function SectionList() {}
 */
export function SectionListFactory() {
  return /*#__PURE__*/React.forwardRef(_SectionList);
}
//# sourceMappingURL=SectionList.js.map