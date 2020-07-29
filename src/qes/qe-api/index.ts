
import { createElement, createFor } from "./createApiFn";
export default {
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