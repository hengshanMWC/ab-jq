# 项目介绍
Emmet方式生成dom

围绕const $ = document.querySelectorAll.bind(document);类JQ库
# 特性
残缺版Emmet，支持一下操作符
```html
<!-- #:id - div#id -->

<div id="id"></div>
<!-- .:class - div.class -->
<div class="class"></div>
```
- #：id
- .: class
- []: 属性,input[style=color: red;font-size: 30px,value=123123]
- {}：文本,p{123}
```
// jq
jQuery('div').append('<div><p style="color: red">对比</p></div>')
// ab-jq
$('div').append('div>p{对比}[style=color: red]')
```
# API
### append
结尾插入



