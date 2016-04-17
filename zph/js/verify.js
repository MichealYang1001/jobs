/**
 * Created by 58 on 2015/11/11.
 */
var nonchongfu_submit = true;
var isTimer = true;
var isSubmit = function() {
    var objArr = $(".info input");
    var obj = "";
    var verEnd = "";
    for (var i = 0, l = objArr.length; i < l; i++) {
        obj = $(objArr[i]);
        if (obj.val()) {
            verEnd = verify(obj.val(), obj.attr("id"));
            if (verEnd === true) {
                continue;
            } else {
                showWarnWin(verEnd, 1e3);
                return false;
            }
        } else {
            showWarnWin(obj.attr("placeholder"), 1e3);
            return false;
        }
    }
    return true;
};
var verify = function(inputData, dataType) {
    var reg = "";
    var varMes = "";
    if (dataType === "name") {
        reg = /^[\u4E00-\u9FA5]{2,5}$/;
        varMes = "姓名请输入2~5个汉字";
    } else if (dataType === "tel") {
        reg = /^(13[0-9]|15[012356789]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/;
        varMes = "请输入正确的手机号码"
    } else if (dataType === "verCode") {
        reg = /^\d{6}$/;
        varMes = "验证码不正确"
    } else {
        reg = /^.*$/
    }
    if (inputData) {
        inputData = inputData.trim()
    }
    return reg.test(inputData) ? reg.test(inputData) : varMes
};
var sendVC = function(tel) {
    $.ajax({
        type: "JSONP",
        dataType: "json",
        url: "http://wx.supin.58.com/push/ajax_pushauthcode/?mobile=" + tel + "&callback=?",
        success: function(data) {
            if (data.isSuccess) {} else {
                isTimer = false;
                showWarnWin(data.returnMessage, 1e3)
            }
        },
        error: function() {
            isTimer = false;
            console.log("验证码发送失败！")
        }
    })
};
var commit = function(name, mobile, authCode){
    nonchongfu_submit = false;
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "http://wx.supin.58.com/resume/ajax_resumesimple/",
        data: {
            name: name,
            mobile: mobile,
            code: authCode
        },
        cache: false,
        success: function(data) {
            nonchongfu_submit = true;
            if (data.isSuccess) {

            } else {
                showWarnWin(data.returnMessage, 1e3);
                return false;
            }
        },
        error: function() {
            nonchongfu_submit = true;
            console.log("提交失败");
        }
    })
};
var showWarnWin = function(mes, time) {
    var htmlStr = "<div class='warnWin'><i class='iconfont warn_icon'>&#xe611;</i><span class='warn_font'>" + mes + "</span></div>";
    var time = time ? time : 1e3;
    if (!$(".warnWin").length) {
        $("body").append(htmlStr);
        $(".warnWin").css({
            position: "fixed",
            top: "40%",
            left: "50%",
            width: "250px",
            height: "100px",
            margin: "-50px 0 0 -125px",
            "border-radius": "5px",
            background: "rgba(0,0,0,0.4)",
            color: "#fff",
            "text-align": "center"
        });
        $(".warn_icon").css({
            display: "block",
            width: "32px",
            height: "32px",
            "text-align": "center",
            margin: "10px auto 0",
            "font-size": "30px"
        });
        $(".warn_font").css({
            display: "block",
            "font-family": "黑体",
            "margin-top": "10px",
            "font-size": "15px"
        });
        setTimeout(function() {
                $(".warnWin").remove()
            }
            , time)
    }
};
var timer = function(o, wait) {
    if (wait == 0 || isTimer == false) {
        o.addClass("sending");
        o.text("获取验证码");
        isTimer = true;
    } else {
        o.text(wait + " s");
        wait--;
        setTimeout(function(){
            timer(o, wait);
        },1e3);
    }
};
$(function(){
    $('.main').css('min-height',$(window).height()-175+'px')
    //点击进入招聘会
    $('.btn').on('click',function(){
        var name = "";
        var tel = "";
        var verCode = "";
        console.info(nonchongfu_submit);
        if (isSubmit() && nonchongfu_submit == true) {
            var name = $("#name").val();
            var mobile = $("#tel").val();
            var authCode = $("#verCode").val();
            console.info(12);
            commit(name, mobile, authCode);
        }
    })
    //手机号格式正确则可以发送验证码
    $("#tel").on("keyup", function() {
        var node = $(this);
        var mobile = node.val();
        var flag = verify(mobile, node.attr("id"));
        var sendNode = $("#sendVC");
        if (flag === true) {
            sendNode.addClass('sending');
        } else {
            sendNode.removeClass('sending');
            isTimer = false;
        }
    })
    //发送验证码
    $("#sendVC").bind("click", function() {
        var thisObj = $(this);
        var tel = $("#tel").val();
        var verTel = "";
        if (thisObj.hasClass('sending')) {
            if (tel) {
                verTel = verify(tel, "tel");
                if (verTel === true) {
                    isTimer = true;
                    sendVC(tel);
                    thisObj.removeClass("sending");
                    timer(thisObj, 60);
                } else {
                    showWarnWin(verTel, 1e3);
                    return false;
                }
            } else {
                showWarnWin("请输入手机号码", 1e3);
                return false;
            }
        }
    });
})