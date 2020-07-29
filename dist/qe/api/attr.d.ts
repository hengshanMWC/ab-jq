/**
 * 返回/修改style
*/
export declare function css(key: string, value: string | number): QElement;
export declare function css(key: string): string;
export declare function css(key: Array<string>): object;
export declare function css(key: object): QElement;
export declare function css(): CSSStyleDeclaration;
/**
 * 返回/修改className
*/
export declare function addClass(cs?: string | string[]): string | QElement;
export declare function removeClass(cs?: string | string[]): QElement;
