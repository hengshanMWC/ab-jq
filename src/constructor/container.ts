import createElement from './element'
import element from './element'
export default function (selectors: string) {
  const nodeList = document.querySelectorAll(selectors)
  const result = Array.from(nodeList).map(element => createElement(element))
  return result
}