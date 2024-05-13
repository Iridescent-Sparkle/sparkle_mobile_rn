import type { Nullable } from '../types';
import type { NotificationService, NotificationServiceOption, Unsubscribe } from './types';
export declare class NotificationServiceImplement implements NotificationService {
    option: NotificationServiceOption;
    constructor(option: NotificationServiceOption);
    getAPNSToken(): Promise<Nullable<string>>;
    getFCMToken(): Promise<Nullable<string>>;
    onTokenRefresh(handler: (token: string) => void): Unsubscribe;
}
//# sourceMappingURL=NotificationService.d.ts.map