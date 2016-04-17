$(function(){
    JPlaceHolder.init();//ie兼容placeholder
    //记住我
    $(".remember").on("click", function() {
        var $this = $(this)
            , $input = $this.find(":checkbox")
            , $icon = $this.find(".check-icon");
        return $input.prop("checked") ? ($icon.removeClass("check-on"),
            $input.prop("checked", !1)) : ($icon.addClass("check-on"),
            $input.prop("checked", !0)),
            !1
    })
    //切换登录方式
    $(".info-way").delegate("span","click",function(){
        var $this = $(this);
        $this.addClass("selected").siblings().removeClass("selected");
        $(".method").eq($this.index()).show().siblings().hide();
    })
    //定时器
    var isTimer = false;
    var timer = function(o, wait) {
        if (wait == 0 || isTimer == false) {
            o.removeClass("disable");
            o.text("获取验证码");
            isTimer = true;
        } else {
            o.text("剩余 "+wait + " s");
            wait--;
            setTimeout(function(){
                timer(o, wait);
            },1e3);
        }
    };
    var check = function(thisObj) {
        var inputData = thisObj.val();
        var dataType = thisObj.attr('id')
        var reg = "";
       if (dataType === "tel-login") {
            reg = /^(13[0-9]|15[012356789]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/;
        } else if (dataType === "code-login") {
            reg = /^\d{4}$/;
        } else {
            reg = /^.*$/
        }
        if (inputData) {
            inputData = $.trim(inputData);
        }
        if(reg.test(inputData) && inputData){
            thisObj.parents('.input-wrapper').find(".tips").hide();
            thisObj.removeClass("error");
        }else{
            thisObj.parents('.input-wrapper').find(".tips").show();
            thisObj.addClass("error");
        }
        return reg.test(inputData);
    };
    $("#tel-login,#code-login,#username-login,#password-login").blur(function(){
        check($(this));
    })
    //input框的x号
    $(".info input").on("keyup",function(){
        var $this = $(this);
        var v = $this.val();
        if($.trim(v).length === 0){
            $this.parents('.input-wrapper').find(".delete").hide();
        }else{
            $this.parents('.input-wrapper').find(".delete").show();
        }
    })
    $(".delete").on("click",function(){
        $(this).parents('.input-wrapper').find("input").val("").focus();
    })
    //发送验证码
    $("#sendVC-login").bind("click", function() {
        var $this = $(this);
        var tel = $("#tel").val();
        if (!$this.hasClass("disable") && check($("#tel-login"))) {
            sendVC(tel);
            isTimer = true;
            $this.addClass("disable");
            timer($this, 60);
        }else if(check($("#tel-login"))){

        }
    });
    //调用后台发送验证码接口
    function sendVC(){
        $.ajax()
    }
    //登录
    $("#loginBtn").on("click",function(){
        var formData={};
        var way = $(".info-way .selected").attr("data-attr");
        var tel = $.trim($("#tel-login").val());
        var code = $.trim($("#code-login").val());
        var username = $.trim($("#username-login").val());
        var password = $.trim($("#password-login").val());
        var isremember = $(".check-icon").hasClass("check-on")?1:0;
        if(way==1 && check($("#tel-login")) && check($("#code-login"))){//手机验证登录
            formData.way = way;
            formData.tel = tel;
            formData.code = code;
            formData.isremember = isremember;
            //后台逻辑
        }else if(way==2 && username && password){//58账号登录
            formData.way = way;
            formData.username = username;
            formData.password = password;
            formData.isremember = isremember;
            //后台逻辑
        }
        console.info(formData);
    })
})