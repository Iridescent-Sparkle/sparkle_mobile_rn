"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImagePreview = ImagePreview;
exports.ImagePreview2 = ImagePreview2;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _hook = require("../../hook");
var _Image = require("../../ui/Image");
var _imageZoom = require("./__private__/image-zoom.component");
var _Draggable = require("./Draggable");
var _Scalable = require("./Scalable");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * Image preview component.
 *
 * ** Under the android platform, scaling is not possible. **
 */
function ImagePreview(props) {
  const {
    source,
    containerStyle,
    onLongPress,
    onClicked,
    onDupClicked,
    imageStyle
  } = props;
  return /*#__PURE__*/React.createElement(_reactNative.Pressable, {
    style: containerStyle,
    onPress: () => {
      onClicked === null || onClicked === void 0 ? void 0 : onClicked();
    },
    onLongPress: () => {
      onLongPress === null || onLongPress === void 0 ? void 0 : onLongPress();
    }
  }, /*#__PURE__*/React.createElement(_Draggable.Draggable2, null, /*#__PURE__*/React.createElement(_Scalable.Scalable, {
    onDoubleClicked: onDupClicked
  }, /*#__PURE__*/React.createElement(_reactNative.View, null, /*#__PURE__*/React.createElement(_Image.Image, {
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
function ImagePreview2(props) {
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
  } = (0, _hook.useGetStyleProps)();
  const {
    height,
    width
  } = getStyleSize(containerStyle);
  if (height === undefined || width === undefined) {
    throw new Error('ImagePreview2: height or width is undefined');
  }
  const {
    checkType
  } = (0, _hook.useCheckType)();
  checkType(height, 'number');
  checkType(width, 'number');
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {}
  }, /*#__PURE__*/React.createElement(_imageZoom.ImageZoom, {
    cropWidth: _reactNative.Dimensions.get('window').width,
    cropHeight: _reactNative.Dimensions.get('window').height,
    imageWidth: width,
    imageHeight: height,
    onDoubleClick: onDupClicked,
    onLongPress: onLongPress,
    onClick: onClicked
  }, /*#__PURE__*/React.createElement(_Image.Image, {
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