function Drop(e){
	e.preventDefault();
  var data=e.dataTransfer.getData("Text");
  const element = document.getElementById(data)
  if (element === e.target) return
	e.target.appendChild(element);
}
function Dragover(e){
	e.preventDefault();
}
function Dragstart(e){
	e.dataTransfer.setData("Text",e.target.id);
}
$('.a1').on({
		"Drop":Drop,
		"Dragover":Dragover
});
$('#tu').on({"dragstart":Dragstart});
// $('body').append('a[href=http://mwc.ac.cn/]{没有东西的网址}+h1{大佬}>b{好}[style=color:#ee6611]+span{乱敲}[style=font-size:16px;display:block;text-align:center]>b{span下的b}')
// $('body').append('a[href=http://mwc.ac.cn/]{没有东西的网址}+h1{大佬}>b{好}[style=color:#ee6611]+span{乱敲}[style=font-size:16px;display:block;text-align:center]>b{span下的b}')
// $('body').append('a[href=http://mwc.ac.cn/]{没有东西的网址}+h1{大佬}>b{好}[style=color:#ee6611]+span{乱敲}[style=font-size:16px;display:block;text-align:center]>b{span下的b}')
// $('h1').addClass(['b1','asd','a12','a1'])
// $('h1').addClass('b1')