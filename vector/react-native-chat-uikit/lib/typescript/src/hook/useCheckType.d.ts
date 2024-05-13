declare const ExpectedType: "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function";
/**
 * Check whether the object type is as expected.
 *
 * @example
 *
 * ```tsx
 * export function TestComponent({
 *    containerStyle,
 *  }: {
 *    containerStyle?: StyleProp<ViewStyle> | undefined;
 *  }) {
 *    const { getStyleSize } = useGetStyleProps();
 *    const size = getStyleSize(containerStyle);
 *    const { checkType } = useCheckType();
 *    checkType(size.width, 'string');
 *    return (
 *      <View
 *        style={[
 *          { width: 100, height: 100, backgroundColor: 'red' },
 *          containerStyle,
 *        ]}
 *      >
 *        <Text>{'I am a striking color block.'}</Text>
 *      </View>
 *    );
 *  }
 * ```
 */
export declare function useCheckType(params?: {
    enabled?: boolean;
}): {
    checkType: (object: any, expectedType: typeof ExpectedType, others?: {
        callerName?: string;
        objectName?: string;
    }) => void;
};
export {};
//# sourceMappingURL=useCheckType.d.ts.map