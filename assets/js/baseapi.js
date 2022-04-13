//每一次在调接口的时候，都会先调用ajaxPrefilter()这个函数
$.ajaxPrefilter(function(option) {
    option.url = 'http://www.liulongbin.top:3007' + option.url
})