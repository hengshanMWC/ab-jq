let $ = (function(){
	function init(selector){
		let $ = document.querySelectorAll.bind(document);
		class AbJq {
			constructor(selector){
				this.selector = selector;
				this.NodeList = $(selector);
				this.from = Array.from(this.NodeList);
				this.length = this.from.length;
			}
			/*
			*绑定事件
			*参数{事件，函数}(object)
			* 事件字母为大写为捕获阶段触发，小写为冒泡阶段触发
			*/
			behavior(evfn){
				let b;
				this.from.forEach(function(val){
					for(let key in evfn){
						//是否为大写
						b = /[A-Z]/.test(key[0]);
						val.addEventListener(key.toLocaleLowerCase(),evfn[key],b);
					}
				})
				return this;
			}
			// 总仓
			// sDom是元素
			GeneralWarehouse(sDom,fn){
				//返回一个由小到大的dom元素数组
				var collect = this.EnterGoods(sDom);
				//将返回数组appendChild到各自的父级上
                collect = this.Shipments(collect);
                console.log(this.from,collect);
                this.from.forEach(function(val){
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
			EnterGoods(sDom){
				//元素数组,家属数组，包装后的数组
				let els,family,collect = [];
				[els,family]= this.turnHTML(sDom); 
				els.forEach((val,i)=>{
					var familyi = undefined;
					val = this.Scalpel(val);
					if(i)familyi = family[i-1];
					this.Packing(familyi,this.machining(val),collect);
				})      
				return collect.reverse(); //为了更加方便遍历
			}
			//原材料切割
			//从字符串中提取出元素字符串element(Array)和关系relationship(Array)（+，>）
			turnHTML(sDom){
				let element = sDom.match(/[^>+]+/g);//截取元素
				let relationship = sDom.match(/[>+]+/g);//截取家属关系
				return [element,relationship];
			}
			//小刀切割，元素切割出来的数组
			//元素字符串二次切割，返回的数组第一个元素是dom，后面是id，类，属性，文本等
			Scalpel(sDom){
				return sDom.match(/[#\.]?[^\s\.#\[\{]+=?[\w\/?]*[\]\}]?|[\[\{]?[^\]\}]+=?[\w\/?]*[\]\}]?/gi);
			}
			/*
			*加工，字符串转为dom，并为其添加属性或文本
			*参数：数组
			*返回的是一个完整的dom
			*/
			machining(aA){
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
						var attrs = val.slice(1,-1).split('=');
						var attri = attrs.shift();
						var sS = '';
						attrs.forEach(function(val){
							sS+=val;
						})
						dom.setAttribute(attri,sS);
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
			Packing(val,elsi,collect){
				let brother;
				//如果关系是+(兄弟)
				if(val == '+'){
					var pop = collect.pop();
					if(pop instanceof Array){
						brother = pop;
					}else{
						brother = [pop];
					}
					brother.push(elsi);
					collect.push(brother);
				}else{
					collect.push(elsi);
				}
            }
            //出货
            //
			Shipments(collect){
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
			//在被选元素的结尾插入内容
			append(sDom){
				//val为this.from的元素，dom是即将要被插入的dom碎片
				this.GeneralWarehouse(sDom,function(val,dom){
					val.appendChild(dom);
				});
				return this;
			}
			//在被选元素的开头插入内容
			prepend(sDom){
				this.GeneralWarehouse(sDom,function(val,dom){
					var fdom = val.firstElementChild;
					console.log(fdom);
					if(fdom){
						val.insertBefore(dom,fdom);
					}else{
						val.appendChild(dom);
					}
				});
				return this;
			}
			//在被选元素之后插入内容
			after(sDom){
				this.GeneralWarehouse(sDom,function(val,dom){
					var ndom = val.nextElementSibling;
					if(ndom){
						val.parentElement.insertBefore(dom,ndom);
					}else{
						val.parentElement.appendChild(dom);
					}
				});
				return this;
			}
			//在被选元素之前插入内容
			before(sDom){
				this.GeneralWarehouse(sDom,function(val,dom){
					var pdom = val.previousElementSibling;
					if(pdom){
						val.parentElement.insertBefore(dom,pdom);
					}else{
						val.parentElement.appendChild(dom);
					}
				});
				return this;
			}
			//innerHTML模式
			html(sDom){
				this.form.forEach(function(val){
					val.innerHTML = sDom;
				})
			}
			//innerText模式
			text(text){
				this.form.forEach(function(val){
					val.innerText = sDom;
				})
			}
			/*
			*改变背景颜色
			*cols：颜色，up上限,lower下限，ch渐变度
			*/
			setBackground({cols=[0,0,0],up=255,lower=0,ch=15}={}){
				//sub是执行下标
				let sub=0;
				this.from.forEach(function(val){
					setBaColor();
					val.style.backgroundColor = `rgb(${cols[0]},${cols[1]},${cols[2]})`;
				})
				function setBaColor(){
					cols[sub]+= ch;
					if(ch>0){
						//当前单色大于上限则将单色-去上限加上下限
						if(cols[sub] > up){
							cols[sub] = cols[sub] - up + lower;
							sub = sub == 2 ? 0 : ++sub;
						}
					}else{
						//当前单色小于下限则将上限+单色
						if(cols[sub] < lower){
							cols[sub] = up + cols[sub];
							sub = sub == 2 ? 0 : ++sub;
						}
					}
				}
				return this;
			}
		}
		return new AbJq(selector);
	}
	return init;
})();
// $('body').append('a[href=http://mwc.ac.cn/]{没有东西的网址}+h1{大佬}>b{好}[style=color:#ee6611]+span{乱敲}[style=font-size:16px;display:block;text-align:center]>b{span下的b}')

