import QElement from '../qe'
import publicApi from './qe-api'
function qeFactory (nodeList: NodeListOf<Element>): QElement[] {
  return Array.from(nodeList).map(element => new QElement(element))
}
export default function createQElements (selectors: string): QElements {
  const nodeList = document.querySelectorAll(selectors)
  return Object.assign(qeFactory(nodeList), publicApi, {
    selectors,
    nodeList
  })
}