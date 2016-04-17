/**
 * Created by 58 on 2015/11/7.
 */
//
$(function(){
    //弹窗
    var Popup=function(){
            var createMask = function(){
                    var mask;
                    return function(){
                        if(!mask){
                            mask = $('<div class="mask"></div>');
                            mask.css({
                                position: 'absolute',
                                height: '100%',
                                width: '100%',
                                left: '0px',
                                top: '0px',
                                zIndex: '99',
                                backgroundColor: '#000',
                                opacity: '0.2',
                                filter: 'alpha(opacity=20)',
                                zoom: '1'
                            });
                            $('body').append(mask);
                        }
                        mask.show();
                        return mask;
                    };
            }();
            return {
                show: function(type){
                    switch(type){
                        case 1:
                            createMask();
                            $('.popup_one').show();
                            break;
                        case 2:
                            createMask();
                            $('.popup_two').find('.title').removeClass('success').addClass('registered');
                            $('.popup_two').show();
                            break;
                        case 3:
                            createMask();
                            $('.popup_two').find('.title').removeClass('registered').addClass('success');
                            $('.popup_two').show();
                            break;
                        default:
                        break;
                    }
                }
            };
        }();
    //校验
    var checked = function(name, tele,job) {
        var reg1 = /^[\u4E00-\u9FA5]{2,4}$/,
            reg2 = /^(13[0-9]|15[012356789]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/,
            tag = true;
        if (!reg1.test($.trim(name))) {
            $(".name-error").show();
            tag = false;
        }else{
            $(".name-error").hide();
        }
        if (!reg2.test($.trim(tele))) {
            $(".tele-error").show();
            tag = false;
        }else{
            $(".tele-error").hide();
        }
        if (!job) {
            $(".intention-error").show();
            tag = false;
        }else{
            $(".intention-error").hide();
        }
        return tag;
    };
    //获取验证码
    var getCode = function(mobile) {
        $.ajax({
            type: "POST",
            dataType: "json",
            url:  "/zhaopinhui/ajax/sendmobileVC",
            data: {
                mobile: mobile,
            },
            cache:false,
            success: function(data) {
                console.info(data);
                if(data.isSuccess){
                    //window.location.href = ____global.url;
                }else{
                    //showWarnWin(data.returnMessage, 1000);
                    //return false;
                }
            },
            error: function() {}
        });
    };
    //倒计时
    var TimeLine = function(){
        $('.timeLine').unbind('click');
        $('.timeLine').addClass('timeing');
        var time = 60;
        var intervalId = setInterval(function(){
            --time;
            if(time >= 0){
                $('.timeLine').text(time+' s');
            }else{
                $('.timeLine').removeClass('timeing');
                clearInterval(intervalId);
                $('.timeLine').text('获取验证码').click(function(){
                    timeClick();
                });
                time = 10;
            }
        }, 1000);
    };
    //事件
    var timeClick = function(){
        TimeLine();
        var tele = $('#tele').val();
        if(!tele){alert('请输入正确电话号码')}else{
             getCode(tele);
        }
    };
    //获取优惠券
    var commit = function(mobile, authCode, userName, expectJob) {
        $.ajax({
            type: "POST",
            dataType: "json",
            url:  "/zhaopinhui/ajax/loginValidate",
            data: {
                mobile: mobile,
                authCode: authCode,
                userName: userName,
                expectJob: expectJob
            },
            cache:false,
            success: function(data) {

                var login = data.entity.login;
                console.log("login:"+login);
                if(login==0){
                    alert("验证码错误！");
                }else{
                    var type = data.entity.zhpresumestat;
                    console.log("type:"+type);
                    if(type == 0){
                        var isOldUser = data.entity.isOldUser;
                        Popup.show(3);
                        spClickLog('source=pc_zphzt_home_bmsuccess');
                        if(isOldUser==1){
                            spClickLog('source=pc_zphzt_home_olduserbmsuccess');
                        }
                    }
                    if(type == 1){
                        Popup.show(2);
                    }
                    if(type ==  -1){
                        alert('出错了，请重试！')
                    }
                }
            },
            error: function() {}
        });
    };
    $(function(){
        //获取优惠券
        $(".ticket").click(function(){
            var name = $("#name").val();
            var tele = $("#tele").val();
            var job =  $(".intention-ctg .selected").attr("data-value");
            if(checked(name,tele,job)){
                Popup.show(1);
            }
        });
        $('.getValidateCode').click(function(){
            timeClick();
        });
        $('.close').click(function(){
            $('.popup').hide();
            $('.mask').hide();
        });
        $('#getTicket').click(function(){
            var name = $("#name").val();
            var tele = $("#tele").val();
            var job =  $(".intention-ctg .selected").attr("data-value");
            var code = $('#code').val();
            var bol = code ? true : false;
            if(checked(name,tele,job) && bol){
                $('.close').trigger('click');
                commit(tele,code, name,job);
            }
        })
    })
    $(".intention-ctg span").click(function(){
        $(this).addClass("selected").siblings().removeClass("selected");
    })    
    $('.backtop').click(function(){
        $('body,html').animate({scrollTop:0},300);
        return false;
    })
    /**
     *
     * [trim description]
     * @return {[type]} [description]
     */
})