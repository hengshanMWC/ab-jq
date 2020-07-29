import createQElements from './index'
/** 
 * 筛选返回新的QElements
*/
export function $filter (selectors: string = ''): QElements {
  return createQElements(this.selectors + selectors)
}