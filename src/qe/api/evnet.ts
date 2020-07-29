/** 
 * 绑定事件
*/
export function on (type: string, listener: Function, options?: Boolean | Object): QElement
export function on (type: string[], listener: Function, options?: Boolean | Object): QElement
export function on (type: eventFunctions, options?: Boolean | Object): QElement
export function on (type, listener, options?): QElement {
  if (typeof type === 'string') {
    this.element.addEventListener(type, listener, options)
  } else if (Array.isArray(type)) {
    type.forEach(val => {
      this.element.addEventListener(val, listener, options)
    })
  } else if (typeof type === 'object') {
    Object.keys(type).forEach(key => {
      this.element.addEventListener(key, type[key], listener)
    })
  }
  return this
}