import QElement from '../qe'
import qeAPI from './qe-api'
import API from './api'
function qeFactory (nodeList: NodeListOf<Element>): QElement[] {
  return Array.from(nodeList).map(element => new QElement(element))
}
export default function createQElements (selectors: string): QElements {
  const nodeList = document.querySelectorAll(selectors)
  return Object.assign(qeFactory(nodeList), qeAPI, API, {
    selectors,
    nodeList
  })
}