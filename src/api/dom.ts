export function append (htmlElement: HTMLElement): QElement {
  this.element.appendChild(htmlElement)
  return this
}
export function prepend (htmlElement: HTMLElement): QElement {
  const he = this.element.firstElementChild
  he 
    ? this.element.insertBefore(htmlElement, he)
    : this.append(htmlElement)
  return this
}
export function after (htmlElement: HTMLElement): QElement {
  const he = this.element.nextElementSibling
  he 
    ? this.element.parentElement.insertBefore(htmlElement, he)
    : this.append(htmlElement)
  return this
}
export function before (htmlElement: HTMLElement): QElement {
  const he = this.element.previousElementSibling
  he 
    ? this.element.parentElement.insertBefore(htmlElement, he)
    : this.append(htmlElement)
  return this
}
export function html (HTMLString?: any) {
  if (HTMLString) {
    this.element.innerHTML = HTMLString
    return this
  } else {
    return this.element.innerHTML
  }
}
export function text (str?: any) {
  if (str) {
    this.element.innerText = str
    return this
  } else {
    return this.element.innerText
  }
}