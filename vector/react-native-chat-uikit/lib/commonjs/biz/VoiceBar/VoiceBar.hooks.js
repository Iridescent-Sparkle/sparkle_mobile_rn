"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useVoiceBar = useVoiceBar;
var React = _interopRequireWildcard(require("react"));
var _reactNativeAudioRecorderPlayer = require("react-native-audio-recorder-player");
var _chat = require("../../chat");
var _services = require("../../services");
var _utils = require("../../utils");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function useVoiceBar(props) {
  const {
    onClickedRecordButton,
    onClickedClearButton,
    onClickedSendButton,
    onFailed,
    onState: propsOnState
  } = props;
  const [state, setState] = React.useState('idle');
  const voiceFilePathRef = React.useRef('');
  const voiceFileNameRef = React.useRef('');
  const voiceDurationRef = React.useRef(0);
  const isPlayingRef = React.useRef(false);
  const recordTimeoutRef = React.useRef();
  const im = (0, _chat.useChatContext)();
  const contentTimerRef = React.useRef({});
  const [playRipple, setPlayRipple] = React.useState(false);
  const AudioOptionRef = React.useRef({
    AudioEncoderAndroid: _reactNativeAudioRecorderPlayer.AudioEncoderAndroidType.AAC,
    // OutputFormatAndroid: OutputFormatAndroidType.AAC_ADIF,
    AudioSourceAndroid: _reactNativeAudioRecorderPlayer.AudioSourceAndroidType.MIC,
    AVModeIOS: _reactNativeAudioRecorderPlayer.AVModeIOSOption.measurement,
    AVEncoderAudioQualityKeyIOS: _reactNativeAudioRecorderPlayer.AVEncoderAudioQualityIOSType.high,
    AVNumberOfChannelsKeyIOS: 2,
    AVFormatIDKeyIOS: _reactNativeAudioRecorderPlayer.AVEncodingOption.aac // !!! amr is not supported
  });

  const [currentTime, setCurrentTime] = React.useState(0);
  const onContentTimeChanged = React.useCallback(v => {
    setCurrentTime(v);
  }, []);
  const onState = React.useCallback(s => {
    propsOnState === null || propsOnState === void 0 ? void 0 : propsOnState(s);
    setState(s);
  }, [propsOnState]);
  const startRecord = voiceFilePath => {
    var _contentTimerRef$curr, _contentTimerRef$curr2, _contentTimerRef$curr3, _contentTimerRef$curr4;
    if (voiceFilePath) {
      voiceFilePathRef.current = voiceFilePath;
    }
    onState('recording');
    recordTimeoutRef.current = setTimeout(() => {
      stopRecord();
    }, 60000);
    (_contentTimerRef$curr = contentTimerRef.current) === null || _contentTimerRef$curr === void 0 ? void 0 : (_contentTimerRef$curr2 = _contentTimerRef$curr.reset) === null || _contentTimerRef$curr2 === void 0 ? void 0 : _contentTimerRef$curr2.call(_contentTimerRef$curr);
    (_contentTimerRef$curr3 = contentTimerRef.current) === null || _contentTimerRef$curr3 === void 0 ? void 0 : (_contentTimerRef$curr4 = _contentTimerRef$curr3.start) === null || _contentTimerRef$curr4 === void 0 ? void 0 : _contentTimerRef$curr4.call(_contentTimerRef$curr3);
    setPlayRipple(true);
    _services.Services.ms.startRecordAudio({
      url: voiceFilePath,
      audio: AudioOptionRef.current,
      onPosition: pos => {
        console.log('dev:startRecordAudio:pos:', pos);
        voiceDurationRef.current = Math.floor(pos);
      },
      onFailed: error => {
        var _contentTimerRef$curr5, _contentTimerRef$curr6;
        console.warn('dev:startRecordAudio:onFailed:', error);
        onFailed === null || onFailed === void 0 ? void 0 : onFailed({
          reason: 'record voice is failed.',
          error: error
        });
        (_contentTimerRef$curr5 = contentTimerRef.current) === null || _contentTimerRef$curr5 === void 0 ? void 0 : (_contentTimerRef$curr6 = _contentTimerRef$curr5.stop) === null || _contentTimerRef$curr6 === void 0 ? void 0 : _contentTimerRef$curr6.call(_contentTimerRef$curr5);
        setPlayRipple(false);
      },
      onFinished: _ref => {
        let {
          result,
          path,
          error
        } = _ref;
        console.log('dev:startRecordAudio:onFinished:', result, path, error);
      }
    }).then(result => {
      console.log('dev:startRecordAudio:result:', result);
    }).catch(error => {
      var _contentTimerRef$curr7, _contentTimerRef$curr8;
      console.warn('dev:startRecordAudio:error:', error);
      onFailed === null || onFailed === void 0 ? void 0 : onFailed({
        reason: 'record voice is failed.',
        error: error
      });
      (_contentTimerRef$curr7 = contentTimerRef.current) === null || _contentTimerRef$curr7 === void 0 ? void 0 : (_contentTimerRef$curr8 = _contentTimerRef$curr7.stop) === null || _contentTimerRef$curr8 === void 0 ? void 0 : _contentTimerRef$curr8.call(_contentTimerRef$curr7);
      setPlayRipple(false);
    });
  };
  const stopRecord = React.useCallback(() => {
    var _contentTimerRef$curr9, _contentTimerRef$curr10;
    (_contentTimerRef$curr9 = contentTimerRef.current) === null || _contentTimerRef$curr9 === void 0 ? void 0 : (_contentTimerRef$curr10 = _contentTimerRef$curr9.stop) === null || _contentTimerRef$curr10 === void 0 ? void 0 : _contentTimerRef$curr10.call(_contentTimerRef$curr9);
    if (recordTimeoutRef.current) {
      clearTimeout(recordTimeoutRef.current);
      recordTimeoutRef.current = undefined;
    }
    onState('stopping');
    setPlayRipple(false);
    const conv = im.getCurrentConversation();
    if (!conv) {
      _services.Services.ms.stopRecordAudio();
      return;
    }
    _services.Services.ms.stopRecordAudio().then(result => {
      if (result !== null && result !== void 0 && result.path) {
        voiceFileNameRef.current = (0, _utils.uuid)();
        let localPath = _utils.LocalPath.sendVoice(_services.Services.dcs.getFileDir(conv.convId, voiceFileNameRef.current));
        const extension = (0, _utils.getFileExtension)(result.path);
        localPath = localPath + extension;
        voiceFilePathRef.current = localPath;
        voiceFileNameRef.current = voiceFileNameRef.current + extension;
        _services.Services.ms.saveFromLocal({
          targetPath: localPath,
          localPath: result.path
        }).catch(error => {
          onFailed === null || onFailed === void 0 ? void 0 : onFailed({
            reason: 'save file voice is failed.',
            error: error
          });
        });
      }
    }).catch(error => {
      onFailed === null || onFailed === void 0 ? void 0 : onFailed({
        reason: 'stop record voice is failed.',
        error: error
      });
    });
  }, [im, onFailed, onState]);
  const replay = async () => {
    var _contentTimerRef$curr11, _contentTimerRef$curr12, _contentTimerRef$curr13, _contentTimerRef$curr14;
    onState('playing');
    if (isPlayingRef.current === true) {
      return;
    }
    isPlayingRef.current = true;
    (_contentTimerRef$curr11 = contentTimerRef.current) === null || _contentTimerRef$curr11 === void 0 ? void 0 : (_contentTimerRef$curr12 = _contentTimerRef$curr11.reset) === null || _contentTimerRef$curr12 === void 0 ? void 0 : _contentTimerRef$curr12.call(_contentTimerRef$curr11);
    (_contentTimerRef$curr13 = contentTimerRef.current) === null || _contentTimerRef$curr13 === void 0 ? void 0 : (_contentTimerRef$curr14 = _contentTimerRef$curr13.start) === null || _contentTimerRef$curr14 === void 0 ? void 0 : _contentTimerRef$curr14.call(_contentTimerRef$curr13);
    setPlayRipple(true);
    _services.Services.ms.playAudio({
      url: _utils.LocalPath.playVoice(voiceFilePathRef.current),
      onPlay(_ref2) {
        let {
          currentPosition,
          duration
        } = _ref2;
        if (currentPosition === duration) {
          var _contentTimerRef$curr15, _contentTimerRef$curr16;
          isPlayingRef.current = false;
          (_contentTimerRef$curr15 = contentTimerRef.current) === null || _contentTimerRef$curr15 === void 0 ? void 0 : (_contentTimerRef$curr16 = _contentTimerRef$curr15.stop) === null || _contentTimerRef$curr16 === void 0 ? void 0 : _contentTimerRef$curr16.call(_contentTimerRef$curr15);
          onState('stopping');
          setPlayRipple(false);
        }
      }
    }).then(() => {}).catch(error => {
      var _contentTimerRef$curr17, _contentTimerRef$curr18;
      onFailed === null || onFailed === void 0 ? void 0 : onFailed({
        reason: 'play voice is failed.',
        error: error
      });
      isPlayingRef.current = false;
      (_contentTimerRef$curr17 = contentTimerRef.current) === null || _contentTimerRef$curr17 === void 0 ? void 0 : (_contentTimerRef$curr18 = _contentTimerRef$curr17.stop) === null || _contentTimerRef$curr18 === void 0 ? void 0 : _contentTimerRef$curr18.call(_contentTimerRef$curr17);
      onState('stopping');
      setPlayRipple(false);
    });
  };
  const _onClickedRecordButton = () => {
    onClickedRecordButton === null || onClickedRecordButton === void 0 ? void 0 : onClickedRecordButton(state);
    switch (state) {
      case 'idle':
        startRecord();
        break;
      case 'recording':
        stopRecord();
        break;
      case 'playing':
        replay();
        break;
      case 'stopping':
        replay();
        break;
    }
  };
  const _onClickedClearButton = () => {
    var _contentTimerRef$curr19, _contentTimerRef$curr20;
    onClickedClearButton === null || onClickedClearButton === void 0 ? void 0 : onClickedClearButton();
    onState('idle');
    setCurrentTime(0);
    if (isPlayingRef.current === true) {
      _services.Services.ms.stopAudio();
      isPlayingRef.current = false;
    }
    if (recordTimeoutRef.current) {
      clearTimeout(recordTimeoutRef.current);
      recordTimeoutRef.current = undefined;
    }
    (_contentTimerRef$curr19 = contentTimerRef.current) === null || _contentTimerRef$curr19 === void 0 ? void 0 : (_contentTimerRef$curr20 = _contentTimerRef$curr19.stop) === null || _contentTimerRef$curr20 === void 0 ? void 0 : _contentTimerRef$curr20.call(_contentTimerRef$curr19);
    voiceFilePathRef.current = '';
  };
  const _onClickedSendButton = () => {
    onClickedSendButton === null || onClickedSendButton === void 0 ? void 0 : onClickedSendButton({
      localPath: voiceFilePathRef.current,
      duration: voiceDurationRef.current,
      displayName: voiceFileNameRef.current,
      type: 'voice'
    });
  };
  React.useEffect(() => {
    return () => {
      if (recordTimeoutRef.current) {
        clearTimeout(recordTimeoutRef.current);
        recordTimeoutRef.current = undefined;
        stopRecord();
      }
      if (isPlayingRef.current === true) {
        _services.Services.ms.stopAudio();
        isPlayingRef.current = false;
      }
    };
  }, [stopRecord]);
  return {
    state,
    onClickedRecordButton: _onClickedRecordButton,
    onClickedClearButton: _onClickedClearButton,
    onClickedSendButton: _onClickedSendButton,
    contentTimerRef,
    playRipple,
    onContentTimeChanged,
    currentTime: currentTime
  };
}
//# sourceMappingURL=VoiceBar.hooks.js.map