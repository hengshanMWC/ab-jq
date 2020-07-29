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
<!-- []:属性attr - input[style=color:red;font-size:30px,value=value,id=id] -->
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
- 修改style。第一个参数是修改style的属性，第二个参数是style的属性的值
- 1参数是object{属性：value}，修改$()多种style
- 1参数string，返回$()style
- 1参数是数组，返回$()多种style
- 都不传测返回$()的style
### addClass
$()添加class（可传数组）。没有参数则返回$()的class
### removeClass
$()去掉class（可传数组）。没有参数则去掉$()的class
### on
$()添加事件，
- type, cd, useCapture
- {type: cd}，useCapture
