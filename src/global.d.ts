interface QElements extends Array<QElement> {
  selectors: string
  nodeList: NodeListOf<Element>
}
interface QElement {
  element: Element
  append(): QElement
  prepend(): QElement
  after(): QElement
  before(): QElement
  html(): QElement
  text(): QElement
  css(): QElement
  addClass(): QElement
  removeClass(): QElement
  on(): QElement
}
type ElementElements = HTMLElement | HTMLElement[]
type ElementContainer = Array<ElementElements>