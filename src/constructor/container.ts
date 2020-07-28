import createElement from './element'
import createHtmlElement from '../private/createHtmlElement'
function forElement (elements: string, cd: Function): QElements {
  const elementContainer = createHtmlElement(elements)
    this.nodeList.forEach(node => {
      if(elementContainer instanceof Array){
        elementContainer.forEach(element => {
          cd(node, element.cloneNode(true))
        })
      } else {
        cd(node, elementContainer.cloneNode(true))
      }
    })
    return this
}
const API = {
  append: forElement,
  prepend: forElement,
  after: forElement,
  before: forElement,
}
export default function (selectors: string): QElements {
  const nodeList = document.querySelectorAll(selectors)
  return Object.assign(Array.from(nodeList).map(createElement), API, {
    selectors,
    nodeList
  })
}