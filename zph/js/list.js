/**
 * Created by 58 on 2015/11/12.
 */
$(function() {
	var allcount = $("#allcount").val();
	var where = $("#where").val();
	if(where){
        var currentctg =  $(".filter-current span");
        if(where=="kefu"){
            currentctg.text("客服");
        }else if(where=="sale"){
            currentctg.text("销售");
        }else{
            currentctg.text("所有职位");
        }
    }
	var allpage = Math.ceil(allcount / 10);
	if(allpage>1){
		$(".page").show();
	}
	$(".totalpage").text(allpage);
	var currentpage = 1;
	// 点击上一页
	$(".pageleft").on('click', function() {
				if (currentpage > 1) {
					currentpage--;
					$('.currentpage').text(currentpage);
					if (currentpage == 1) {
						$(".pageleft").css("color", "#ccc");
					}
					if (currentpage + 1 == allpage) {
						$(".pageright").css("color", "#00aee1");
					}
					//generateHtml();
				}

			})
	// 点击下一页
	$(".pageright").on('click', function() {
		if (currentpage < allpage) {
			currentpage++;
			$('.currentpage').text(currentpage);
			if (currentpage == allpage) {
				$(".pageright").css("color", "#ccc");
			}
			if (currentpage == 2) {
				$(".pageleft").css("color", "#00aee1");
			}
			//generateHtml();
		}
	})
	function generateHtml() {
		$.ajax({
			type: "POST",
            dataType: "json",
			url : "http://wx.supin.58.com/zphinfo/ajax_zphinfo/" + currentpage,
//			url : "http://wx.supin.58.com/zphinfo/ajax_zphinfo",
			data : {
				'where':where
			},
			success : function(data) {
				console.info(data);
				$('.jobs').empty();
				if (data.isSuccess) {
					var infolist = data.entity;
					var tracksid = data.tracksid;
					for (var i = 0; i < infolist.length; i++) {
						var item = infolist[i];
						var job = ''
							+ '<div class="job" data-attr="/info/infodetail/'+item.id+"?psid=" + tracksid+'">'
							+ 	'<div class="job-top clearfix">'
							+ 		'<div class="companylogo">'
							+ 			'<img src="http://pic1.58cdn.com.cn/enterprise/zhaopin/rpo'+item.spEnterpriseView.logourl+'" alt=""/>'
							+ 		'</div>'
							+ 		'<div class="companyjob">'
							+ 			'<div class="name-ctg">'
							+ 				'<span class="job-name">'+item.name+'</span>';
						if (item.cateName == "" || item.cateName == "null" || typeof item.cateName == "undefined") {
							job+='<span class="job-ctg">[' + item.catepName + ']</span>';
						} else {
							job+='<span class="job-ctg">[' + item.cateName + ']</span>';
						}
						job+= '</div>'
							+ '<div class="company-name">'+item.enterpriseName+'</div>'
							+ '</div>' + '</div>'
							+ '<div class="job-bottom">'
							+ '<div class="salary">'
							+ '<img src="/img/dollar.png" alt=""/>'
							+ '<span>'+item.averagesalary+'元/月</span>' + '</div>' + '</div>'
							+ '</div>';
						$('.jobs').append(job);
					}
					window.scrollTo(0, 0);
				} else {
					
				}
			},

			error : function() {
				console.info(data);
//				alert("获取列表数据失败!")
			}
		})
	}

	// 跳转至详情页
	$('.jobs').delegate('.job','click', function() {
		var locationhost = window.location.host;
			locationhost += $(this).attr("data-attr");
			location.href = "http://"+locationhost;
	})
	// 展开筛选框
	$('.filter-current').on('click', function() {
				var $this = $(this);
				var mask = $('.mask');
				var drop = $('.filter-drop');
				if (!$this.hasClass('open')) {
					$this.addClass('open');
					mask.css({
								'height' : ($(document).height() - 177) + 'px',
								'top' : '177px'
							});
					mask.show();
					drop.show();
				} else {
					$this.removeClass('open');
					mask.hide();
					drop.hide();
				}
			})
	// 选择职位类别
	$('.filter-drop li').on('click', function() {
		$('.mask').hide();
		$('.filter-drop').hide();
		where = $(this).attr("data-attr");
		location.href = "infolist?where="+ where;
	})
    var b = 0;
	$(window).scroll(function () {
		var st = $(this).scrollTop();
		if(st>=177){
            if(b){
                return;
            }
			$('.filter').addClass('filter-fixed');
			$('.jobs').css('padding-top','64px');

            $('.filter').css({
                top: "-54px"
            });
            $('.filter').animate({
                top: "0"
            }, 300, "ease-out");
            b =1;
		}else{
            b = 0;
            $('.filter').removeClass('filter-fixed');
            $('.jobs').css('padding-top','10px');
        }
	});

})