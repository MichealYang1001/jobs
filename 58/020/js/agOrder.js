$(function(){

	//选择地区、经营范围
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

	//选择套餐
	$('.taocan .tc').click(function(){
		var index = $('.taocan .tc').index($(this));
		var totalMum;
		var tcClass;
		$('.taocan .tc .choose').remove() && $(this).append('<span class="choose"></span>');
		$(this).addClass('selected').siblings().removeClass('selected');
		if(index == 0){
			totalMum = 1200;
			tcClass = '基础包';
		}else if(index == 1){
			totalMum = 2000;
			tcClass = '新手包';
		}else{
			totalMum = 5000;
			tcClass = '豪华包';
		}
		$('#money').html('总计：￥' + totalMum);
		$('.totalnum p').html(tcClass + '：￥' + totalMum);
	});

	//选择地区
	$('.region label').click(function(){
		var __this = $(this);
		labChoose('.region label', __this);
	});

	//选择经营范围
	$('.plans label').click(function(){
		var __this = $(this);
		labChoose('.plans label', __this);
	});

	//需求描述框
	$('.regadd textarea').focus(function(){
		var textcon = $(this).val();
		if(textcon == '请输入相关需求描述'){
			$(this).val("");
		}
	}).blur(function(){
		var textcon = $(this).val();
		if(!textcon){
			$(this).val('请输入相关需求描述');
		}
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