/// <reference types="react" />
/**
 * Search Component properties.
 */
export type SearchProps = {
    /**
     * Cancel button click event.
     */
    onCancel?: () => void;
    /**
     * Text change event.
     */
    onChangeText?: ((text: string) => void) | undefined;
    /**
     * Text value.
     */
    value?: string | undefined;
    /**
     * Back button click event.
     */
    onBack?: () => void;
};
/**
 * Search Component.
 */
export declare function Search(props: SearchProps): JSX.Element;
//# sourceMappingURL=Search.d.ts.map