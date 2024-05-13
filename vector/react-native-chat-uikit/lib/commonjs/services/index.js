"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  Services: true
};
exports.Services = void 0;
var _ClipboardService = require("./ClipboardService");
var _DirCacheService = require("./DirCacheService");
var _LocalStorageService = require("./LocalStorageService");
var _MediaService = require("./MediaService");
var _NotificationService = require("./NotificationService");
var _PermissionService = require("./PermissionService");
var _types = require("./types");
Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _types[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _types[key];
    }
  });
});
/**
 * List of basic services provided.
 */
class Services {
  /**
   * Pasteboard service.
   */

  /**
   * Media service.
   */

  /**
   * Notification service.
   */

  /**
   * Permission service.
   */

  /**
   * Local storage service.
   */

  /**
   * Directory cache service.
   */

  /**
   * Create permission service single object.
   * @param option - The option. see {@link PermissionServiceOption}
   * @returns The Permission service object.
   */
  static createPermissionService(option) {
    if (Services.ps === undefined) {
      Services.ps = new _PermissionService.PermissionServiceImplement(option);
    }
    return Services.ps;
  }

  /**
   * Create clipboard service single object.
   * @param option - The option. see {@link ClipboardServiceOption}
   * @returns The clipboard service object.
   */
  static createClipboardService(option) {
    if (Services.cbs === undefined) {
      Services.cbs = new _ClipboardService.ClipboardServiceImplement(option);
    }
    return Services.cbs;
  }

  /**
   * Create media service single object.
   * @param option - The option. see {@link MediaServiceOptions}
   * @returns The media service object.
   */
  static createMediaService(option) {
    if (Services.ms === undefined) {
      Services.ms = new _MediaService.MediaServiceImplement(option);
    }
    return Services.ms;
  }

  /**
   * Create notification service single object.
   * @param option - The option. see {@link NotificationServiceOption}
   * @returns The notification service object.
   */
  static createNotificationService(option) {
    if (Services.ns === undefined) {
      Services.ns = new _NotificationService.NotificationServiceImplement(option);
    }
    return Services.ns;
  }

  /**
   * Create local storage service single object.
   * @param option - The option. see {@link LocalStorageService}
   * @returns The local storage service object.
   */
  static createLocalStorageService(service) {
    if (service) {
      Services.ls = service;
    } else {
      Services.ls = new _LocalStorageService.LocalStorageServiceImplement();
    }
    return Services.ls;
  }

  /**
   * Create directory cache service single object.
   * @param option - The option. see {@link DirCacheServiceOption}
   * @returns The directory cache service object.
   */
  static createDirCacheService(option) {
    if (Services.dcs === undefined) {
      Services.dcs = new _DirCacheService.DirCacheServiceImplement(option);
    }
    return Services.dcs;
  }
}
exports.Services = Services;
//# sourceMappingURL=index.js.map