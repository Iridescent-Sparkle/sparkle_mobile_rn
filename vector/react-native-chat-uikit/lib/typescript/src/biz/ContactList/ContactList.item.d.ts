import * as React from 'react';
import { SectionListData } from 'react-native';
import type { IndexModel } from '../ListIndex';
import type { ContactItemProps, ContactListItemProps } from './types';
/**
 * Contact list item component.
 */
export declare function ContactListItem(props: ContactListItemProps): JSX.Element;
export declare const ContactListItemMemo: React.MemoExoticComponent<typeof ContactListItem>;
/**
 * Contact list item header component.
 */
export declare function ContactListItemHeader(props: SectionListData<ContactListItemProps, IndexModel>): JSX.Element;
export declare const ContactListItemHeaderMemo: React.MemoExoticComponent<typeof ContactListItemHeader>;
/**
 * Contact list item header component.
 */
export declare function ContactItem(props: ContactItemProps): JSX.Element;
//# sourceMappingURL=ContactList.item.d.ts.map