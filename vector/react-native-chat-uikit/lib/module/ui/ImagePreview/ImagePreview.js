import * as React from 'react';
import { Dimensions, Pressable, View } from 'react-native';
import { useCheckType, useGetStyleProps } from '../../hook';
import { Image } from '../../ui/Image';
import { ImageZoom } from './__private__/image-zoom.component';
import { Draggable2 } from './Draggable';
import { Scalable } from './Scalable';
/**
 * Image preview component.
 *
 * ** Under the android platform, scaling is not possible. **
 */
export function ImagePreview(props) {
  const {
    source,
    containerStyle,
    onLongPress,
    onClicked,
    onDupClicked,
    imageStyle
  } = props;
  return /*#__PURE__*/React.createElement(Pressable, {
    style: containerStyle,
    onPress: () => {
      onClicked === null || onClicked === void 0 ? void 0 : onClicked();
    },
    onLongPress: () => {
      onLongPress === null || onLongPress === void 0 ? void 0 : onLongPress();
    }
  }, /*#__PURE__*/React.createElement(Draggable2, null, /*#__PURE__*/React.createElement(Scalable, {
    onDoubleClicked: onDupClicked
  }, /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(Image, {
    source: source,
    style: imageStyle,
    onError: error => {
      console.log('ImagePreview Image onError', error.nativeEvent);
    },
    onLoadEnd: () => {
      console.log('ImagePreview Image onLoadEnd');
    }
  })))));
}

/**
 * Image preview component.
 */
export function ImagePreview2(props) {
  const {
    source,
    containerStyle,
    onLongPress,
    onClicked,
    onDupClicked,
    imageStyle
  } = props;
  const {
    getStyleSize
  } = useGetStyleProps();
  const {
    height,
    width
  } = getStyleSize(containerStyle);
  if (height === undefined || width === undefined) {
    throw new Error('ImagePreview2: height or width is undefined');
  }
  const {
    checkType
  } = useCheckType();
  checkType(height, 'number');
  checkType(width, 'number');
  return /*#__PURE__*/React.createElement(View, {
    style: {}
  }, /*#__PURE__*/React.createElement(ImageZoom, {
    cropWidth: Dimensions.get('window').width,
    cropHeight: Dimensions.get('window').height,
    imageWidth: width,
    imageHeight: height,
    onDoubleClick: onDupClicked,
    onLongPress: onLongPress,
    onClick: onClicked
  }, /*#__PURE__*/React.createElement(Image, {
    source: source,
    style: imageStyle,
    onError: error => {
      console.log('ImagePreview Image onError', error.nativeEvent);
    },
    onLoadEnd: () => {
      console.log('ImagePreview Image onLoadEnd');
    }
  })));
}
//# sourceMappingURL=ImagePreview.js.map