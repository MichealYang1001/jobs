$(function(){

	getTotal();

	//计算总价
	function getTotal(relIdx){
		var tcIdx = $('.taocan .tc').index($('.taocan .selected'));
		var regionIdx = $('.region label').index($('.region label.chola'));
		var addIdx = $('.add label').index($('.add label.chola'));
		var tcNum;
		var addNum;
		if(regionIdx == 0 || regionIdx == 1 || regionIdx ==2){
			if(addIdx == 1){
				if(tcIdx == 0){
					tcNum = 298;
					if(regionIdx == 0){
						addNum = 3600;
					}else if(regionIdx == 1){
						addNum = 5500;
					}else{
						addNum = 4000;
					}
				}else if(tcIdx == 1){
					tcNum = 898;
					addNum = 3600;
				}else{
					tcNum = 2298;
					addNum = 3600;
				}
			}else{
				if(tcIdx == 0){
					if(regionIdx == 0){
						tcNum = 298;
					}else{
						tcNum = 498
					}
				}else if(tcIdx == 1){
					if(regionIdx == 0){
						tcNum = 898;
					}else{
						tcNum = 1098;
					}
				}else{
					if(regionIdx == 0){
						tcNum = 2298;
					}else{
						tcNum = 2498;
					}
				}
			}
		}else if(regionIdx == 3 || regionIdx == 4){
			if(tcIdx == 0){
				tcNum = 498;
			}else if(tcIdx == 1){
				tcNum = 1098;
			}else{
				tcNum = 2498;
			}
		}else{
			addNum = 2202;
			if(tcIdx == 0){
				tcNum = 298;
			}else if(tcIdx == 1){
				tcNum = 898;
			}else{
				tcNum = 2298;
			}
		}

		if(addNum == undefined){
			$('#money').html('总计：￥' + tcNum);
			$('.totalnum p').html('基础包：￥' + tcNum);
		}else{
			var totalNum = tcNum + addNum;
			$('#money').html('总计：￥' + totalNum);
			$('.totalnum p').html('基础包：￥' + tcNum + ' + 地区注册：￥' + addNum);
		}
	}

	//选择地区、计划
	function labChoose(querySel, __this){
		var radioId = __this.attr('name');
		$(querySel + ' .chooses').remove() && __this.append('<span class="chooses"></span>');
		__this.addClass('chola').siblings().removeClass('chola');
		$("#"+radioId).attr('checked', 'checked');
	}

	//获取链接参数
	function getURLParameter(name) {
		return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
	}

	var idx = getURLParameter('regId');
	if(idx){
		var _this = $('.taocan .tc').eq(idx - 1);
		_this.addClass("selected").siblings().removeClass("selected");
		$('.taocan .tc .choose').remove() && _this.append('<span class="choose"></span>');
	}

	//弹层弹出
	$('.intro').click(function(){
		$('#pop').show().prev().show();
	});

	//弹层关闭
	$('#pop h4 span').click(function(){
		$('#pop').hide().prev().hide();
	});

	//套餐选择
	$('.taocan .tc').click(function(){
		$('.taocan .tc .choose').remove() && $(this).append('<span class="choose"></span>');
		$(this).addClass('selected').siblings().removeClass('selected');
		getTotal();
	});

	//地区选择，注册地址的变化
	$('.region label').click(function(){
		$('.add label').css('color', '#56575b');
		$('.add label').click(function(){
			var __this = $(this);
			var index = $('.add label').index(__this);
			labChoose('.add label', __this);
			$('.addex p').eq(index).show().siblings().hide();
			getTotal();
		});
		var __this = $(this);
		labChoose('.region label', __this);
		getTotal();
		var index = $('.region label').index(__this);
		if(index == 3 || index == 4){//东城、西城
			$('.add label').eq(0).addClass('chola').siblings().removeClass('chola').css('color', '#ccc');
			$('.add label .chooses').remove() && $('.add label').eq(0).append('<span class="chooses"></span>');
			$('.addex p').eq(0).show().siblings().hide();
			$('.add label').unbind();
		}else if(index == 5){//怀柔
			$('.add label').eq(1).addClass('chola').siblings().removeClass('chola').css('color', '#ccc');
			$('.add label .chooses').remove() && $('.add label').eq(1).append('<span class="chooses"></span>');
			$('.addex p').eq(1).show().siblings().hide();
			$('.add label').unbind();
		}
	});
	
	//选择计划
	$('.plans label').click(function(){
		var __this = $(this);
		var index = $('.plans label').index(__this);
		labChoose('.plans label', __this);
		$('.range div p').eq(index).show().siblings().hide();
	});

	//选择注册地址
	$('.add label').click(function(){
		var __this = $(this);
		var index = $('.add label').index(__this);
		labChoose('.add label', __this);
		$('.addex p').eq(index).show().siblings().hide();
		getTotal();
	});

	//联系方式交互
	$('.contact input').blur(function(){
		var __this = $(this);
		var mtval = __this.val();
		var mtname = __this.attr('name');
		if(mtname == 'username'){
			var reg = /^[\u4E00-\u9FA5]{2,4}$/;
		}else{
			var reg = /^1[3|4|5|7|8][0-9]{9}$|^[0-9]{3,4}-[0-9]{7,8}$/;
		}
		if(!reg.test(mtval)){
			if(mtval == ""){
				__this.next().hide();
			}else{
				__this.next().show();
			}
			$('.wrong' + mtname).show().prev().addClass('wrong');
			return;
		}
		$('.wrong' + mtname).hide().prev().removeClass('wrong');
		__this.next().hide();
	});

	//清除联系方式中的姓名、电话
	$('.nametel .delete').click(function(){
		$(this).prev().val("");
	});

	//弹出登陆弹层
	$('.bespeak').click(function(){
		$('.infobg').show().next().show();
	});

	//登陆弹层中的注册
	$('.reg_now').click(function(event){
		event.preventDefault();
		$('.login').hide().next().show();
	});

	//注册弹层中的登陆
	$('.login_now').click(function(event){
		event.preventDefault();
		$('.register').hide().prev().show();
	});

	//关闭登陆弹层
	$('.closelogin').click(function(){
		$('.login').hide();
		$('.infobg').hide();
	});

	//关闭注册弹层
	$('.closereg').click(function(){
		$('.register').hide();
		$('.infobg').hide();
	});

});