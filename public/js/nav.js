/* 生成文章详情侧边导航栏 */
let inner = $('.inner')

let hs = inner.find('h1,h2,h3,h4,h5,h6')

let tops = []
let nav = $('#nav-right')
nav.html('<h3><i class="iconfont icon-list3"></i>目录</h3><ul>')
hs.each((index, item) => {
    let id = $(item).find('a')[0].id
    let className = $(item)[0].localName
    nav.html(nav.html() + '<li class="'+ className +'" data-id='+ id +'>'+ $(item).text() +'</li>')
    tops.push($(item).position().top)
})

nav.find('li').click(function () {
    let id = '#' + $(this).data('id')
    let top = $(id).position().top - 80
    $('body, html').animate({scrollTop: top}, 300)
})

// 页面滚动，目录变化
$(window).scroll(function () {
    setColor($(this).scrollTop())
})

function setColor(top) {
    let big = tops.filter((value, index) => {
        return value <= top + 80
    })
    let index = big.length ? big.length - 1 : 0
    nav.find('li').eq(index).addClass('active').siblings().removeClass('active')
}
