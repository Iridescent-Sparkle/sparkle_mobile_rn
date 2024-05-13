"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VideoMessagePreview = VideoMessagePreview;
exports.useVideoMessagePreview = useVideoMessagePreview;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeChatSdk = require("react-native-chat-sdk");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _reactNativeVideo = _interopRequireDefault(require("react-native-video"));
var _chat = require("../../chat");
var _error = require("../../error");
var _hook = require("../../hook");
var _services = require("../../services");
var _theme = require("../../theme");
var _Image = require("../../ui/Image");
var _utils = require("../../utils");
var _useImageSize = require("../hooks/useImageSize");
var _MessageListItem = require("./MessageListItem.hooks");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * Video Message Preview Component properties.
 */

/**
 * Video Message Preview Component.
 */
function VideoMessagePreview(props) {
  const {
    containerStyle,
    onBack
  } = props;
  const {
    url,
    size,
    videoRef,
    onVideoError,
    onClickedVideo,
    onEnd,
    pause,
    thumbnailUrl,
    showLoading
  } = useVideoMessagePreview(props);
  // const u =
  //   '/var/mobile/Containers/Data/Application/F4EF9F0C-7EAB-44BE-8109-B98E5C8FFD9A/Library/Application Support/HyphenateSDK/appdata/zuoyu/zd2/4c847d40-b526-11ee-94cd-1b34468849ce?em-redirect=true&share-secret=TITLYLUmEe6-5M0HikC84neFGaGOFglbHbtYyO6mFDW8pnhN.mov'; // error
  // const u2 =
  //   'file:///var/mobile/Containers/Data/Application/F4EF9F0C-7EAB-44BE-8109-B98E5C8FFD9A/Library/Application%20Support/HyphenateSDK/appdata/zuoyu/zd2/4c847d40-b526-11ee-94cd-1b34468849ce%3Fem-redirect%3Dtrue%26share-secret%3DTITLYLUmEe6-5M0HikC84neFGaGOFglbHbtYyO6mFDW8pnhN.mov'; // ok
  // const s =
  //   '/var/mobile/Containers/Data/Application/F4EF9F0C-7EAB-44BE-8109-B98E5C8FFD9A/Library/Application Support/HyphenateSDK/appdata/zuoyu/zd2/4c847d40-b526-11ee-94cd-1b34468849ce?em-redirect=true&share-secret=TITLYLUmEe6-5M0HikC84neFGaGOFglbHbtYyO6mFDW8pnhN&vframe=true';

  const {
    top
  } = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
  const {
    colors
  } = (0, _theme.usePaletteContext)();
  const {
    getColor
  } = (0, _hook.useColors)({
    bg: {
      light: colors.neutral[98],
      dark: colors.neutral[1]
    },
    fg: {
      light: colors.neutral[1],
      dark: colors.neutral[98]
    },
    icon: {
      light: colors.neutral[3],
      dark: colors.neutral[95]
    }
  });
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [{
      flexGrow: 1,
      backgroundColor: getColor('bg'),
      justifyContent: 'center',
      alignItems: 'center'
    }, containerStyle]
  }, /*#__PURE__*/React.createElement(_reactNative.Pressable, {
    onPress: onClickedVideo,
    style: {
      justifyContent: 'center',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(_reactNativeVideo.default, {
    ref: videoRef,
    source: {
      uri: url
    },
    paused: pause,
    onEnd: onEnd
    // fullscreen={true}
    ,
    onError: onVideoError,
    resizeMode: 'contain'
    // posterResizeMode={'contain'}
    ,
    style: {
      ...size
    }
  }), thumbnailUrl ? /*#__PURE__*/React.createElement(_Image.Image, {
    source: {
      uri: thumbnailUrl
    },
    style: {
      position: 'absolute',
      // backgroundColor: 'red',
      ...size
    }
  }) : null, showLoading ? /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [_reactNative.StyleSheet.absoluteFill, {
      position: 'absolute',
      // backgroundColor: 'blue',
      justifyContent: 'center',
      alignItems: 'center'
    }]
  }, /*#__PURE__*/React.createElement(_Image.LoadingIcon, {
    style: {
      height: 64,
      width: 64
    }
  })) : null), /*#__PURE__*/React.createElement(_reactNative.Pressable, {
    style: {
      position: 'absolute',
      width: 44,
      height: 44,
      top: top,
      left: 0,
      justifyContent: 'center',
      alignItems: 'center'
    },
    onPress: onBack
    // pointerEvents={'none'}
  }, /*#__PURE__*/React.createElement(_Image.Icon, {
    name: 'chevron_left',
    style: {
      height: 24,
      width: 24,
      tintColor: getColor('icon')
    }
  })));
}
function useVideoMessagePreview(props) {
  const {
    msgId: propsMsgId
  } = props;
  const im = (0, _chat.useChatContext)();
  const videoRef = React.useRef(null);
  const [url, setUrl] = React.useState();
  const [size, setSize] = React.useState({
    width: 300,
    height: 300
  });
  const {
    width: winWidth,
    height: winHeight
  } = (0, _reactNative.useWindowDimensions)();
  const [showLoading, setShowLoading] = React.useState(true);
  const [thumbnailUrl, setThumbnailUrl] = React.useState(undefined);
  const [pause, setPause] = React.useState(false);
  const {
    getImageSize
  } = (0, _useImageSize.useImageSize)({});
  const genThumb = React.useCallback(async (videoPath, onFinished) => {
    const isExisted = await _services.Services.dcs.isExistedFile(videoPath);
    if (isExisted !== true) {
      return;
    }
    _services.Services.ms.getVideoThumbnail({
      url: videoPath
    }).then(tmpFilePath => {
      if (tmpFilePath !== undefined && tmpFilePath.length > 0) {
        const dir = (0, _utils.getFileDirectory)(videoPath);
        const extension = (0, _utils.getFileExtension)(tmpFilePath);
        let localPath = dir + (0, _utils.uuid)() + extension;
        _services.Services.ms.saveFromLocal({
          targetPath: localPath,
          localPath: tmpFilePath
        }).then(() => {
          onFinished(localPath);
        }).catch();
      }
    }).catch();
  }, []);
  const setThumbSize = React.useCallback(url => {
    (0, _MessageListItem.getImageSizeFromUrl)(_utils.LocalPath.showImage(url), _ref => {
      let {
        isOk,
        width,
        height
      } = _ref;
      if (isOk === true) {
        setSize(getImageSize(height, width, winHeight, winWidth));
      }
    });
  }, [getImageSize, winHeight, winWidth]);
  const showThumb = React.useCallback(async thumbnailLocalPath => {
    const thumbIsExisted = await _services.Services.dcs.isExistedFile(thumbnailLocalPath);
    if (thumbIsExisted === true) {
      setThumbSize(thumbnailLocalPath);
      setThumbnailUrl(_utils.LocalPath.showImage(thumbnailLocalPath));
    }
  }, [setThumbSize]);
  const onGetMessage = React.useCallback(msgId => {
    im.getMessage({
      messageId: msgId
    }).then(async result => {
      if (result) {
        if (result.body.type !== _reactNativeChatSdk.ChatMessageType.VIDEO) {
          throw new _error.UIKitError({
            code: _error.ErrorCode.chat_uikit,
            desc: 'Message type is not ChatMessageType.VIDEO'
          });
        }
        const body = result.body;
        setThumbSize(body.thumbnailRemotePath);
        const isExisted = await _services.Services.dcs.isExistedFile(body.localPath);
        if (isExisted !== true) {
          showThumb(body.thumbnailLocalPath);
          im.messageManager.downloadAttachment(result);
        } else {
          setShowLoading(false);
          setThumbnailUrl(undefined);
          setUrl(_utils.LocalPath.playVideo(body.localPath));
        }
      }
    }).catch();
  }, [im, setThumbSize, showThumb]);
  const onVideoError = React.useCallback(error => {
    console.log('dev:video:error: ', error);
  }, []);
  const onClickedVideo = React.useCallback(() => {
    if (_reactNative.Platform.OS === 'ios') {
      var _videoRef$current, _videoRef$current2;
      (_videoRef$current = videoRef.current) === null || _videoRef$current === void 0 ? void 0 : _videoRef$current.seek(0);
      setPause(v => !v);
      (_videoRef$current2 = videoRef.current) === null || _videoRef$current2 === void 0 ? void 0 : _videoRef$current2.presentFullscreenPlayer();
    } else {
      var _videoRef$current3, _videoRef$current4;
      (_videoRef$current3 = videoRef.current) === null || _videoRef$current3 === void 0 ? void 0 : _videoRef$current3.seek(0);
      setPause(v => !v);
      (_videoRef$current4 = videoRef.current) === null || _videoRef$current4 === void 0 ? void 0 : _videoRef$current4.presentFullscreenPlayer();
    }
  }, []);
  const onGenerateThumbnail = React.useCallback(async msg => {
    const body = msg.body;
    const isExisted = await _services.Services.dcs.isExistedFile(body.localPath);
    const thumbIsExisted = await _services.Services.dcs.isExistedFile(body.thumbnailLocalPath);
    if (isExisted === true && thumbIsExisted !== true) {
      genThumb(body.localPath, thumbLocalPath => {
        body.thumbnailLocalPath = thumbLocalPath;
        body.thumbnailStatus = _reactNativeChatSdk.ChatDownloadStatus.SUCCESS;
        im.updateMessage({
          message: msg,
          onResult: () => {}
        });
      });
    }
  }, [genThumb, im]);
  const onEnd = React.useCallback(() => {
    if (_reactNative.Platform.OS !== 'ios') {
      setPause(true);
    }
  }, []);
  React.useEffect(() => {
    onGetMessage(propsMsgId);
  }, [onGetMessage, propsMsgId]);
  React.useEffect(() => {
    const listener = {
      onMessageAttachmentChanged: msg => {
        if (msg.msgId === propsMsgId) {
          if (msg.body.type === _reactNativeChatSdk.ChatMessageType.VIDEO) {
            const body = msg.body;
            if (body.fileStatus === _reactNativeChatSdk.ChatDownloadStatus.SUCCESS) {
              setUrl(_utils.LocalPath.playVideo(body.localPath));
              setShowLoading(false);
              setThumbnailUrl(undefined);
              onGenerateThumbnail(msg);
            } else if (body.fileStatus === _reactNativeChatSdk.ChatDownloadStatus.FAILED) {
              console.log('dev:download failed');
            }
          }
        }
      }
    };
    im.messageManager.addListener(propsMsgId, listener);
    return () => {
      im.messageManager.removeListener(propsMsgId);
    };
  }, [im.messageManager, onGenerateThumbnail, propsMsgId]);
  return {
    url,
    size,
    videoRef,
    onVideoError,
    onClickedVideo,
    showLoading,
    thumbnailUrl,
    onEnd,
    pause
  };
}
//# sourceMappingURL=VideoMessagePreview.js.map