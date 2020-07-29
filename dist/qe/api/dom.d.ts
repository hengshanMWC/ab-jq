/**
 * 结尾插入
*/
export declare function append(htmlElement: HTMLElement): QElement;
/**
 * 头部插入
*/
export declare function prepend(htmlElement: HTMLElement): QElement;
/**
 * 之后插入
*/
export declare function after(htmlElement: HTMLElement): QElement;
/**
 * 之前插入
*/
export declare function before(htmlElement: HTMLElement): QElement;
/**
 * 删除
 */
export declare function remove(): QElement;
/**
 * 删除子元素
 */
export declare function empty(): QElement;
/**
 * 返回/修改innerHTML
*/
export declare function html(HTMLString?: any): any;
/**
 * 返回/修改innerText
*/
export declare function text(str?: any): any;
