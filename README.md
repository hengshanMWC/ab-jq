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
<!-- []:属性attr - input[style=color: red;font-size: 30px,value=value,id=id] -->
<input style="color: red;font-size: 30px" value="value" id="id" />
<!-- {}:文本 - div{text} -->
<div>text</div>
```
```
// jq
jQuery('div').append('<div><p style="color: red">对比</p></div>')
// ab-jq
$('div').append('div>p{对比}[style=color: red]')
```
# API
### append
$()结尾插入children elment
### prepend
$()头部插入children elment
### after
$()之后插入elemnt
### before
$()之前插入elemnt
### html
修改$()的innerHTML，不传参数则返回innerHTML
### text
修改$()的innerText，不传参数则返回innerText
### css
修改/返回style的值
- 1参数string，返回$()style的1参数的值


