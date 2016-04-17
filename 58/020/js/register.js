$(function(){
    JPlaceHolder.init();//ie兼容placeholder
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
        if (dataType === "password-reg") {
            reg = /^[\w.]{6,20}$/;
        } else if (dataType === "tel-reg") {
            reg = /^(13[0-9]|15[012356789]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/;
        } else if (dataType === "code-reg") {
            reg = /^\d{4}$/;
        } else {
            reg = /^.*$/
        }
        if (inputData) {
            inputData = $.trim(inputData);
        }
        if(reg.test(inputData)){
            thisObj.parents('.input-wrapper').find(".tips").hide();
            thisObj.removeClass("error");
        }else{
            thisObj.parents('.input-wrapper').find(".tips").show();
            thisObj.addClass("error");
        }
        return reg.test(inputData);
    };
    var regFlag = {
        tel:false,
        code:false,
        password:false
    }
    //电话号码正则验证
    $("#tel-reg").blur(function(){
        if(check($(this))){
            regFlag.tel = true;
        }else{
            regFlag.tel = false;
        }
    })
    //验证码正则验证
    $("#code-reg").blur(function(){
        if(check($(this))){
            regFlag.code = true;
        }else{
            regFlag.code = false;
        }
    })
    //密码正则验证
    $("#password-reg").blur(function(){
        if(check($(this))){
            regFlag.password = true;
        }else{
            regFlag.password = false;
        }
    })
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
    $("#sendVC-reg").bind("click", function() {
        var $this = $(this);
        var tel = $("#tel-reg").val();
        if (!$this.hasClass("disable") && check($("#tel-reg"))) {
            sendVC(tel);
            isTimer = true;
            $this.addClass("disable");
            timer($this, 60);
        }else if(!check($("#tel-reg"))){

        }
    });
    //调用后台发送验证码接口
    function sendVC(){
        $.ajax()
    }
    //点击注册
    $("#regBtn").bind("click",function(){
        if(regFlag.tel&&regFlag.code&&regFlag.password){
            var tel = $("#tel-reg").val();
            var code = $("#code-reg").val();
            var password = $("#password-reg").val();
        }
    })
})