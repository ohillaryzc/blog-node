/* 处理公共事件js */
/*
* 回到顶部功能
* */
var toTop = $('#toTop')
var header = $('.header')
var scrollTrigger = 300

// 添加滚动事件
// 向上滚动出现顶部，向下滚动隐藏顶部
// var nowScroll = 0
var nowTop = 0, perTop = 0
var count = 0 // 记住当前第几次执行scroll事件
$(window).scroll(function () {
    // 大于目标，显示回到顶部
    if ($(this).scrollTop() > scrollTrigger) {
        toTop.removeClass('hidden')
    } else {
        toTop.addClass('hidden')
    }
    nowTop = $(this).scrollTop()
    if (nowTop < 80) {
        header.stop().animate({top: '0px'}, 300)
    }

    if (nowTop - perTop - 15 > 0) {
        header.stop().animate({top: '-70px'}, 300)
    } else if (nowTop - perTop + 15 < 0) {
        header.stop().animate({top: '0px'}, 300)
    }

    setTimeout(function () {
        perTop = nowTop
    })
})

// 点击回到顶部
toTop.click(function () {
    $('body, html').animate({scrollTop: 0}, 300)
})

/*
* 点击search事件
* */
var search_btn = $('#search-btn')
var search = $('#search')
var close_search = $('#close-search')

// 点击
search_btn.click(function () {
    search.animate({width: '500px'}, 300)
})

close_search.click(function () {
    search.animate({width: '0px'}, 300)
})
