/**
 * 绑定事件
*/
export declare function on(type: string, listener: Function, options?: Boolean | Object): QElement;
export declare function on(type: string[], listener: Function, options?: Boolean | Object): QElement;
export declare function on(type: eventFunctions, options?: Boolean | Object): QElement;
/**
 * 解绑事件
*/
export declare function off(type: string, listener: Function): QElement;
