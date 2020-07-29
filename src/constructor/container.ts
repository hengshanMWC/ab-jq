import QElement from './element'
import createHtmlElement from '../private/createHtmlElement'
function createElement (api: string): Function {
  return function (elements) {
    const elementContainer = createHtmlElement(elements)
    this.forEach(qelement => {
      if(elementContainer instanceof Array){
        elementContainer.forEach(element => {
          qelement[api](element.cloneNode(true))
        })
      } else {
        qelement[api](elementContainer.cloneNode(true))
      }
    })
    return this
  }
}
function createFor (api: string): Function {
  return function (...asg) {
    const box = this.map((qelement: QElement) => qelement[api](...asg))
    if (box[0] instanceof QElement) {
      return this
    } else {
      return box
    }
  }
}
const API = {
  append: (<QElements['append']>createElement('append')),
  prepend: (<QElements['prepend']>createElement('prepend')),
  after: (<QElements['after']>createElement('after')),
  before: (<QElements['before']>createElement('before')),
  html: (<QElements['html']>createFor('html')),
  text: (<QElements['text']>createFor('text')),
  css: (<QElements['css']>createFor('css')),
  addClass: (<QElements['addClass']>createFor('addClass')),
  removeClass: (<QElements['removeClass']>createFor('removeClass')),
  on: (<QElements['on']>createFor('on')),
}
export default function (selectors: string): QElements {
  const nodeList = document.querySelectorAll(selectors)
  return Object.assign(Array.from(nodeList).map(element => new QElement(element)), API, {
    selectors,
    nodeList
  })
}