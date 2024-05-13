"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectCamera = selectCamera;
exports.selectFile = selectFile;
exports.selectOnePicture = selectOnePicture;
exports.selectOneShortVideo = selectOneShortVideo;
var _services = require("../../services");
var _utils = require("../../utils");
function selectOnePicture(params) {
  // !!! https://github.com/react-native-image-picker/react-native-image-picker/issues/1850
  (0, _utils.timeoutTask)(100, () => {
    _services.Services.ms.openMediaLibrary({
      selectionLimit: 1,
      mediaType: 'photo'
    }).then(result => {
      if (result === undefined || result === null || result.length === 0) {
        var _params$onCancel;
        (_params$onCancel = params.onCancel) === null || _params$onCancel === void 0 ? void 0 : _params$onCancel.call(params);
        return;
      }
      params.onResult({
        localPath: _utils.LocalPath.sendImage(result[0].uri),
        fileSize: result[0].size,
        displayName: result[0].name,
        imageWidth: result[0].width ?? 0,
        imageHeight: result[0].height ?? 0,
        fileExtension: result[0].type,
        type: 'image'
      });
    }).catch(error => {
      var _params$onError;
      console.warn('error:', error);
      (_params$onError = params.onError) === null || _params$onError === void 0 ? void 0 : _params$onError.call(params, error);
    });
  });
}
function selectOneShortVideo(params) {
  (0, _utils.timeoutTask)(100, () => {
    _services.Services.ms.openMediaLibrary({
      selectionLimit: 1,
      mediaType: 'video'
    }).then(async result => {
      if (result === undefined || result === null || result.length === 0) {
        var _params$onCancel2;
        (_params$onCancel2 = params.onCancel) === null || _params$onCancel2 === void 0 ? void 0 : _params$onCancel2.call(params);
        return;
      }
      let thumbLocalPath;
      try {
        thumbLocalPath = await _services.Services.ms.getVideoThumbnail({
          url: _utils.LocalPath.createImage(result[0].uri)
        });
      } catch (error) {
        var _params$onError2;
        (_params$onError2 = params.onError) === null || _params$onError2 === void 0 ? void 0 : _params$onError2.call(params, error);
        return;
      }
      let tmp = _utils.LocalPath.sendVideo(_services.Services.dcs.getFileDir(params.convId, (0, _utils.uuid)()));
      const extension = (0, _utils.getFileExtension)(thumbLocalPath);
      tmp = tmp + extension;
      if (thumbLocalPath) {
        await _services.Services.ms.saveFromLocal({
          targetPath: tmp,
          localPath: thumbLocalPath
        });
        thumbLocalPath = tmp;
      }
      params.onResult({
        localPath: _utils.LocalPath.sendVideo(result[0].uri),
        fileSize: result[0].size,
        displayName: result[0].name,
        videoWidth: result[0].width ?? 0,
        videoHeight: result[0].height ?? 0,
        fileExtension: result[0].type,
        duration: undefined,
        thumbLocalPath: _utils.LocalPath.sendImage(thumbLocalPath ?? ''),
        type: 'video'
      });
    }).catch(error => {
      var _params$onError3;
      console.warn('error:', error);
      (_params$onError3 = params.onError) === null || _params$onError3 === void 0 ? void 0 : _params$onError3.call(params, error);
    });
  });
}
function selectCamera(params) {
  (0, _utils.timeoutTask)(100, () => {
    _services.Services.ms.openCamera({
      cameraType: 'back',
      mediaType: 'photo'
    }).then(async result => {
      if (result === undefined || result === null) {
        var _params$onCancel3;
        (_params$onCancel3 = params.onCancel) === null || _params$onCancel3 === void 0 ? void 0 : _params$onCancel3.call(params);
        return;
      }
      params.onResult({
        localPath: _utils.LocalPath.sendImage(result.uri),
        fileSize: result.size,
        displayName: result.name,
        imageHeight: result.width ?? 0,
        imageWidth: result.height ?? 0,
        fileExtension: result.type,
        type: 'image'
      });
    }).catch(error => {
      var _params$onError4;
      console.warn('error:', error);
      (_params$onError4 = params.onError) === null || _params$onError4 === void 0 ? void 0 : _params$onError4.call(params, error);
    });
  });
}
function selectFile(params) {
  (0, _utils.timeoutTask)(100, () => {
    _services.Services.ms.openDocument({}).then(result => {
      // !!! weird bug: Paths with % percent signs are not supported.
      // !!! iOS returns the uri string and needs to be decoded. Normally no decoding is required.
      // if (Platform.OS === 'ios') {
      //   if (result?.uri.includes('%')) {
      //     // let uri = result.uri.substring(result.uri.lastIndexOf('/'));
      //     // let uri2 = result.uri.substring(0, result.uri.lastIndexOf('/'));
      //     // result.uri = uri2 + decodeURIComponent(uri);
      //     result.uri = decodeURIComponent(result.uri);
      //   }
      // }

      if (result) {
        params.onResult({
          localPath: _utils.LocalPath.sendFile(result.uri),
          fileSize: result.size,
          displayName: result.name,
          fileExtension: result.type,
          type: 'file'
        });
      } else {
        var _params$onCancel4;
        (_params$onCancel4 = params.onCancel) === null || _params$onCancel4 === void 0 ? void 0 : _params$onCancel4.call(params);
      }
    }).catch(error => {
      var _params$onError5;
      console.warn('error:', error);
      (_params$onError5 = params.onError) === null || _params$onError5 === void 0 ? void 0 : _params$onError5.call(params, error);
    });
  });
}
//# sourceMappingURL=useSelectFile.js.map