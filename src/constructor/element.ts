import { append, prepend, after, before, html, text } from '../api/dom'
import { css, addClass, removeClass } from '../api/attr'
import { on } from '../api/evnet'
export default function (element: Element): QElement {
  return {
    element,
    append,
    prepend,
    after,
    before,
    html,
    text,
    css,
    addClass,
    removeClass,
    on,
  }
}