# 项目介绍
Emmet方式生成dom

包装const $ = document.querySelectorAll.bind(document);类JQ库
# 特性
残缺版Emmet，支持以下操作符
```html
<!-- #:id - div#id -->
<div id="id"></div>
<!-- .:class - div.class -->
<div class="class"></div>
<!-- []:属性attr - input.class1.class2#id[style=color:red;font-size:30px,value=value] -->
<input class="class1 class2" id="id" style="color:red;font-size:30px" value="value">
<!-- {}:文本 - div{text} -->
<div>text</div>
```
```
// jq
jQuery('div').append('<div><p style="color: red">对比</p></div>')
// ab-jq
$('div').append('div>p{对比}[style=color: red]')
```