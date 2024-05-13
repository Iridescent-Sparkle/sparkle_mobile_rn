"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImageViewerState = exports.ImageViewerProps = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _imageViewer = require("./image-viewer.style");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
class ImageViewerProps {
  /**
   * 是否显示
   */
  show = false;

  /**
   * 图片数组
   */
  imageUrls = [];

  /**
   * 滑动到下一页的X阈值
   */
  flipThreshold = 80;

  /**
   * 当前页能滑到下一页X位置最大值
   */
  maxOverflow = 300;

  /**
   * 初始显示第几张图
   */
  index = 0;

  /**
   * 加载失败的图
   */
  failImageSource = undefined;

  /**
   * 背景颜色
   */
  backgroundColor = 'black';

  /**
   * style props for the footer container
   */
  footerContainerStyle = {};

  /**
   * Menu Context Values
   */
  menuContext = {
    saveToLocal: 'save to the album',
    cancel: 'cancel'
  };

  /**
   * 是否开启长按保存到本地的功能
   */
  saveToLocalByLongPress = true;

  /**
   * 是否允许缩放图片
   */
  enableImageZoom = true;
  style = {};

  /**
   * Enable swipe down to close image viewer.
   * When swipe down, will trigger onCancel.
   */
  enableSwipeDown = false;

  /**
   * threshold for firing swipe down function
   */

  /**
   * Min and Max scale for zooming
   */

  /**
   * 是否预加载图片
   */
  enablePreload = false;

  /**
   * 翻页时的动画时间
   */
  pageAnimateTime = 100;

  /**
   * 是否启用原生动画驱动
   * Whether to use the native code to perform animations.
   */
  useNativeDriver = false;

  /**
   * 长按图片的回调
   */
  onLongPress = () => {
    //
  };

  /**
   * 单击回调
   */
  onClick = () => {
    //
  };

  /**
   * 双击回调
   */
  onDoubleClick = () => {
    //
  };

  /**
   * 图片保存到本地方法，如果写了这个方法，就不会调取系统默认方法
   * 针对安卓不支持 saveToCameraRoll 远程图片，可以在安卓调用此回调，调用安卓原生接口
   */
  onSave = () => {
    //
  };
  onMove = () => {
    //
  };

  /**
   * 自定义头部
   */
  renderHeader = () => {
    return null;
  };

  /**
   * 自定义尾部
   */
  renderFooter = () => {
    return null;
  };

  /**
   * 自定义计时器
   */
  renderIndicator = (currentIndex, allSize) => {
    return /*#__PURE__*/React.createElement(_reactNative.View, {
      style: _imageViewer.simpleStyle.count
    }, /*#__PURE__*/React.createElement(_reactNative.Text, {
      style: _imageViewer.simpleStyle.countText
    }, currentIndex + '/' + allSize));
  };

  /**
   * Render image component
   */
  renderImage = props => {
    return /*#__PURE__*/React.createElement(_reactNative.Image, props);
  };

  /**
   * 自定义左翻页按钮
   */
  renderArrowLeft = () => {
    return null;
  };

  /**
   * 自定义右翻页按钮
   */
  renderArrowRight = () => {
    return null;
  };

  /**
   * 弹出大图的回调
   */
  onShowModal = () => {
    //
  };

  /**
   * 取消看图的回调
   */
  onCancel = () => {
    //
  };

  /**
   * function that fires when user swipes down
   */
  onSwipeDown = () => {
    //
  };

  /**
   * 渲染loading元素
   */
  loadingRender = () => {
    return null;
  };

  /**
   * 保存到相册的回调
   */
  onSaveToCamera = () => {
    //
  };

  /**
   * 当图片切换时触发
   */
  onChange = () => {
    //
  };
}
exports.ImageViewerProps = ImageViewerProps;
class ImageViewerState {
  /**
   * 是否显示
   */
  show = false;

  /**
   * 当前显示第几个
   */
  currentShowIndex = 0;

  /**
   * Used to detect if parent component applied new index prop
   */
  prevIndexProp = 0;

  /**
   * 图片拉取是否完毕了
   */
  imageLoaded = false;

  /**
   * 图片长宽列表
   */
  imageSizes = [];

  /**
   * 是否出现功能菜单
   */
  isShowMenu = false;
}
exports.ImageViewerState = ImageViewerState;
//# sourceMappingURL=image-viewer.type.js.map