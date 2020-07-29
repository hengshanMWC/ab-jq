import createQElements from './index'
export default {
  /** 
   * 筛选返回新的QElements
  */
  $filter (selectors: string = ''): QElements {
    return createQElements(this.selectors + selectors)
  } 
}