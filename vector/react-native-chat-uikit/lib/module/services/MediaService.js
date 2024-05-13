function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import { createThumbnail } from '@easemob/react-native-create-thumbnail';
import React from 'react';
import { Platform } from 'react-native';
import { generateFileName, getFileExtension, getFileType } from '../utils/file';
export class MediaServiceImplement {
  constructor(option) {
    this.option = option;
    this.rootDir = '';
    this.audioPlayer = new this.option.audioModule.default();
    const rootDirName = this.option.rootDirName ?? 'chatuikit';
    this.createRootDir(rootDirName);
  }
  createRootDir(rootDirName, DocumentDir) {
    const _rootDir = Platform.select({
      ios: this.option.fsModule.Dirs.LibraryDir,
      default: this.option.fsModule.Dirs.DocumentDir
    });
    const docDir = DocumentDir ?? _rootDir;
    this.rootDir = `${docDir}/${rootDirName}`;
    console.log('dev:rootDir:', this.rootDir);
    const create = () => {
      this.option.fsModule.FileSystem.exists(this.rootDir).then(result => {
        if (result === false) {
          this.option.fsModule.FileSystem.mkdir(this.rootDir);
        }
      }).catch(error => {
        console.warn(error);
      });
    };
    this.option.permission.hasMediaLibraryPermission().then(result => {
      console.log(result);
      if (result === false) {
        this.option.permission.requestMediaLibraryPermission().then(_ => {
          create();
        }).catch(error => {
          console.log(error);
        });
      } else {
        create();
      }
    }).catch(error => {
      console.warn(error);
    });
  }
  getRootDir() {
    return this.rootDir;
  }
  async createDir(subDir) {
    let dir = this.rootDir;
    if (subDir.startsWith('/')) {
      dir += subDir;
    } else {
      dir += '/' + subDir;
    }
    console.log('dev:createDir', dir);
    return this.option.fsModule.FileSystem.mkdir(dir);
  }
  async deleteDir(subDir) {
    let dir = this.rootDir;
    if (subDir.startsWith('/')) {
      dir += subDir;
    } else {
      dir += '/' + subDir;
    }
    console.log('dev:deleteDir', dir);
    return this.option.fsModule.FileSystem.unlink(dir);
  }
  async isDir(subDir) {
    let dir = this.rootDir;
    if (subDir.startsWith('/')) {
      dir += subDir;
    } else {
      dir += '/' + subDir;
    }
    return this.option.fsModule.FileSystem.isDir(dir);
  }
  async isExistedDir(subDir) {
    let dir = this.rootDir;
    if (subDir.startsWith('/')) {
      dir += subDir;
    } else {
      dir += '/' + subDir;
    }
    return this.option.fsModule.FileSystem.exists(dir);
  }
  async isExistedFile(file) {
    return this.option.fsModule.FileSystem.exists(file);
  }
  async startRecordAudio(options) {
    const hasPermission = await this.option.permission.hasCameraAndMicPermission();
    if (!hasPermission) {
      const granted = await this.option.permission.requestCameraAndMicPermission();
      if (!granted) {
        var _options$onFailed;
        options === null || options === void 0 ? void 0 : (_options$onFailed = options.onFailed) === null || _options$onFailed === void 0 ? void 0 : _options$onFailed.call(options, new Error('Failed to obtain permission.'));
        return false;
      }
    }
    try {
      var _options$onFinished;
      const recorder = this.audioPlayer;
      recorder.addRecordBackListener(e => {
        var _options$onPosition;
        (_options$onPosition = options.onPosition) === null || _options$onPosition === void 0 ? void 0 : _options$onPosition.call(options, e.currentPosition);
        if (this.record && e.currentPosition > 0) {
          this.record.pos = e.currentPosition;
        }
      });
      const uri = await recorder.startRecorder(options.url, options.audio);
      (_options$onFinished = options.onFinished) === null || _options$onFinished === void 0 ? void 0 : _options$onFinished.call(options, {
        result: true,
        path: uri
      });
      this.record = {
        pos: 0,
        path: uri
      };
      return true;
    } catch (error) {
      var _options$onFailed2, _options$onFinished2;
      this.record = undefined;
      options === null || options === void 0 ? void 0 : (_options$onFailed2 = options.onFailed) === null || _options$onFailed2 === void 0 ? void 0 : _options$onFailed2.call(options, error);
      (_options$onFinished2 = options.onFinished) === null || _options$onFinished2 === void 0 ? void 0 : _options$onFinished2.call(options, {
        result: false,
        path: undefined,
        error: error
      });
      return false;
    }
  }
  async stopRecordAudio() {
    const recorder = this.audioPlayer;
    await recorder.stopRecorder();
    recorder.removeRecordBackListener();
    return this.record;
  }
  async playAudio(options) {
    const hasPermission = await this.option.permission.hasMediaLibraryPermission();
    if (!hasPermission) {
      const granted = await this.option.permission.requestMediaLibraryPermission();
      if (!granted) {
        var _options$onFailed3;
        options === null || options === void 0 ? void 0 : (_options$onFailed3 = options.onFailed) === null || _options$onFailed3 === void 0 ? void 0 : _options$onFailed3.call(options, new Error('Failed to obtain permission.'));
        return false;
      }
    }
    try {
      var _options$onFile;
      const recorder = this.audioPlayer;
      recorder.addPlayBackListener(value => {
        var _options$onPlay;
        (_options$onPlay = options.onPlay) === null || _options$onPlay === void 0 ? void 0 : _options$onPlay.call(options, {
          ...value
        });
      });
      // !!! extension must, or no working
      // url =
      //   'file:///var/mobile/Containers/Data/Application/A630B779-3187-4CE7-A6DC-470AA34ED72F/Library/Caches/sound.m4a';
      const r = await recorder.startPlayer(options.url, options.opt);
      (_options$onFile = options.onFile) === null || _options$onFile === void 0 ? void 0 : _options$onFile.call(options, r);
      return true;
    } catch (error) {
      console.warn('playAudio:', error);
      return false;
    }
  }
  async stopAudio() {
    const recorder = this.audioPlayer;
    await recorder.stopPlayer();
    recorder.removePlayBackListener();
  }
  resultReduction(_ref) {
    let {
      uri,
      size,
      name,
      type,
      width,
      height
    } = _ref;
    if (!uri) return null;
    return {
      uri,
      size: size ?? 0,
      name: name ?? '',
      type: type ?? '',
      width: width === null ? undefined : width,
      height: height === null ? undefined : height
    };
  }
  async openMediaLibrary(options) {
    /**
     * NOTE: options.selectionLimit {@link https://github.com/react-native-image-picker/react-native-image-picker#options}
     * We do not support 0 (any number of files)
     **/
    const hasPermission = await this.option.permission.hasMediaLibraryPermission();
    if (!hasPermission) {
      const granted = await this.option.permission.requestMediaLibraryPermission();
      if (!granted) {
        var _options$onFailed4;
        options === null || options === void 0 ? void 0 : (_options$onFailed4 = options.onFailed) === null || _options$onFailed4 === void 0 ? void 0 : _options$onFailed4.call(options, new Error('Failed to obtain permission.'));
        return [];
      }
    }
    let selectionLimit = 1;
    if (options !== undefined) {
      selectionLimit = options.selectionLimit ? options.selectionLimit : 1;
    }
    const imagePicker = this.option.imagePickerModule;
    const response = await imagePicker.launchImageLibrary({
      presentationStyle: 'fullScreen',
      selectionLimit: selectionLimit,
      mediaType: (() => {
        switch (options === null || options === void 0 ? void 0 : options.mediaType) {
          case 'photo':
            return 'photo';
          case 'video':
            return 'video';
          case 'all':
            return 'mixed';
          default:
            return 'photo';
        }
      })()
    });
    if (response.didCancel) return [];
    if (response.errorCode === 'camera_unavailable') {
      var _options$onFailed5;
      options === null || options === void 0 ? void 0 : (_options$onFailed5 = options.onFailed) === null || _options$onFailed5 === void 0 ? void 0 : _options$onFailed5.call(options, new Error(response.errorMessage));
      return [];
    }
    const r = (response.assets || []).slice(0, selectionLimit).map(_ref2 => {
      let {
        fileName: name,
        fileSize: size,
        type,
        uri,
        width,
        height
      } = _ref2;
      return this.resultReduction({
        uri,
        size,
        name,
        type,
        width,
        height
      });
    });
    return r;
  }
  async openCamera(options) {
    var _response$assets;
    const hasPermission = await this.option.permission.hasCameraAndMicPermission();
    if (!hasPermission) {
      const granted = await this.option.permission.requestCameraAndMicPermission();
      if (!granted) {
        var _options$onFailed6;
        options === null || options === void 0 ? void 0 : (_options$onFailed6 = options.onFailed) === null || _options$onFailed6 === void 0 ? void 0 : _options$onFailed6.call(options, new Error('Failed to obtain permission.'));
        return null;
      }
    }
    const imagePicker = this.option.imagePickerModule;
    const response = await imagePicker.launchCamera({
      presentationStyle: 'fullScreen',
      cameraType: (options === null || options === void 0 ? void 0 : options.cameraType) ?? 'back',
      mediaType: (() => {
        switch (options === null || options === void 0 ? void 0 : options.mediaType) {
          case 'photo':
            return 'photo';
          case 'video':
            return 'video';
          case 'all':
            return 'mixed';
          default:
            return 'photo';
        }
      })()
    });
    if (response.didCancel) return null;
    if (response.errorCode === 'camera_unavailable') {
      var _options$onFailed7;
      options === null || options === void 0 ? void 0 : (_options$onFailed7 = options.onFailed) === null || _options$onFailed7 === void 0 ? void 0 : _options$onFailed7.call(options, new Error('Failed to obtain permission.'));
      return null;
    }
    const {
      fileName: name,
      fileSize: size,
      type,
      uri
    } = ((_response$assets = response.assets) === null || _response$assets === void 0 ? void 0 : _response$assets[0]) ?? {};
    return this.resultReduction({
      uri,
      size,
      name,
      type
    });
  }
  async openDocument(options) {
    const hasPermission = await this.option.permission.hasMediaLibraryPermission();
    if (!hasPermission) {
      const granted = await this.option.permission.requestMediaLibraryPermission();
      if (!granted) throw new Error('Permission not granted');
    }
    try {
      // !!! mode: 'open' Failed to send file in open mode. Native problem.
      const {
        uri,
        size,
        name,
        type
      } = await this.option.documentPickerModule.pickSingle({
        mode: 'open'
        // type: ['public.folder'],
      });

      return this.resultReduction({
        uri,
        size,
        name,
        type
      });
    } catch (e) {
      if (!this.option.documentPickerModule.isCancel(e) && this.option.documentPickerModule.isInProgress(e)) {
        var _options$onFailed8;
        options === null || options === void 0 ? void 0 : (_options$onFailed8 = options.onFailed) === null || _options$onFailed8 === void 0 ? void 0 : _options$onFailed8.call(options, new Error('Failed to obtain permission.'));
      }
      return null;
    }
  }
  async saveFromUrl(_ref3) {
    let {
      remoteUrl,
      localPath
    } = _ref3;
    await this.option.fsModule.FileSystem.fetch(remoteUrl, {
      path: localPath
    });
    return localPath;
  }
  async saveFromLocal(_ref4) {
    let {
      targetPath,
      localPath
    } = _ref4;
    await this.option.fsModule.FileSystem.cp(localPath, targetPath);
    return targetPath;
  }
  async save(options) {
    const basePath = options.basePath ?? Platform.select({
      android: this.option.fsModule.Dirs.CacheDir,
      default: this.option.fsModule.Dirs.DocumentDir
    });
    let downloadPath = `${basePath}/${options.fileName}`;
    if (!getFileExtension(options.fileName)) {
      const extensionFromUrl = getFileExtension(options.fileUrl);
      if (getFileType(extensionFromUrl).match(/image|video/)) {
        downloadPath += extensionFromUrl;
      }
    }
    await this.option.fsModule.FileSystem.fetch(options.fileUrl, {
      path: downloadPath
    });
    const fileType = getFileType(getFileExtension(options.fileUrl));
    if (Platform.OS === 'ios' && (fileType === 'image' || fileType === 'video')) {
      const type = {
        image: 'photo',
        video: 'video'
      }[fileType];
      await this.option.mediaLibraryModule.save(downloadPath, {
        type
      });
    } else if (Platform.OS === 'android') {
      const dirType = {
        file: 'downloads',
        audio: 'audio',
        image: 'images',
        video: 'video'
      };
      await this.option.fsModule.FileSystem.cpExternal(downloadPath, generateFileName(options.fileName, getFileExtension(options.fileUrl)), dirType[fileType]);
    } else {
      throw new Error('This platform is not supported.');
    }
    return downloadPath;
  }
  static _hash(str) {
    return String(Math.abs(
    // eslint-disable-next-line no-bitwise
    str.split('').reduce((a, c) => (a << 5) - a + c.charCodeAt(0) | 0, 0)));
  }
  getVideoComponent(_ref5) {
    let {
      source,
      resizeMode,
      onLoad,
      ...props
    } = _ref5;
    const VideoComponent = this.option.videoModule;
    return /*#__PURE__*/React.createElement(VideoComponent, _extends({}, props, {
      source: source,
      resizeMode: resizeMode,
      onLoad: onLoad,
      controls: true
    }));
  }
  async getVideoThumbnail(options) {
    try {
      // const CreateThumbnail = this.option.videoThumbnail;
      const {
        path
      } = await createThumbnail({
        videoUrl: options.url,
        timestamp: 0,
        cacheName: MediaServiceImplement._hash(options.url)
      });
      return path;
    } catch (e) {
      console.warn(e);
      return undefined;
    }
  }
}
//# sourceMappingURL=MediaService.js.map