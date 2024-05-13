"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImageMessagePreview = ImageMessagePreview;
exports.useImageMessagePreview = useImageMessagePreview;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeChatSdk = require("react-native-chat-sdk");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _chat = require("../../chat");
var _error = require("../../error");
var _hook = require("../../hook");
var _services = require("../../services");
var _theme = require("../../theme");
var _Image = require("../../ui/Image");
var _ImagePreview = require("../../ui/ImagePreview");
var _utils = require("../../utils");
var _useImageSize = require("../hooks/useImageSize");
var _MessageListItem = require("./MessageListItem.hooks");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * Image Message Preview Component properties.
 */

/**
 * Image Message Preview Component.
 */
function ImageMessagePreview(props) {
  const {
    containerStyle,
    onBack
  } = props;
  const {
    url,
    size
  } = useImageMessagePreview(props);
  const {
    top
  } = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
  const {
    colors
  } = (0, _theme.usePaletteContext)();
  const {
    getColor
  } = (0, _hook.useColors)({
    icon: {
      light: colors.neutral[3],
      dark: colors.neutral[95]
    }
  });
  // const u =
  //   '/Users/asterisk/Library/Developer/CoreSimulator/Devices/604D801A-1119-460B-8FA8-EB305EC1D5E8/data/Containers/Data/Application/DED71CD7-7399-4DFB-8AF7-EB8C0B5A2EB6/Library/Application Support/HyphenateSDK/appdata/zuoyu/zd2/cacd5c10-b519-11ee-b1d8-ffc4c34a583c?em-redirect=true&share-secret=ys2DILUZEe6avXPiRjoO3lBSOCOD5wHJ-C5ef9jE3HVmJhes.jpg'; // ok
  // const u2 = `file://${encodeURIComponent(u)}`; // error
  // const u3 = `file://${u}`; // error
  // const u4 =
  //   '/Users/asterisk/Library/Developer/CoreSimulator/Devices/604D801A-1119-460B-8FA8-EB305EC1D5E8/data/Containers/Data/Application/DED71CD7-7399-4DFB-8AF7-EB8C0B5A2EB6/Library/Application Support/HyphenateSDK/appdata/zuoyu/zd2/';
  // const u5 = `file://${encodeURIComponent(
  //   u4
  // )}cacd5c10-b519-11ee-b1d8-ffc4c34a583c?em-redirect=true&share-secret=ys2DILUZEe6avXPiRjoO3lBSOCOD5wHJ-C5ef9jE3HVmJhes.jpg`;
  // const u6 =
  //   '/Users/asterisk/Library/Developer/CoreSimulator/Devices/604D801A-1119-460B-8FA8-EB305EC1D5E8/data/Containers/Data/Application/DED71CD7-7399-4DFB-8AF7-EB8C0B5A2EB6/Library/Application Support/HyphenateSDK/appdata/zuoyu/zd2/1.jpg';
  // const u7 = encodeURIComponent(u6);
  // const u8 = `file://${u6}`; // ok
  // const u9 = '/Users/asterisk/Downloads/2.jpg'; // ok
  // const u10 = `file://${u9}`; // ok
  // const u11 = `file://${encodeURIComponent(u9)}`;

  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [{
      flexGrow: 1,
      // backgroundColor: 'red',
      justifyContent: 'center',
      alignItems: 'center'
    }, containerStyle]
  }, /*#__PURE__*/React.createElement(_ImagePreview.ImagePreview2, {
    source: {
      // uri: localUrlEscape(
      //   ImageUrl(
      //     '/storage/emulated/0/Android/data/com.hyphenate.rn.ChatUikitExample/1135220126133718#demo/files/asterisk003/asterisk001/16a23570-a093-11ee-928e-49bce75fc71a.jpg'
      //   )
      // ),
      // uri: 'https://picsum.photos/200/300',
      uri: url,
      // uri: u3,
      ...size
      // width: 100,
      // height: 100,
    },

    imageStyle: {
      ...size
      // width: 100,
      // height: 100,
    },

    containerStyle: {
      width: size.width ?? _reactNative.Dimensions.get('window').width,
      height: size.height ?? _reactNative.Dimensions.get('window').height
    }
  }), /*#__PURE__*/React.createElement(_reactNative.Pressable, {
    style: {
      position: 'absolute',
      width: 44,
      height: 44,
      top: top,
      left: 0,
      justifyContent: 'center',
      alignItems: 'center'
      // backgroundColor: 'red',
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
function useImageMessagePreview(props) {
  const {
    msgId: propsMsgId,
    onError
  } = props;
  const im = (0, _chat.useChatContext)();
  const [url, setUrl] = React.useState(undefined);
  const [size, setSize] = React.useState({
    width: 300,
    height: 300
  });
  const {
    width: winWidth,
    height: winHeight
  } = (0, _reactNative.useWindowDimensions)();
  const {
    getImageSize
  } = (0, _useImageSize.useImageSize)({});
  const showImage = React.useCallback(url => {
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
    setUrl(_utils.LocalPath.showImage(url));
  }, [getImageSize, winHeight, winWidth]);
  const onGetMessage = React.useCallback(msgId => {
    im.getMessage({
      messageId: msgId
    }).then(async result => {
      if (result) {
        if (result.body.type !== _reactNativeChatSdk.ChatMessageType.IMAGE) {
          throw new _error.UIKitError({
            code: _error.ErrorCode.chat_uikit,
            desc: 'Message type is not ChatMessageType.IMAGE'
          });
        }
        const body = result.body;
        const isExisted = await _services.Services.dcs.isExistedFile(body.localPath);
        if (isExisted !== true) {
          showImage(body.remotePath);
          im.messageManager.downloadAttachment(result);
        } else {
          showImage(body.localPath);
        }
      }
    }).catch();
  }, [im, showImage]);
  React.useEffect(() => {
    onGetMessage(propsMsgId);
  }, [onGetMessage, propsMsgId]);
  React.useEffect(() => {
    const listener = {
      onMessageAttachmentChanged: msg => {
        if (msg.msgId === propsMsgId) {
          if (msg.body.type === _reactNativeChatSdk.ChatMessageType.IMAGE) {
            const body = msg.body;
            if (body.fileStatus === _reactNativeChatSdk.ChatDownloadStatus.SUCCESS) {
              showImage(body.localPath);
            } else if (body.fileStatus === _reactNativeChatSdk.ChatDownloadStatus.FAILED) {
              onError === null || onError === void 0 ? void 0 : onError(new _error.UIKitError({
                code: _error.ErrorCode.chat_uikit,
                desc: 'file download failed.'
              }));
            }
          }
        }
      }
    };
    im.messageManager.addListener(propsMsgId, listener);
    return () => {
      im.messageManager.removeListener(propsMsgId);
    };
  }, [im.messageManager, onError, propsMsgId, showImage]);
  return {
    url,
    size
  };
}
//# sourceMappingURL=ImageMessagePreview.js.map