import { Permission } from 'react-native';
export declare function requestCameraPermission(): Promise<boolean>;
export declare function requestRecordPermission(): Promise<boolean>;
export declare function requestStoragePermission(): Promise<boolean>;
export declare function requestPermission(permission: Permission): Promise<boolean>;
export declare function requestPermissions(): Promise<boolean>;
export declare function checkPermission(permission: Permission): Promise<boolean>;
export declare function checkPermissions(): Promise<boolean>;
export declare function checkCameraPermission(): Promise<boolean>;
export declare function checkRecordPermission(): Promise<boolean>;
export declare function checkStoragePermission(): Promise<boolean>;
//# sourceMappingURL=permission.d.ts.map