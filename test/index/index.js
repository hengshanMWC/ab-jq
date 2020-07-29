const pathname = '/ab-jq/test/'
const router = [
  {
    title: 'api演示',
    href: 'api'
  },
  {
    title: '输入生成',
    href: 'input'
  },
  {
    title: '拖拽',
    href: 'drop'
  }
]
const routers = routerMap(router, getUrl(pathname))
$('.container').append(createElement(routers))
// transition在新创建的dom上，无法立即生效，因为css会被合并计算，所以要看到动画效果，必须将切换css代码放入到setTimeout函数内，异步运行才可以。
setTimeout(() => {
  $('.link').css('transform', 'scale(1)')
});
function routerMap (router) {
  const url = getUrl(pathname)
  return router.map(item => {
    return {
      title: item.title,
      href: url + item.href + '/index.html'
    }
  })
}
function getUrl (pathname) {
  const href = location.href
  return href.slice(0, href.search(pathname) + pathname.length)
}
function createElement (routers) {
  return routers.reduce(function (previosValue, currentValue) {
    return `${previosValue}a.link{${currentValue.title}}[href=${currentValue.href},style=transform:scale(0.1)]+`
  }, '')
}

