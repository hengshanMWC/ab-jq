import createHtmlElement from '../createHtmlElement'
import QElement from '../../qe/index'
export function createElement (api: string): Function {
  return function (elements: string) {
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
export function createFor (api: string): Function {
  return function (...asg) {
    const box = this.map((qelement: QElement) => qelement[api](...asg))
    if (box[0] instanceof QElement) {
      return this
    } else {
      return box
    }
  }
}