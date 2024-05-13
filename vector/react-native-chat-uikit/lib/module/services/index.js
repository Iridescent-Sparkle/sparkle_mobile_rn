import { ClipboardServiceImplement } from './ClipboardService';
import { DirCacheServiceImplement } from './DirCacheService';
import { LocalStorageServiceImplement } from './LocalStorageService';
import { MediaServiceImplement } from './MediaService';
import { NotificationServiceImplement } from './NotificationService';
import { PermissionServiceImplement } from './PermissionService';
/**
 * List of basic services provided.
 */
export class Services {
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
      Services.ps = new PermissionServiceImplement(option);
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
      Services.cbs = new ClipboardServiceImplement(option);
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
      Services.ms = new MediaServiceImplement(option);
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
      Services.ns = new NotificationServiceImplement(option);
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
      Services.ls = new LocalStorageServiceImplement();
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
      Services.dcs = new DirCacheServiceImplement(option);
    }
    return Services.dcs;
  }
}
export * from './types';
//# sourceMappingURL=index.js.map