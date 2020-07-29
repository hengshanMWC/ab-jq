/** 
 * 结尾插入
*/
export function append (htmlElement: HTMLElement): QElement {
  this.element.appendChild(htmlElement)
  return this
}
/** 
 * 头部插入
*/
export function prepend (htmlElement: HTMLElement): QElement {
  const he = this.element.firstElementChild
  he 
    ? this.element.insertBefore(htmlElement, he)
    : this.append(htmlElement)
  return this
}
/** 
 * 之后插入
*/
export function after (htmlElement: HTMLElement): QElement {
  const he = this.element.nextElementSibling
  he 
    ? this.element.parentElement.insertBefore(htmlElement, he)
    : this.append(htmlElement)
  return this
}
/** 
 * 之前插入
*/
export function before (htmlElement: HTMLElement): QElement {
  const he = this.element.previousElementSibling
  he 
    ? this.element.parentElement.insertBefore(htmlElement, he)
    : this.append(htmlElement)
  return this
}
/**
 * 删除
 */
export function remove (): QElement {
  this.element.parentElement.removeChild(this.element)
  return this
}
/**
 * 删除子元素
 */
export function empty (): QElement {
  const children = this.element.children
  for (let i = 0; i < children.length; i++) {
    this.element.removeChild(children[i])
  }
  return this
}
/** 
 * 返回/修改innerHTML
*/
export function html (HTMLString?: any) {
  if (HTMLString) {
    this.element.innerHTML = HTMLString
    return this
  } else {
    return this.element.innerHTML
  }
}
/** 
 * 返回/修改innerText
*/
export function text (str?: any) {
  if (str) {
    this.element.innerText = str
    return this
  } else {
    return this.element.innerText
  }
}