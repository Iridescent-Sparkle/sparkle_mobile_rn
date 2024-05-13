import type { PermissionService, PermissionServiceOption } from './types';
export declare class PermissionServiceImplement implements PermissionService {
    option: PermissionServiceOption;
    constructor(option: PermissionServiceOption);
    private resultReduction;
    private getAndroidMediaPermissions;
    private cameraAndMic;
    private location;
    private media;
    hasCameraAndMicPermission(): Promise<boolean>;
    requestCameraAndMicPermission(): Promise<boolean>;
    hasLocationPermission(): Promise<boolean>;
    requestLocationPermission(): Promise<boolean>;
    hasMediaLibraryPermission(): Promise<boolean>;
    requestMediaLibraryPermission(): Promise<boolean>;
    hasNotificationPermission(): Promise<boolean>;
    requestNotificationPermission(): Promise<boolean>;
}
//# sourceMappingURL=PermissionService.d.ts.map