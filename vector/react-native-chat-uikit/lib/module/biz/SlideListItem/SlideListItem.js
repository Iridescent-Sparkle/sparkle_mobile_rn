import * as React from 'react';
import { ScrollView, useWindowDimensions, View } from 'react-native';
import { getCurTs } from '../../utils';
import { gJitterValue } from './SlideListItem.const';

/**
 * @description The props of SlideListItem.
 */

/**
 * @description The component of SlideListItem.
 * @param props {@link SlideListItemProps}
 */
export function SlideListItem(props) {
  const {
    children,
    width: propsWidth,
    leftExtraWidth,
    rightExtraWidth,
    onPress,
    onLongPress,
    data,
    height,
    containerStyle
  } = props;
  const horizontal = true;
  const bounces = false;
  const showsHorizontalScrollIndicator = false;
  const {
    width: winWidth
  } = useWindowDimensions();
  const width = propsWidth ?? winWidth;
  const scrollViewRef = React.useRef(null);
  const isEditableRef = React.useRef(false);
  const currentX = React.useRef(0);
  const currentY = React.useRef(0);
  const startTime = React.useRef(0);
  const endTime = React.useRef(0);
  const _autoAlign = (moveX, left, right) => {
    if (left === undefined && right !== undefined) {
      const w = right / 2;
      if (moveX >= 0 && moveX < w) {
        var _scrollViewRef$curren;
        isEditableRef.current = false;
        (_scrollViewRef$curren = scrollViewRef.current) === null || _scrollViewRef$curren === void 0 ? void 0 : _scrollViewRef$curren.scrollTo({
          x: 0,
          animated: true
        });
      } else {
        var _scrollViewRef$curren2;
        isEditableRef.current = true;
        (_scrollViewRef$curren2 = scrollViewRef.current) === null || _scrollViewRef$curren2 === void 0 ? void 0 : _scrollViewRef$curren2.scrollTo({
          x: right,
          animated: true
        });
      }
    } else if (left !== undefined && right === undefined) {
      const w = left / 2;
      if (moveX >= 0 && moveX < w) {
        var _scrollViewRef$curren3;
        isEditableRef.current = true;
        (_scrollViewRef$curren3 = scrollViewRef.current) === null || _scrollViewRef$curren3 === void 0 ? void 0 : _scrollViewRef$curren3.scrollTo({
          x: 0,
          animated: true
        });
      } else {
        var _scrollViewRef$curren4;
        isEditableRef.current = false;
        (_scrollViewRef$curren4 = scrollViewRef.current) === null || _scrollViewRef$curren4 === void 0 ? void 0 : _scrollViewRef$curren4.scrollTo({
          x: left,
          animated: true
        });
      }
    } else if (left !== undefined && right !== undefined) {
      if (moveX < left) {
        const w = left / 2;
        if (moveX >= 0 && moveX < w) {
          var _scrollViewRef$curren5;
          isEditableRef.current = true;
          (_scrollViewRef$curren5 = scrollViewRef.current) === null || _scrollViewRef$curren5 === void 0 ? void 0 : _scrollViewRef$curren5.scrollTo({
            x: 0,
            animated: true
          });
        } else {
          var _scrollViewRef$curren6;
          isEditableRef.current = false;
          (_scrollViewRef$curren6 = scrollViewRef.current) === null || _scrollViewRef$curren6 === void 0 ? void 0 : _scrollViewRef$curren6.scrollTo({
            x: left,
            animated: true
          });
        }
      } else if (moveX > left) {
        const w = left + right / 2;
        if (moveX >= 0 && moveX < w) {
          var _scrollViewRef$curren7;
          isEditableRef.current = false;
          (_scrollViewRef$curren7 = scrollViewRef.current) === null || _scrollViewRef$curren7 === void 0 ? void 0 : _scrollViewRef$curren7.scrollTo({
            x: left,
            animated: true
          });
        } else {
          var _scrollViewRef$curren8;
          isEditableRef.current = true;
          (_scrollViewRef$curren8 = scrollViewRef.current) === null || _scrollViewRef$curren8 === void 0 ? void 0 : _scrollViewRef$curren8.scrollTo({
            x: left + right,
            animated: true
          });
        }
      }
    } else {}
  };
  const _onClicked = () => {
    if (isEditableRef.current === true) {
      return;
    }
    endTime.current = getCurTs();
    if (endTime.current - startTime.current < 1000) {
      onPress === null || onPress === void 0 ? void 0 : onPress(data);
    } else {
      onLongPress === null || onLongPress === void 0 ? void 0 : onLongPress(data);
    }
  };
  return /*#__PURE__*/React.createElement(View, {
    style: [containerStyle, {
      width: width,
      height: height
    }]
  }, /*#__PURE__*/React.createElement(ScrollView, {
    ref: scrollViewRef,
    onScrollEndDrag: event => {
      const x = event.nativeEvent.contentOffset.x;
      _autoAlign(x, leftExtraWidth, rightExtraWidth);
    },
    onTouchStart: event => {
      currentX.current = event.nativeEvent.locationX;
      currentY.current = event.nativeEvent.locationY;
      startTime.current = getCurTs();
    },
    onTouchEnd: event => {
      if (event.nativeEvent.locationX < currentX.current + gJitterValue && event.nativeEvent.locationX > currentX.current - gJitterValue && event.nativeEvent.locationY < currentY.current + gJitterValue && event.nativeEvent.locationY > currentY.current - gJitterValue) {
        _onClicked();
      }
    },
    bounces: bounces,
    horizontal: horizontal,
    showsHorizontalScrollIndicator: showsHorizontalScrollIndicator,
    contentOffset: {
      x: leftExtraWidth ?? 0,
      y: 0
    }
  }, children));
}
//# sourceMappingURL=SlideListItem.js.map