/*
 * @Author: mwc 
 * @Date: 2020-07-26 20:18:02 
 * @Last Modified by: mwc
 * @Last Modified time: 2020-07-26 20:49:12
 */
'use strict';
const $ = (function(){
	function init(selector){
		const $ = document.querySelectorAll.bind(document);
		class AbJq {
			constructor(selector){
				this.selector = selector;
				this.NodeList = $(selector);
				this.from = Array.from(this.NodeList);
				this.length = this.from.length;
				this.NodeList.forEach((val,i)=>{
					this[i] = val;
				})
			}
			//在被选元素的结尾插入内容
			append(elements){
				//val为this.from的元素，dom是即将要被插入的dom碎片
				this._generalWarehouse(elements,function(val,element){
					val.appendChild(element);
				});
				return this;
			}
			//在被选元素的开头插入内容
			prepend(elements){
				this._generalWarehouse(elements,function(val,element){
					var fElement = val.firstElementChild;
					if(fElement){
						val.insertBefore(element,fElement);
					}else{
						val.appendChild(element);
					}
				});
				return this;
			}
			//在被选元素之后插入内容
			after(elements){
				this._generalWarehouse(elements,function(val,element){
					var nNlement = val.nextElementSibling;
					if(nNlement){
						val.parentElement.insertBefore(element,nNlement);
					}else{
						val.parentElement.appendChild(element);
					}
				});
				return this;
			}
			//在被选元素之前插入内容
			before(elements){
				this._generalWarehouse(elements,function(val,element){
					var pElement = val.previousElementSibling;
					if(pElement){
						val.parentElement.insertBefore(element,pElement);
					}else{
						val.parentElement.appendChild(element);
					}
				});
				return this;
			}
			//innerHTML模式
			html(sText){
				if(sText){
					this.NodeList.forEach((val)=>{
						val.innerHTML = sText;
					})
					return this;
				}else{
					var aS = [];
					this.NodeList.forEach((val)=>{
						aS.push(val.innerHTML);
					})
					return aS;
				}
				
			}
			//innerText模式
			text(sText){
				if(sText){
					this.NodeList.forEach((val)=>{
						val.innerText = sText;
					})
					return this;
				}else{
					var aS = [];
					this.NodeList.forEach((val)=>{
						aS.push(val.innerText);
					})
					return aS;
				}
			}
			//设置css
			//gs(字符串，数组，对象)
			css(gs,set){
				if(set){
					this.NodeList.forEach((val)=>{
						val.style[gs] = set;
					})
					return this;
				}
				//字符串则返回数组
				else if(typeof gs === 'string'){
					var aS = [];
					this.NodeList.forEach((val)=>{
						aS.push(getComputedStyle(val)[gs]);
					})
					return aS;
				//数组则返回json=》key：array
				}else if(gs instanceof Array){
					var oS = {};
					gs.forEach((key)=>{
						oS[key] = [];
						this.NodeList.forEach((val)=>{
							oS[key].push(getComputedStyle(val)[key]);
						})
					})
					return oS;
				//json则改变样式
				}else if(gs instanceof Object){
					for(let key in gs){
						this.NodeList.forEach(function(val){
							val.style[key] = gs[key];
						})
					}
					return this;
				}
			}
			hasClass(p_class){
				return this[0].className.indeOf(p_class) === -1;
			}
			fnClass(p_class,fnA,fnB){
				let ac;
				this.NodeList.forEach((val)=>{
					var cn = val.className;
					if(cn.length){
						ac = cn.split(' ');
					}else{
						ac = [];
					}
					if(p_class instanceof Array){
						p_class.forEach((sA)=>{
							fnA(ac,sA);
						})
					}else{
						fnB(ac);
					}
					val.className = ac.join(' ');
				})
				return this;
			}
			addClass(p_class){
				var r_class;
				//为undefined则返回数组
				if(typeof p_class === 'undefined'){
					r_class = [];
					this.NodeList.forEach((val)=>{
						r_class.push(val.className);
					})
				//为string则返回this
				}else if(typeof p_class === 'string' || p_class instanceof Array){
					r_class = this.fnClass(p_class,function(ac,sA){
						ac.push(sA);
					},function(ac){
						ac.push(p_class);
					});
				}
				return r_class;
			}
			removeClass(p_class){
				if(typeof p_class === 'undefined'){
					this.NodeList.forEach((val)=>{
						val.className = '';
					})
				}else if(typeof p_class === 'string' || p_class instanceof Array){
					this.fnClass(p_class,function(ac,sA){
						let aA = ac.filter((_sA)=>_sA!=sA);
						ac.length = 0;
						ac.push(...aA);
					},function(ac){
						let aA = ac.filter((sA)=>sA!=p_class);
						ac.length = 0;
						ac.push(...aA);
					});
					// let ac;
					// this.NodeList.forEach((val)=>{
					// 	var cn = val.className;
					// 	if(cn.length){
					// 		ac = cn.split(' ');
					// 	}else{
					// 		ac = [];
					// 	}
					// 	if(p_class instanceof Array){
					// 		p_class.forEach((sA)=>{
					// 			ac = ac.filter((_sA)=>_sA!=sA);
					// 		})
					// 	}else{
					// 		ac = ac.filter((sA)=>sA!=p_class);
					// 	}
					// 	val.className = ac.join(' ');
					// })
				}
				return this;
			}
			/*
			*绑定事件
			*参数{事件，函数}(object)
			* 事件字母为大写为捕获阶段触发，小写为冒泡阶段触发
			*/
			behavior(evfn){
				let b;
				this.NodeList.forEach(function(val){
					for(let key in evfn){
						//是否为大写
						b = /[A-Z]/.test(key[0]);
						val.addEventListener(key.toLocaleLowerCase(),evfn[key],b);
					}
				})
				return this;
			}
			/*
			*改变背景颜色
			*cols：颜色，up上限,lower下限，ch渐变度
			*/
			setBackground({cols=[0,0,0],up=255,lower=0,ch=15}={}){
				//sub是执行下标
				let sub=0;
				this.NodeList.forEach(function(val){
					setBaColor();
					val.style.backgroundColor = `rgb(${cols[0]},${cols[1]},${cols[2]})`;
				})
				function setBaColor(){
					cols[sub]+= ch;
					if(ch>0){
						//当前单色大于上限则将单色-去上限加上下限
						if(cols[sub] > up){
							cols[sub] = cols[sub] - up + lower;
							sub = sub === 2 ? 0 : ++sub;
						}
					}else{
						//当前单色小于下限则将上限+单色
						if(cols[sub] < lower){
							cols[sub] = up + cols[sub];
							sub = sub === 2 ? 0 : ++sub;
						}
					}
				}
				return this;
			}
			// 总仓
			// elements是元素
			_generalWarehouse(elements,fn){
				//返回一个由小到大的dom元素数组
				var collect = this._enterGoods(elements);
				//将返回数组appendChild到各自的父级上
				collect = this._shipments(collect);
				this.NodeList.forEach(function(val){
					if(collect instanceof Array){
						collect.forEach(function(dom){
							//this.from的元素，和即将插入的dom
							//不克隆的话，那么只有最后一个元素才会添加dom
							fn(val,dom.cloneNode(true));
						})
					}else{
						fn(val,collect.cloneNode(true))
					}
				})
			}
			//入库
			_enterGoods(elements){
				//元素数组,家属数组，包装后的数组
				let els,family,collect = [];
				[els,family]= this._turnHTML(elements); 
				els.forEach((val,i)=>{
					var familyi = undefined;
					val = this._scalpel(val);
					if(i)familyi = family[i-1];
					this._packing(familyi,this._machining(val),collect);
				})      
				return collect.reverse(); //为了更加方便遍历
			}
			//原材料切割
			//从字符串中提取出元素字符串element(Array)和关系relationship(Array)（+，>）
			_turnHTML(elements){
				let element = elements.match(/[^>+]+/g);//截取元素
				let relationship = elements.match(/[>+]+/g);//截取家属关系
				return [element,relationship];
			}
			//小刀切割，元素切割出来的数组
			//元素字符串二次切割，返回的数组第一个元素是dom，后面是id，类，属性，文本等
			_scalpel(elements){
				return elements.match(/[#\.]?[^\s\.#\[\{]+=?[\w\/?]*[\]\}]?|[\[\{]?[^\]\}]+=?[\w\/?]*[\]\}]?/gi);
			}
			/*
			*加工，字符串转为dom，并为其添加属性或文本
			*参数：数组
			*返回的是一个完整的dom
			*/
			_machining(aA){
				let dom = document.createElement(aA.shift());
				aA.forEach(function(val){
					switch(val.slice(0,1))
					{
						case '#'://id
						dom.id = val.slice(1);
						return;
						case '.'://类
						var cn = dom.className;
						if(cn)cn+=' '
						dom.className = cn+val.slice(1);
						return;
						case '['://属性
						const attrValues = val.slice(1,-1).split(',');
						attrValues.forEach(attrValue => {
							const arr = attrValue.split('=')
							dom.setAttribute(arr[0], arr[1]);
						})
						return;
						case '{'://文本
						var text = val.slice(1,-1);
						dom.appendChild(document.createTextNode(text));
						return;
					}
				})
				return dom;
			}
			//包装
			//参数：关系val，dom元素elsi，dom数组collect
			//兄弟则放在同一个数组里。
			//collect里的元素+1下标是该元素的子元素，如果该元素是数组，则数组最后一个才是父元素
			_packing(val,elsi,collect){
				let brother;
				//如果关系是+(兄弟)
				if (val === '+'){
					var pop = collect.pop();
					if(pop instanceof Array){
						brother = pop;
					} else {
						brother = [pop];
					}
					brother.push(elsi);
					collect.push(brother);
				} else {
					collect.push(elsi);
				}
			}
			//出货
			_shipments(collect){
				for(let i = 0;i<collect.length-1;i++){
					var colli;
					if(collect[i+1] instanceof Array){
						colli = collect[i+1].slice(-1)[0];
					}else{
						colli = collect[i+1];
					}
					if(collect[i] instanceof Array){
						collect[i].forEach(function(ai){
							colli.append(ai)
						})
					}else{
						colli.appendChild(collect[i]);
					}
				}
				return collect.slice(-1)[0];
			}
		}
		return new AbJq(selector);
	}
	return init;
})();
// $('body').append('a[href=http://mwc.ac.cn/]{没有东西的网址}+h1{大佬}>b{好}[style=color:#ee6611]+span{乱敲}[style=font-size:16px;display:block;text-align:center]>b{span下的b}')

