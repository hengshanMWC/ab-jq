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
			*{事件，函数}
			* 事件首字母为大写为捕获阶段触发，小写为冒泡阶段触发
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
			// sDom是元素，fn是
			GeneralWarehouse(sDom,fn){
				var collect = this.EnterGoods(sDom);
                var commodity = this.Shipments(collect);
                this.from.forEach(function(val){
                    if(commodity instanceof Array){
                        commodity.forEach(function(dom){
                        	fn(val,dom);
                            // val.appendChild(dom);
                        })
                    }else{
                    	fn(val,dom)
                        // val.appendChild(commodity);
                    }
                })
			}
			//入库
			EnterGoods(sDom){
				//元素数组,家属数组，包装后的数组
				let els,family,collect = [];
				if(sDom.indexOf("<")==-1){
					[els,family]= this.turnHTML(sDom); 
					els.forEach((val,i)=>{
						var familyi = undefined;
						val = this.Scalpel(val);
						if(i)familyi = family[i-1];
						this.Packing(familyi,this.machining(val),collect);
					})      
					return collect.reverse(); 
				}else{

				}
			}
			//原材料切割
			turnHTML(sDom){
				let element = sDom.match(/[^>+]+/g);//截取元素
				let relationship = sDom.match(/[>+]+/g);//截取家属关系
				return [element,relationship];
			}
			//小刀切割，元素切割出来的数组
			Scalpel(sDom){
				return sDom.match(/[#\.]?[^\s\.#\[\{]+=?[\w\/?]*[\]\}]?|[\[\{]?[^\]\}]+=?[\w\/?]*[\]\}]?/gi);
			}
			//出货
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
			//加工
			machining(aA){
				let dom = document.createElement(aA.shift());
				aA.forEach(function(val){
					switch(val.slice(0,1))
					{
						case '#':
						dom.id = val.slice(1);
						return;
						case '.':
						var cn = dom.className;
						if(cn)cn+=' '
						dom.className = cn+val.slice(1);
						return;
						case '[':
						var attrs = val.slice(1,-1).split('=');
						var attri = attrs.shift();
						var sS = '';
						attrs.forEach(function(val){
							sS+=val;
						})
						dom.setAttribute(attri,sS);
						return;
						case '{':
						var text = val.slice(1,-1);
						dom.appendChild(document.createTextNode(text));
						return;
					}
				})
				return dom;
			}
			//包装
			Packing(val,elsi,collect){
				let brother;
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
// $('body').append('a[href=http://mwc.ac.cn/]{没有东西的网址}+h1{大佬}>b{好}[style=color:#ee6611]+span{乱敲}[style=font-size:16px;display:block;text-align:center]>b{span下的b}')
			append(sDom){
				//总仓调控
				this.GeneralWarehouse(sDom,function(val,dom){
					val.appendChild(dom);
				});
				return this;
			},
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
