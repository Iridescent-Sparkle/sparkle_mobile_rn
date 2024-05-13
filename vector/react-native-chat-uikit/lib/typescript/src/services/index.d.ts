import type { ClipboardService, ClipboardServiceOption, DirCacheService, DirCacheServiceOption, LocalStorageService, MediaService, MediaServiceOptions, NotificationService, NotificationServiceOption, PermissionService, PermissionServiceOption } from './types';
/**
 * List of basic services provided.
 */
export declare class Services {
    /**
     * Pasteboard service.
     */
    static cbs: ClipboardService;
    /**
     * Media service.
     */
    static ms: MediaService;
    /**
     * Notification service.
     */
    static ns: NotificationService;
    /**
     * Permission service.
     */
    static ps: PermissionService;
    /**
     * Local storage service.
     */
    static ls: LocalStorageService;
    /**
     * Directory cache service.
     */
    static dcs: DirCacheService;
    /**
     * Create permission service single object.
     * @param option - The option. see {@link PermissionServiceOption}
     * @returns The Permission service object.
     */
    static createPermissionService(option: PermissionServiceOption): PermissionService;
    /**
     * Create clipboard service single object.
     * @param option - The option. see {@link ClipboardServiceOption}
     * @returns The clipboard service object.
     */
    static createClipboardService(option: ClipboardServiceOption): ClipboardService;
    /**
     * Create media service single object.
     * @param option - The option. see {@link MediaServiceOptions}
     * @returns The media service object.
     */
    static createMediaService(option: MediaServiceOptions): MediaService;
    /**
     * Create notification service single object.
     * @param option - The option. see {@link NotificationServiceOption}
     * @returns The notification service object.
     */
    static createNotificationService(option: NotificationServiceOption): NotificationService;
    /**
     * Create local storage service single object.
     * @param option - The option. see {@link LocalStorageService}
     * @returns The local storage service object.
     */
    static createLocalStorageService(service?: LocalStorageService): LocalStorageService;
    /**
     * Create directory cache service single object.
     * @param option - The option. see {@link DirCacheServiceOption}
     * @returns The directory cache service object.
     */
    static createDirCacheService(option: DirCacheServiceOption): DirCacheService;
}
export * from './types';
//# sourceMappingURL=index.d.ts.map