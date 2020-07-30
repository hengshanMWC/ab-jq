# 项目介绍
闲来无事写一个Emmet版的JQ巩固下dom知识

![演示gif](https://user-gold-cdn.xitu.io/2020/7/30/1739d7d53c47854c?w=600&h=338&f=gif&s=112119)
- 基于document.querySelectorAll封装的JQ
- 类Emmet语法创建dom
- ts

支持以下操作符
- #：id
- .: class
- +：兄弟
- **>**：子
- []：属性用,划分属性，属性=值，用;划分属性的值
- {}：文本

```
npm i -S qelements
```
[文档](https://hengshanmwc.github.io/ab-jq/docs/index/index.html)

[dome](https://hengshanmwc.github.io/ab-jq/test/index/index.html)
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