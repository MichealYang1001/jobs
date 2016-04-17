$(function(){
    $('#slide3').swipeSlide({
    	autoSwipe : true,
        continuousScroll:true,
        speed : 3000,
        transitionType : 'cubic-bezier(0.22, 0.69, 0.72, 0.88)',
        callback : function(i){
            $('.dot').children().eq(i).addClass('cur').siblings().removeClass('cur');
        }
    });
    $("#customservice").on("click",function(){
    	console.log("客服完善");
    	$(".bgdiv").hide();
    	$(".scheme_one").hide();
    	$(".scheme_two").hide();
    });
    $("#selfservice").on("click",function(){
    	console.log("自己完善");
    	$(".bgdiv").hide();
    	$(".scheme_one").hide();
    	$(".scheme_two").hide();
    });
    $("#surebtn").on("click",function(){
    	console.log("确认按钮");
    	$(".bgdiv").hide();
    	$(".scheme_one").hide();
    	$(".scheme_two").hide();
    });
    $("#cancelbtn").on("click",function(){
    	console.log("cancelbtn 取消");
    });
    $("#immediatelyconsult").on("click",function(){
		console.log("immediatelyconsult 立即咨询");
    });


    $(".tel_ask").on("click",function(){
    	console.log("电话咨询");
    	$(".bgdiv").show();
    	$(".scheme_one").hide();
    	$(".scheme_two").hide();
    	$(".scheme_three").show();
    });
    $(".online_apply").on("click",function(){
    	console.log("在线报名");
    	$(".bgdiv").show();
    	$(".scheme_one").hide();
    	$(".scheme_two").show();
    	$(".scheme_three").hide();
    });
    $(".bgdiv").on("click",function(e){
    	e.stopPropagation();
    	$(".bgdiv").hide();
    	$(".scheme_one").hide();
    	$(".scheme_two").hide();
    	$(".scheme_two").show();
    });
});
