import { append, prepend, after, before, html, text } from './api/dom'
import { css, addClass, removeClass } from './api/attr'
import { on } from './api/evnet'
export default function QElement (element: Element) {
  this.element = element
}
QElement.prototype.append = append
QElement.prototype.prepend = prepend
QElement.prototype.after = after
QElement.prototype.before = before
QElement.prototype.html = html
QElement.prototype.text = text
QElement.prototype.css = css
QElement.prototype.addClass = addClass
QElement.prototype.removeClass = removeClass
QElement.prototype.on = on
