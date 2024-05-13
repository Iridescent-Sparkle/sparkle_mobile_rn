/**
 * ref: https://juejin.cn/post/7095608521110061064
 */
export declare class Queue<T> {
    items: T[];
    constructor();
    enqueue(element: T): void;
    dequeue(): T | undefined;
    front(): T | undefined;
    isEmpty(): boolean;
    size(): number;
    toString(): string;
}
//# sourceMappingURL=Queue.d.ts.map