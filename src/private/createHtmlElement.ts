/** 
 * 返回一个由小到大的dom元素数组
 * 将返回数组appendChild到各自的父级上
*/
export default function (elements: string): ElementElements {
  return shipments(enterGoods(elements))
}
// 入库
export function enterGoods (elements: string): ElementContainer {
  // 元素数组,家属数组，包装后的数组
  let elementStrings: RegExpMatchArray, 
    relations: RegExpMatchArray, 
    result = [];
  [elementStrings, relations]= turnHTML(elements); 
  elementStrings.forEach((elementString, i)=>{
    let relation
    if (i) relation = relations[i-1];
    packing(relation, createElement(scalpel(elementString)), result);
  })      
  return result.reverse(); // 为了更加方便遍历
}
// 原材料切割
// 从字符串中提取出元素字符串element(Array)和关系relations(Array)（+，>）
export function turnHTML(elements: string): [RegExpMatchArray, RegExpMatchArray]{
  const elementStrings = elements.match(/[^>+]+/g);// 截取一段元素
  const relations = elements.match(/[>+]+/g);// 截取元素关系
  return [elementStrings, relations]
}
// 小刀切割，元素切割出来的数组
// 元素字符串二次切割，返回的数组第一个元素是dom，后面是id，类，属性，文本等
export function scalpel(elements: string): RegExpMatchArray {
  return elements.match(/[#\.]?[^\s\.#\[\{]+=?[\w\/?]*[\]\}]?|[\[\{]?[^\]\}]+=?[\w\/?]*[\]\}]?/gi);
}
/*
 * 加工，字符串转为dom，并为其添加属性或文本
 * 参数：数组
 * 返回的是一个完整的dom
*/
export function createElement (vnode: Array<string>): HTMLElement {
  const result = document.createElement(vnode.shift());
  vnode.forEach(function (val) {
    switch(val.slice(0,1))
    {
      case '#':// id
      result.id = val.slice(1);
      return;
      case '.':// 类
      let className = result.className;
      if (className) className +=' '
      result.className = className + val.slice(1);
      return;
      case '[':// 属性
      const attrValues = val.slice(1,-1).split(',');
      attrValues.forEach(attrValue => {
        const arr = attrValue.split('=')
        result.setAttribute(arr[0], arr[1]);
      })
      return;
      case '{':// 文本
      var text = val.slice(1,-1);
      result.appendChild(document.createTextNode(text));
      return;
    }
  })
  return result;
}
// 包装
// 参数：关系relation，dom元素elsi，dom数组collect
// 兄弟则放在同一个数组里。
// collect里的元素+1下标是该元素的子元素，如果该元素是数组，则数组最后一个才是父元素
export function packing (relation, htmlElement: HTMLElement, elementContainer: ElementContainer) {
  let brother;
  // 如果关系是+(兄弟)
  if (relation === '+'){
    var pop = elementContainer.pop();
    if(pop instanceof Array){
      brother = pop;
    } else {
      brother = [pop];
    }
    brother.push(htmlElement);
    elementContainer.push(brother);
  } else {
    elementContainer.push(htmlElement);
  }
}
//出货
export function shipments (elementContainer: ElementContainer): ElementElements {
  for(let i = 0; i < elementContainer.length-1; i++){
    let item;
    if (elementContainer[i+1] instanceof Array) {
      item = (<HTMLElement[]>elementContainer[i+1]).slice(-1)[0];
    } else {
      item = elementContainer[i+1];
    } 
    if (elementContainer[i] instanceof Array) {
      (<HTMLElement[]>elementContainer[i]).forEach(function (htmlElement) {
        item.append(htmlElement)
      })
    } else {
      item.appendChild(elementContainer[i]);
    }
  }
  return elementContainer.slice(-1)[0];
}