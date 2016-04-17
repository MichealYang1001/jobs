/**
 * Created by 58 on 2015/11/10.
 */
$(function(){
    JPlaceHolder.init();//ie兼容placeholder
    //图片轮播
    var index = 0,picLength = $(".banner a").length,time = setInterval(switchPic, 2000);
    function switchPic() {
        $(".banner a").eq(index).show().siblings().hide();
        $(".buttons span").eq(index).addClass("on").siblings().removeClass("on");
        if (index == picLength) {
            index = 0;
            $(".banner a").eq(0).show().siblings().hide();
            $(".buttons span").eq(0).addClass("on").siblings().removeClass("on");
        } else {
            index++;
        }
    };
    $(".buttons").delegate("span", "click", function () {
        var index = $(this).index();
        $(".banner a").eq(index).show().siblings().hide();
        $(".buttons span").eq(index).addClass("on").siblings().removeClass("on");
    })
    $(".banner").hover(function () {
        clearInterval(time);
    }, function () {
        time = setInterval(switchPic, 2000);
    });

    //工商注册、代理记账
   	$(".agent-content .content, .registration-content .content").hover(function(){
		$(this).find(".content-hover").stop().animate({
            top: 0
         }, 500)
    },function(){
		var h = $(this).outerHeight();
    	$(this).find(".content-hover").stop().animate({
            top: h+"px"
        }, 500)
    })
})