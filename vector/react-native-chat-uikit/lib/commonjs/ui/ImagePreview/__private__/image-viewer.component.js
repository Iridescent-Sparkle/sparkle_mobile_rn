"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImageViewer = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _imageViewer = _interopRequireDefault(require("./image-viewer.style"));
var _imageViewer2 = require("./image-viewer.type");
var _imageZoom = require("./image-zoom.component");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
class ImageViewer extends React.Component {
  static defaultProps = new _imageViewer2.ImageViewerProps();
  state = new _imageViewer2.ImageViewerState();

  // 背景透明度渐变动画
  fadeAnim = new _reactNative.Animated.Value(0);

  // 当前基准位置
  standardPositionX = 0;

  // 整体位移，用来切换图片用
  positionXNumber = 0;
  positionX = new _reactNative.Animated.Value(0);
  width = 0;
  height = 0;
  styles = (0, _imageViewer.default)(0, 0, 'transparent');

  // 是否执行过 layout. fix 安卓不断触发 onLayout 的 bug
  // private hasLayout = false;

  // 记录已加载的图片 index
  loadedIndex = new Map();
  handleLongPressWithIndex = new Map();
  imageRefs = [];
  componentDidMount() {
    this.init(this.props);
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.index !== prevState.prevIndexProp) {
      return {
        currentShowIndex: nextProps.index,
        prevIndexProp: nextProps.index
      };
    }
    return null;
  }
  componentDidUpdate(prevProps, _prevState) {
    if (prevProps.index !== this.props.index) {
      // 立刻预加载要看的图
      this.loadImage(this.props.index || 0);
      this.jumpToCurrentImage();

      // 显示动画
      _reactNative.Animated.timing(this.fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: !!this.props.useNativeDriver
      }).start();
    }
  }

  /**
   * props 有变化时执行
   */
  init(nextProps) {
    if (nextProps.imageUrls.length === 0) {
      // 隐藏时候清空
      this.fadeAnim.setValue(0);
      return this.setState(new _imageViewer2.ImageViewerState());
    }

    // 给 imageSizes 塞入空数组
    const imageSizes = [];
    nextProps.imageUrls.forEach(imageUrl => {
      imageSizes.push({
        width: imageUrl.width || 0,
        height: imageUrl.height || 0,
        status: 'loading'
      });
    });
    this.setState({
      currentShowIndex: nextProps.index,
      prevIndexProp: nextProps.index || 0,
      imageSizes
    }, () => {
      // 立刻预加载要看的图
      this.loadImage(nextProps.index || 0);
      this.jumpToCurrentImage();

      // 显示动画
      _reactNative.Animated.timing(this.fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: !!nextProps.useNativeDriver
      }).start();
    });
  }
  /**
   * reset Image scale and position
   */
  resetImageByIndex = index => {
    this.imageRefs[index] && this.imageRefs[index].reset();
  };
  /**
   * 调到当前看图位置
   */
  jumpToCurrentImage() {
    // 跳到当前图的位置
    this.positionXNumber = this.width * (this.state.currentShowIndex || 0) * (_reactNative.I18nManager.isRTL ? 1 : -1);
    this.standardPositionX = this.positionXNumber;
    this.positionX.setValue(this.positionXNumber);
  }

  /**
   * 加载图片，主要是获取图片长与宽
   */
  loadImage(index) {
    if (!this.state.imageSizes[index]) {
      return;
    }
    if (this.loadedIndex.has(index)) {
      return;
    }
    this.loadedIndex.set(index, true);
    const image = this.props.imageUrls[index];
    const imageStatus = {
      ...this.state.imageSizes[index]
    };

    // 保存 imageSize
    const saveImageSize = () => {
      // 如果已经 success 了，就不做处理
      if (this.state.imageSizes[index] && this.state.imageSizes[index].status !== 'loading') {
        return;
      }
      const imageSizes = this.state.imageSizes.slice();
      imageSizes[index] = imageStatus;
      this.setState({
        imageSizes
      });
    };
    if (this.state.imageSizes[index].status === 'success') {
      // 已经加载过就不会加载了
      return;
    }

    // 如果已经有宽高了，直接设置为 success
    if (this.state.imageSizes[index].width > 0 && this.state.imageSizes[index].height > 0) {
      imageStatus.status = 'success';
      saveImageSize();
      return;
    }

    // 是否加载完毕了图片大小
    // const sizeLoaded = false;
    // 是否加载完毕了图片
    let imageLoaded = false;

    // Tagged success if url is started with file:, or not set yet(for custom source.uri).
    if (!(image !== null && image !== void 0 && image.url) || image.url.startsWith(`file:`)) {
      imageLoaded = true;
    }

    // 如果已知源图片宽高，直接设置为 success
    if (image !== null && image !== void 0 && image.width && image.height) {
      if (this.props.enablePreload && imageLoaded === false) {
        _reactNative.Image.prefetch(image.url);
      }
      imageStatus.width = image.width;
      imageStatus.height = image.height;
      imageStatus.status = 'success';
      saveImageSize();
      return;
    }
    _reactNative.Image.getSize((image === null || image === void 0 ? void 0 : image.url) ?? 'not found url', (width, height) => {
      imageStatus.width = width;
      imageStatus.height = height;
      imageStatus.status = 'success';
      saveImageSize();
    }, () => {
      try {
        const data = _reactNative.Image.resolveAssetSource(image.props.source);
        imageStatus.width = data.width;
        imageStatus.height = data.height;
        imageStatus.status = 'success';
        saveImageSize();
      } catch (newError) {
        // Give up..
        imageStatus.status = 'fail';
        saveImageSize();
      }
    });
  }

  /**
   * 预加载图片
   */
  preloadImage = index => {
    if (index < this.state.imageSizes.length) {
      this.loadImage(index + 1);
    }
  };
  /**
   * 触发溢出水平滚动
   */
  handleHorizontalOuterRangeOffset = (() => {
    var _this = this;
    return function () {
      let offsetX = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      _this.positionXNumber = _this.standardPositionX + offsetX;
      _this.positionX.setValue(_this.positionXNumber);
      const offsetXRTL = !_reactNative.I18nManager.isRTL ? offsetX : -offsetX;
      if (offsetXRTL < 0) {
        if (_this.state.currentShowIndex || _this.props.imageUrls.length - 1 > 0) {
          _this.loadImage((_this.state.currentShowIndex || 0) + 1);
        }
      } else if (offsetXRTL > 0) {
        if ((_this.state.currentShowIndex || 0) > 0) {
          _this.loadImage((_this.state.currentShowIndex || 0) - 1);
        }
      }
    };
  })();

  /**
   * 手势结束，但是没有取消浏览大图
   */
  handleResponderRelease = (() => {
    var _this2 = this;
    return function () {
      let vx = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      const vxRTL = _reactNative.I18nManager.isRTL ? -vx : vx;
      const isLeftMove = _reactNative.I18nManager.isRTL ? _this2.positionXNumber - _this2.standardPositionX < -(_this2.props.flipThreshold || 0) : _this2.positionXNumber - _this2.standardPositionX > (_this2.props.flipThreshold || 0);
      const isRightMove = _reactNative.I18nManager.isRTL ? _this2.positionXNumber - _this2.standardPositionX > (_this2.props.flipThreshold || 0) : _this2.positionXNumber - _this2.standardPositionX < -(_this2.props.flipThreshold || 0);
      if (vxRTL > 0.7) {
        // 上一张
        _this2.goBack.call(_this2);

        // 这里可能没有触发溢出滚动，为了防止图片不被加载，调用加载图片
        if ((_this2.state.currentShowIndex || 0) > 0) {
          _this2.loadImage((_this2.state.currentShowIndex || 0) - 1);
        }
        return;
      } else if (vxRTL < -0.7) {
        // 下一张
        _this2.goNext.call(_this2);
        if (_this2.state.currentShowIndex || _this2.props.imageUrls.length - 1 > 0) {
          _this2.loadImage((_this2.state.currentShowIndex || 0) + 1);
        }
        return;
      }
      if (isLeftMove) {
        // 上一张
        _this2.goBack.call(_this2);
      } else if (isRightMove) {
        // 下一张
        _this2.goNext.call(_this2);
        return;
      } else {
        // 回到之前的位置
        _this2.resetPosition.call(_this2);
        return;
      }
    };
  })();

  /**
   * 到上一张
   */
  goBack = () => {
    if (this.state.currentShowIndex === 0) {
      // 回到之前的位置
      this.resetPosition.call(this);
      return;
    }
    this.positionXNumber = !_reactNative.I18nManager.isRTL ? this.standardPositionX + this.width : this.standardPositionX - this.width;
    this.standardPositionX = this.positionXNumber;
    _reactNative.Animated.timing(this.positionX, {
      toValue: this.positionXNumber,
      duration: this.props.pageAnimateTime,
      useNativeDriver: !!this.props.useNativeDriver
    }).start();
    const nextIndex = (this.state.currentShowIndex || 0) - 1;
    this.setState({
      currentShowIndex: nextIndex
    }, () => {
      if (this.props.onChange) {
        this.props.onChange(this.state.currentShowIndex);
      }
    });
  };

  /**
   * 到下一张
   */
  goNext = () => {
    if (this.state.currentShowIndex === this.props.imageUrls.length - 1) {
      // 回到之前的位置
      this.resetPosition.call(this);
      return;
    }
    this.positionXNumber = !_reactNative.I18nManager.isRTL ? this.standardPositionX - this.width : this.standardPositionX + this.width;
    this.standardPositionX = this.positionXNumber;
    _reactNative.Animated.timing(this.positionX, {
      toValue: this.positionXNumber,
      duration: this.props.pageAnimateTime,
      useNativeDriver: !!this.props.useNativeDriver
    }).start();
    const nextIndex = (this.state.currentShowIndex || 0) + 1;
    this.setState({
      currentShowIndex: nextIndex
    }, () => {
      if (this.props.onChange) {
        this.props.onChange(this.state.currentShowIndex);
      }
    });
  };

  /**
   * 回到原位
   */
  resetPosition() {
    this.positionXNumber = this.standardPositionX;
    _reactNative.Animated.timing(this.positionX, {
      toValue: this.standardPositionX,
      duration: 150,
      useNativeDriver: !!this.props.useNativeDriver
    }).start();
  }

  /**
   * 长按
   */
  handleLongPress = image => {
    if (this.props.saveToLocalByLongPress) {
      // 出现保存到本地的操作框
      this.setState({
        isShowMenu: true
      });
    }
    if (this.props.onLongPress) {
      this.props.onLongPress(image);
    }
  };

  /**
   * 单击
   */
  handleClick = () => {
    if (this.props.onClick) {
      this.props.onClick(this.handleCancel, this.state.currentShowIndex);
    }
  };

  /**
   * 双击
   */
  handleDoubleClick = () => {
    if (this.props.onDoubleClick) {
      this.props.onDoubleClick(this.handleCancel);
    }
  };

  /**
   * 退出
   */
  handleCancel = () => {
    // this.hasLayout = false;
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  };

  /**
   * 完成布局
   */
  handleLayout = event => {
    if (event.nativeEvent.layout.width !== this.width) {
      // this.hasLayout = true;

      this.width = event.nativeEvent.layout.width;
      this.height = event.nativeEvent.layout.height;
      this.styles = (0, _imageViewer.default)(this.width, this.height, this.props.backgroundColor || 'transparent');

      // 强制刷新
      this.forceUpdate();
      this.jumpToCurrentImage();
    }
  };

  /**
   * 获得整体内容
   */
  getContent() {
    // 获得屏幕宽高
    const screenWidth = this.width;
    const screenHeight = this.height;
    const ImageElements = this.props.imageUrls.map((image, index) => {
      var _index, _index2;
      if ((this.state.currentShowIndex || 0) > index + 1 || (this.state.currentShowIndex || 0) < index - 1) {
        return /*#__PURE__*/React.createElement(_reactNative.View, {
          key: index,
          style: {
            width: screenWidth,
            height: screenHeight
          }
        });
      }
      if (!this.handleLongPressWithIndex.has(index)) {
        this.handleLongPressWithIndex.set(index, this.handleLongPress.bind(this, image));
      }
      let width = ((_index = this.state.imageSizes[index]) === null || _index === void 0 ? void 0 : _index.width) ?? 0;
      let height = ((_index2 = this.state.imageSizes[index]) === null || _index2 === void 0 ? void 0 : _index2.height) ?? 0;
      const imageInfo = this.state.imageSizes[index];
      if (!imageInfo || !imageInfo.status) {
        return /*#__PURE__*/React.createElement(_reactNative.View, {
          key: index,
          style: {
            width: screenWidth,
            height: screenHeight
          }
        });
      }

      // 如果宽大于屏幕宽度,整体缩放到宽度是屏幕宽度
      if (width > screenWidth) {
        const widthPixel = screenWidth / width;
        width *= widthPixel;
        height *= widthPixel;
      }

      // 如果此时高度还大于屏幕高度,整体缩放到高度是屏幕高度
      if (height > screenHeight) {
        const HeightPixel = screenHeight / height;
        width *= HeightPixel;
        height *= HeightPixel;
      }

      // eslint-disable-next-line react/no-unstable-nested-components
      const Wrapper = _ref => {
        let {
          children,
          ...others
        } = _ref;
        return /*#__PURE__*/React.createElement(_imageZoom.ImageZoom, _extends({
          cropWidth: this.width,
          cropHeight: this.height,
          maxOverflow: this.props.maxOverflow,
          horizontalOuterRangeOffset: this.handleHorizontalOuterRangeOffset,
          responderRelease: this.handleResponderRelease,
          onMove: this.props.onMove,
          onLongPress: this.handleLongPressWithIndex.get(index),
          onClick: this.handleClick,
          onDoubleClick: this.handleDoubleClick,
          enableSwipeDown: this.props.enableSwipeDown,
          swipeDownThreshold: this.props.swipeDownThreshold,
          onSwipeDown: this.handleSwipeDown,
          pinchToZoom: this.props.enableImageZoom,
          enableDoubleClickZoom: this.props.enableImageZoom,
          doubleClickInterval: this.props.doubleClickInterval
        }, others), children);
      };
      switch (imageInfo.status) {
        case 'loading':
          return /*#__PURE__*/React.createElement(Wrapper, {
            key: index,
            style: {
              ...this.styles.modalContainer,
              ...this.styles.loadingContainer
            },
            imageWidth: screenWidth,
            imageHeight: screenHeight
          }, /*#__PURE__*/React.createElement(_reactNative.View, {
            style: this.styles.loadingContainer
          }, this.props.loadingRender()));
        case 'success':
          if (!image.props) {
            image.props = {};
          }
          if (!image.props.style) {
            image.props.style = {};
          }
          image.props.style = {
            ...this.styles.imageStyle,
            // User config can override above.
            ...image.props.style,
            width,
            height
          };
          if (typeof image.props.source === 'number') {
            // source = require(..), doing nothing
          } else {
            if (!image.props.source) {
              image.props.source = {};
            }
            image.props.source = {
              uri: image.url,
              ...image.props.source
            };
          }
          if (this.props.enablePreload) {
            this.preloadImage(this.state.currentShowIndex || 0);
          }
          return /*#__PURE__*/React.createElement(_imageZoom.ImageZoom, {
            key: index,
            ref: el => this.imageRefs[index] = el,
            cropWidth: this.width,
            cropHeight: this.height,
            maxOverflow: this.props.maxOverflow,
            horizontalOuterRangeOffset: this.handleHorizontalOuterRangeOffset,
            responderRelease: this.handleResponderRelease,
            onMove: this.props.onMove,
            onLongPress: this.handleLongPressWithIndex.get(index),
            onClick: this.handleClick,
            onDoubleClick: this.handleDoubleClick,
            imageWidth: width,
            imageHeight: height,
            enableSwipeDown: this.props.enableSwipeDown,
            swipeDownThreshold: this.props.swipeDownThreshold,
            onSwipeDown: this.handleSwipeDown,
            panToMove: !this.state.isShowMenu,
            pinchToZoom: this.props.enableImageZoom && !this.state.isShowMenu,
            enableDoubleClickZoom: this.props.enableImageZoom && !this.state.isShowMenu,
            doubleClickInterval: this.props.doubleClickInterval,
            minScale: this.props.minScale,
            maxScale: this.props.maxScale
          }, this.props.renderImage(image.props));
        case 'fail':
          return /*#__PURE__*/React.createElement(Wrapper, {
            key: index,
            style: this.styles.modalContainer,
            imageWidth: this.props.failImageSource ? this.props.failImageSource.width : screenWidth,
            imageHeight: this.props.failImageSource ? this.props.failImageSource.height : screenHeight
          }, this.props.failImageSource && this.props.renderImage({
            source: {
              uri: this.props.failImageSource.url
            },
            style: {
              width: this.props.failImageSource.width,
              height: this.props.failImageSource.height
            }
          }));
      }
    });
    return /*#__PURE__*/React.createElement(_reactNative.Animated.View, {
      style: {
        zIndex: 9
      }
    }, /*#__PURE__*/React.createElement(_reactNative.Animated.View, {
      style: {
        ...this.styles.container,
        opacity: this.fadeAnim
      }
    }, this.props.renderHeader(this.state.currentShowIndex), /*#__PURE__*/React.createElement(_reactNative.View, {
      style: this.styles.arrowLeftContainer
    }, /*#__PURE__*/React.createElement(_reactNative.TouchableWithoutFeedback, {
      onPress: this.goBack
    }, /*#__PURE__*/React.createElement(_reactNative.View, null, this.props.renderArrowLeft()))), /*#__PURE__*/React.createElement(_reactNative.View, {
      style: this.styles.arrowRightContainer
    }, /*#__PURE__*/React.createElement(_reactNative.TouchableWithoutFeedback, {
      onPress: this.goNext
    }, /*#__PURE__*/React.createElement(_reactNative.View, null, this.props.renderArrowRight()))), /*#__PURE__*/React.createElement(_reactNative.Animated.View, {
      style: {
        ...this.styles.moveBox,
        transform: [{
          translateX: this.positionX
        }],
        width: this.width * this.props.imageUrls.length
      }
    }, ImageElements), this.props.renderIndicator((this.state.currentShowIndex || 0) + 1, this.props.imageUrls.length), this.props.imageUrls[this.state.currentShowIndex || 0] && this.props.imageUrls[this.state.currentShowIndex || 0].originSizeKb && this.props.imageUrls[this.state.currentShowIndex || 0].originUrl && /*#__PURE__*/React.createElement(_reactNative.View, {
      style: this.styles.watchOrigin
    }, /*#__PURE__*/React.createElement(_reactNative.TouchableOpacity, {
      style: this.styles.watchOriginTouchable
    }, /*#__PURE__*/React.createElement(_reactNative.Text, {
      style: this.styles.watchOriginText
    }, "\u67E5\u770B\u539F\u56FE(2M)"))), /*#__PURE__*/React.createElement(_reactNative.View, {
      style: [{
        bottom: 0,
        position: 'absolute',
        zIndex: 9
      }, this.props.footerContainerStyle]
    }, this.props.renderFooter(this.state.currentShowIndex || 0))));
  }

  /**
   * 保存当前图片到本地相册
   */
  saveToLocal = () => {
    if (!this.props.onSave) {
      // CameraRoll.saveToCameraRoll(
      //   this.props.imageUrls[this.state.currentShowIndex || 0].url
      // );
      // this!.props!.onSaveToCamera!(this.state.currentShowIndex);
    } else {
      this.props.onSave(this.props.imageUrls[this.state.currentShowIndex || 0].url);
    }
    this.setState({
      isShowMenu: false
    });
  };
  getMenu() {
    if (!this.state.isShowMenu) {
      return null;
    }
    if (this.props.menus) {
      return /*#__PURE__*/React.createElement(_reactNative.View, {
        style: this.styles.menuContainer
      }, this.props.menus({
        cancel: this.handleLeaveMenu,
        saveToLocal: this.saveToLocal
      }));
    }
    return /*#__PURE__*/React.createElement(_reactNative.View, {
      style: this.styles.menuContainer
    }, /*#__PURE__*/React.createElement(_reactNative.View, {
      style: this.styles.menuShadow
    }), /*#__PURE__*/React.createElement(_reactNative.View, {
      style: this.styles.menuContent
    }, /*#__PURE__*/React.createElement(_reactNative.TouchableHighlight, {
      underlayColor: "#F2F2F2",
      onPress: this.saveToLocal,
      style: this.styles.operateContainer
    }, /*#__PURE__*/React.createElement(_reactNative.Text, {
      style: this.styles.operateText
    }, this.props.menuContext.saveToLocal)), /*#__PURE__*/React.createElement(_reactNative.TouchableHighlight, {
      underlayColor: "#F2F2F2",
      onPress: this.handleLeaveMenu,
      style: this.styles.operateContainer
    }, /*#__PURE__*/React.createElement(_reactNative.Text, {
      style: this.styles.operateText
    }, this.props.menuContext.cancel))));
  }
  handleLeaveMenu = () => {
    this.setState({
      isShowMenu: false
    });
  };
  handleSwipeDown = () => {
    if (this.props.onSwipeDown) {
      this.props.onSwipeDown();
    }
    this.handleCancel();
  };
  render() {
    let childs = null;
    childs = /*#__PURE__*/React.createElement(_reactNative.View, null, this.getContent(), this.getMenu());
    return /*#__PURE__*/React.createElement(_reactNative.View, {
      onLayout: this.handleLayout,
      style: {
        flex: 1,
        overflow: 'hidden',
        ...this.props.style
      }
    }, childs);
  }
}
exports.ImageViewer = ImageViewer;
//# sourceMappingURL=image-viewer.component.js.map