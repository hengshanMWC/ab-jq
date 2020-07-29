/** 
 * 返回/修改style
*/
export function css (key: string, value: string | number): QElement
export function css (key: string): string
export function css (key: Array<string>): object
export function css (key: object): QElement
export function css (): CSSStyleDeclaration
export function css (key?, value?): any {
  if (value) {
    this.element.style[key] = value
    return this
  } else if (typeof key === 'string') {
    return getComputedStyle(this.element)[key]
  } else if (Array.isArray(key)) {
    return key.reduce((previousValue, k) => {
      previousValue[k] = getComputedStyle(this.element)[k]
      return previousValue
    }, {})
  } else if (typeof key === 'object') {
    Object.keys(key).forEach(k => {
      this.element.style[k] = key[k]
    })
    return this
  } else {
    return this.element.style
  }
}
/** 
 * 返回/修改className
*/
export function addClass (cs?: string | string[]): string | QElement {
  //为undefined则返回数组
  if(typeof cs === 'undefined'){
    return this.element.className
  //为string则返回this
  }else if(typeof cs === 'string' || Array.isArray(cs)){
    fnClass(this.element, cs, function (ac, c) {
      ac.push(c);
    }, function (ac) {
      ac.push(cs);
    });
    return this
  }
}
// 删除className
export function removeClass (cs?: string | string[]): QElement {
  if(typeof cs === 'undefined'){
    this.element.className = ''
  //为string则返回this
  }else if(typeof cs === 'string' || Array.isArray(cs)){
    fnClass(this.element, cs, function (ac, c) {
      const filterAC = ac.filter(_c =>_c !== c);
      ac.length = 0;
      ac.push(...filterAC);
    }, function (ac) {
      const filterAC = ac.filter((sA)=>sA != cs);
      ac.length = 0;
      ac.push(...filterAC);
    });
  }
  return this
}
/** 
 * @private
*/
function fnClass (element: Element, cs: string | string[], cdArray: Function, cdString: Function){
  let cn = element.className
  let ac: Array<string> = cn.length ? cn.split(' ') : []
  if(Array.isArray(cs)){
    cs.forEach(c => {
      cdArray(ac, c);
    })
  }else{
    cdString(ac);
  }
  element.className = ac.join(' ')
  return this
}