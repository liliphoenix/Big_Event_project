$(function() {


    //注册和登录表单的来回切换
    $('#link-reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link-login').on('click', function() {
        $('.reg-box').hide()
        $('.login-box').show()
    })


    // 校验密码和确认密码
    // 从layui中获取对象
    var form = layui.form
    form.verify({
        //自定义pwd校验规则
        'pwd': [/^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ], //\s表示非空格的字符
        'repwd': function(value) {
            if (value !== $("#repwd").val()) {
                return '两次输入的密码不一致'
            }
        }
    })


    //注册提交表单
    //注册layer(弹出提示事件)
    var layer = layui.layer
    $("#form-reg").on('submit', function(e) {
        //阻止默认提交表单的行为
        e.preventDefault()
            //调用注册表单接口
        $.post('http://www.liulongbin.top:3007/api/reguser', { username: $("#form-reg [name=username]").val(), password: $("#form-reg [name=password]").val() }, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg('注册成功');
            //调用点击事件
            $("#link-login").click()
        })
    })


    //登录提交表单
    $('#form-login').on('submit', function(e) {
        //阻止表单的默认提交行为
        e.preventDefault()

        $.ajax({
            url: 'http://www.liulongbin.top:3007/api/login',
            method: 'POST',
            data: $(this).serialize(), //快速获取表单的方式
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('登陆成功')
                    //将登录成功得到的loken字符串保存到loaclstorrage
                localStorage.setItem('token', res.token)
                    //登陆成功跳转到首页界面
                location.href = '/index.html'
            }
        })
    })
})