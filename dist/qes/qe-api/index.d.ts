declare const _default: {
    append: (htmlElement: HTMLElement) => QElement;
    prepend: (htmlElement: HTMLElement) => QElement;
    after: (htmlElement: HTMLElement) => QElement;
    before: (htmlElement: HTMLElement) => QElement;
    remove: () => QElement;
    empty: () => QElement;
    html: (HTMLString?: any) => QElement;
    text: (str?: any) => QElement;
    css: {
        (key: string, value: string | number): QElement;
        (key: string): string;
        (key: string[]): object;
        (key: object): QElement;
        (): CSSStyleDeclaration;
        (key?: any, value?: any): any;
    };
    addClass: (cs?: string | string[]) => string | QElement;
    removeClass: (cs?: string | string[]) => QElement;
    on: {
        (type: string, listener: Function, options?: Object | Boolean): QElement;
        (type: string[], listener: Function, options?: Object | Boolean): QElement;
        (type: eventFunctions, options?: Object | Boolean): QElement;
        (type: any, listener: any, options?: any): QElement;
    };
    off: (type: string, listener: Function) => QElement;
};
export default _default;
