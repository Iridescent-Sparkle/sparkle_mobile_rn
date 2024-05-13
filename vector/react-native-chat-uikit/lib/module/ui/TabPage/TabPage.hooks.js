import * as React from 'react';
import { useWindowDimensions } from 'react-native';
export const calculateIndex = params => {
  const {
    width,
    contentOffsetX
  } = params;
  if (Number.isInteger(width) && Number.isInteger(contentOffsetX)) {
    return Math.floor(contentOffsetX / width);
  } else {
    const w = Math.round(width);
    const c = Math.round(contentOffsetX);
    return Math.round(c / w);
  }
};
export const useHeaderStartScrolling = (count, headerRef, initIndex) => {
  const currentIndex = React.useRef(initIndex ?? 0);
  return {
    headerStartScrolling: (width, x) => {
      const index = calculateIndex({
        width: width,
        contentOffsetX: x
      });
      const current = index;
      const pre = currentIndex.current;
      const c = Math.abs(current - pre);
      currentIndex.current = current;
      if (current > pre) {
        if (current < count) {
          var _headerRef$current;
          headerRef === null || headerRef === void 0 ? void 0 : (_headerRef$current = headerRef.current) === null || _headerRef$current === void 0 ? void 0 : _headerRef$current.toRight(c);
        }
      } else if (current < pre) {
        if (current >= 0) {
          var _headerRef$current2;
          headerRef === null || headerRef === void 0 ? void 0 : (_headerRef$current2 = headerRef.current) === null || _headerRef$current2 === void 0 ? void 0 : _headerRef$current2.toLeft(c);
        }
      }
    }
  };
};
export function useTabPageAPI(props, ref) {
  const {
    header,
    width: initWidth,
    initIndex = 0
  } = props;
  const {
    HeaderProps
  } = header;
  const {
    titles: headerTitles
  } = HeaderProps;
  const headerRef = React.useRef({});
  const bodyRef = React.useRef({});
  const count = headerTitles.length;
  const {
    width: winWidth
  } = useWindowDimensions();
  const width = initWidth ?? winWidth;
  const {
    headerStartScrolling
  } = useHeaderStartScrolling(count, headerRef, initIndex);
  React.useImperativeHandle(ref, () => {
    return {
      changeIndex: (index, animated) => {
        var _bodyRef$current;
        (_bodyRef$current = bodyRef.current) === null || _bodyRef$current === void 0 ? void 0 : _bodyRef$current.scrollTo(index, animated);
        headerStartScrolling(width, width * index);
      }
    };
  }, [headerStartScrolling, width]);
  return {
    headerRef,
    bodyRef,
    headerStartScrolling
  };
}
//# sourceMappingURL=TabPage.hooks.js.map