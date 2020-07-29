interface QElements extends QEApi {}
interface QElements extends Array<QElement> {
  selectors: string
  nodeList: NodeListOf<Element>
}
interface QElement extends QEApi {
  element: Element
}
interface QEApi {
  append(htmlElement: HTMLElement): QElement
  prepend(htmlElement: HTMLElement): QElement
  after(htmlElement: HTMLElement): QElement
  before(htmlElement: HTMLElement): QElement
  html(HTMLString?: any): QElement
  text(str?: any): QElement
  css(key: string, value: string | number): QElement
  css(key: string): string
  css(key: Array<string>): object
  css(key: object): QElement
  css(): CSSStyleDeclaration
  css(key?, value?): any
  addClass(cs?: string | string[]): string | QElement
  removeClass(cs?: string | string[]): QElement
  on(type: string, listener: Function, options?: Boolean | Object): QElement
  on(type: string[], listener: Function, options?: Boolean | Object): QElement
  on(type: eventFunctions, options?: Boolean | Object): QElement
  on(type, listener, options?): QElement
}
type ElementElements = HTMLElement | HTMLElement[]
type ElementContainer = Array<ElementElements>
type eventFunction = (event: Event) => {}
interface eventFunctions {
  [param: string]: eventFunction
}