//返回顶部
$(function(){
    $("#backtop").click(function(){
        $('body,html').animate({scrollTop:0},1000);
        return false;
    })
})

function toMy58(){
top.location.href='http://my.58.com';
}

// 重复提交标识
var submitFlag = 0;

// 优惠券消息设置
function couponRemind(userId){
	if (submitFlag != 0) {
		return;
	} else {
		submitFlag = 1;
	}
	var isOpen = 0;
	var remindStr="1:X,2:X,3:X,5:X";
	var source = 6;
	if(document.getElementById("couponRemind").checked){
		isOpen = 1;
	}
	var url = "http://tuiguang.58.com";
    url = url + "/remind/sendRemindSet";
    
    url += "?userId="+userId+"&source="+source+"&isReceive="+isOpen+"&remindStr="+remindStr+"&parentHtmlId="+"coupon_remind_set"+"&clickType="+1;
    $.get(url,function(data){
    	submitFlag = 0;
    })
}

//手动添加优惠券
function addOtherCoupons(obj){
    $(obj).next('.con').toggle();
    if($(obj).find('b').attr("class")=='on'){
        $(obj).find('b').removeClass('on');
    }else{
        $(obj).find('b').addClass('on');
    }
}

//tab
function clickSwitch(btn,layer,index,mode) {
    $(btn).eq(index).addClass('current');//默认
    $(layer).eq(index).show();//默认
    if(mode){
        $(btn).mouseover(Switch);
    }else {
        $(btn).click(Switch);
    }
    function Switch() {
        var index = $(btn).index(this);
        $(this).addClass('current').siblings().removeClass('current');
        $(layer).eq(index).show().siblings().hide();
        getCouponList(1);
    }
}

//获取当前页的优惠券信息
var url = "http://tuiguang.58.com/couponManage/searchList?rd=" + Math.random();
function getCouponList(pageIndex){
var state = $("#couponStateTab>.current").attr("value");
var userId = $("#logInUserId").val();
   $.ajax({
            type:"POST",
            url:url,
            data:{"pageIndex":pageIndex,"state":state,"userId":userId},
            dataType:"html",
            success:function(data){
                $("#myCouponList").html(data);
                resetIframe('myCouponManage','ContainerFrame');
            }
        });
}

//翻页导航跳转
function getPre(pageIndex, Flag){
    if(Flag == "pre"){
        pageIndex--;
    }else{
        pageIndex++;
    }
     getCouponList(pageIndex);
}

//遮住父页面
function showBlackMask(){
    if(window.parent.$("#couponMask").length>0){
        window.parent.$("#couponMask").css("display","block");
    }else{
     var $popup = $("<div id='couponMask' style='background:#000000; opacity:0.7; height:100%; width:100%; position:fixed; top:0;z-index:490; left:0;'><iframe frameborder='0' width='100%' height='100%' style='opacity:0; filter:alpha(opacity:0)'></iframe></div>");
     $("body",window.parent.document).append($popup);
    }
}

//添加优惠券的去空事件
$(function(){ 
    $("#couponCode").bind("blur",function(){
        for(var index=0;index<this.value.length;index++){
            if(!/^[a-zA-Z]\s+$/.test(this.value.charAt(index))){
                this.value=this.value.replace(/(^\s+)|(\s+$)/g,"").replace(/\s/g,"");
            }
        }
    })
})

//添加验证优惠券
function validateCoupon(obj){
    $(obj).attr("disabled","ture");
    $("#couponCode").removeClass("error");
    $("#valiCouponSpan").removeClass("c-red");
    $("#valiCouponSpan").text("");
    var promotionId = $("#hidPromotionId").val();
    var userId = $("#hidUserId").val();
    var cateId = $("#hidCateId").val();
    var localId = $("#hidLocalId").val();
    var pageType = $("#hidPageType").val();
    var adSource = $("#hidAdSource").val();
    var couponType = $("#hidCouponType").val();
    var auctionType = $("#hidAuctionType").val();
    var couponCode = $("#couponCode").val().replace(/(^\s+)|(\s+$)/g,"").replace(/\s/g,"");//优惠券号
    if($.trim(couponCode) == "" || couponCode == undefined || couponCode == null ){
        alert("请输入优惠券密码");
        $(obj).removeAttr("disabled");
        return;
    }else if(document.getElementById("couponTr_"+couponCode)){
         $("#couponCode").addClass("error");
        $("#valiCouponSpan").addClass("c-red");
        $("#valiCouponSpan").text("该张优惠券已存在于列表中");
        $(obj).removeAttr("disabled");
        return;
    }else if(document.getElementById("hidCoupon_"+couponCode)){
        $("#couponCode").addClass("error");
        $("#valiCouponSpan").addClass("c-red");
        $("#valiCouponSpan").text("优惠券密码输入重复");
        $(obj).removeAttr("disabled");
        return;
    }
    var url = "http://tuiguang.58.com/coupon/validate";
    var postdata = {"promotionId":promotionId,"userId":userId,"adSource":adSource,"cateId":cateId,"localId":localId,"pageType":pageType,"type":couponType,"couponCode":couponCode,"auctionType":auctionType};
    $.post(url, postdata, function(data) {
        $(obj).removeAttr("disabled");
        var resultData = data;
        var resultCode = resultData.resultCode;
        if(resultCode == 0){
            $("#couponCode").removeClass("error");
            $("#valiCouponSpan").removeClass("c-red");
            $("#valiCouponSpan").text("可同时使用多张优惠券");
            var couponInfo = resultData.couponInfo;
            var finishTime = resultData.finishTime;
            
            /**if($("#couponsTable tr").length <= 0){
                $("#couponsTable thead").append("<tr><td class='xx'>优惠券密码</td><td>面值</td><td>过期日期</td><td>操作</td></tr>");
            }**/
            var bodyTr = "";
            bodyTr = '<tr id="couponTr_'+couponInfo.couponCode+'" name="couponTr"><td class="text-l">'+couponInfo.couponCode+'<span class="ico-new">new</span></td><td><span class="c-red">'+parseFloat(resultData.faceValue)+'</span> 元</td><td>'+finishTime+'</td><td><span class="c-06c c-sel" style="display:none;" id="couponAdd_'+couponInfo.couponCode+'" value="' + resultData.faceValue + '" onclick="addCoupon(this,\''+couponInfo.couponCode+'\')">选中</span><span class="c-999 c-sel" id="couponDel_'+couponInfo.couponCode+'" value="' + resultData.faceValue + '" onclick="deleteCoupon(this,\''+couponInfo.couponCode+'\')">取消</span></td></tr>';
            $("#couponsTable tbody").prepend(bodyTr);
            $(".alltop").css("background","#fff");
            $("#hiddenCouponInfo").append("<input type='hidden' id='hidCoupon_"+couponInfo.couponCode+"' name='hidCouponCode' value='"+parseFloat(resultData.faceValue)+"'></input>");
            var sumValue = accAdd($("#allCouponValue").text(),resultData.faceValue);
            sumValue=(Math.round(sumValue*100)/100).toFixed(2); 
            $("#allCouponValue").text(sumValue);
            $("#couponSumVal").val(sumValue);
            $("#couponCode").val("");
        }else{
            $("#couponCode").addClass("error");
            $("#valiCouponSpan").addClass("c-red");
            $("#valiCouponSpan").text(resultData.resultStr);
        }
    });
}

//删除已验证的优惠券
function deleteCoupon(obj,couponCode){
    $("#couponDel_"+couponCode).hide();
    $("#couponAdd_"+couponCode).show();
    var sumValue = accSub($("#allCouponValue").text(),$("#hidCoupon_"+couponCode).val());
    sumValue=(Math.round(sumValue*100)/100).toFixed(2); 
    $("#allCouponValue").text(sumValue);
    $("#couponSumVal").val(sumValue);
    var hideNode = $("#hidCoupon_"+couponCode);
    if(hideNode.length>0){
        hideNode.remove();
    }
}

/**
 ** 减法函数，用来得到精确的减法结果
 ** 说明：javascript的减法结果会有误差，在两个浮点数相减的时候会比较明显。这个函数返回较为精确的减法结果。
 ** 调用：accSub(arg1,arg2)
 ** 返回值：arg1加上arg2的精确结果
 **/
function accSub(arg1, arg2) {
    var r1, r2, m, n;
    try {
        r1 = arg1.toString().split(".")[1].length;
    }
    catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split(".")[1].length;
    }
    catch (e) {
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2)); //last modify by deeka //动态控制精度长度
    n = (r1 >= r2) ? r1 : r2;
    return ((arg1 * m - arg2 * m) / m).toFixed(n);
}

// 给Number类型增加一个mul方法，调用起来更加方便。
Number.prototype.sub = function (arg) {
    return accMul(arg, this);
};

/**
 ** 加法函数，用来得到精确的加法结果
 ** 说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
 ** 调用：accAdd(arg1,arg2)
 ** 返回值：arg1加上arg2的精确结果
 **/
function accAdd(arg1, arg2) {
    var r1, r2, m, c;
    try {
        r1 = arg1.toString().split(".")[1].length;
    }
    catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split(".")[1].length;
    }
    catch (e) {
        r2 = 0;
    }
    c = Math.abs(r1 - r2);
    m = Math.pow(10, Math.max(r1, r2));
    if (c > 0) {
        var cm = Math.pow(10, c);
        if (r1 > r2) {
            arg1 = Number(arg1.toString().replace(".", ""));
            arg2 = Number(arg2.toString().replace(".", "")) * cm;
        } else {
            arg1 = Number(arg1.toString().replace(".", "")) * cm;
            arg2 = Number(arg2.toString().replace(".", ""));
        }
    } else {
        arg1 = Number(arg1.toString().replace(".", ""));
        arg2 = Number(arg2.toString().replace(".", ""));
    }
    return (arg1 + arg2) / m;
}

//给Number类型增加一个add方法，调用起来更加方便。
Number.prototype.add = function (arg) {
    return accAdd(arg, this);
};

function checkCouponMsg(topprice, sumprice){
    if(parseFloat(topprice) < sumprice){
    	var beyondprice = parseFloat(parseFloat(sumprice) - parseFloat(topprice));
    	var fixNum = new Number(beyondprice+1).toFixed(2);//四舍五入之前加1  
    	var beyondprice = new Number(fixNum - 1).toFixed(2);//四舍五入之后减1，再四舍五入一下
    	if(confirm("您添加的优惠券总面值已超出本次置顶所需金额"+beyondprice+"元，超出部分不找零，是否确定添加？")){
    		return true;
    	}else{
    		return false;
    	}
    }
    return true;
}
//添加优惠券
function addCoupon(obj,couponCode){
    $("#couponAdd_"+couponCode).hide();
    $("#couponDel_"+couponCode).show();
    var faceValue = $(obj).attr("value");
    var sumValue = accAdd($("#allCouponValue").text(),faceValue);
    sumValue=(Math.round(sumValue*100)/100).toFixed(2); 
    $("#allCouponValue").text(sumValue);
    $("#couponSumVal").val(sumValue);
    $("#hiddenCouponInfo").append("<input type='hidden' id='hidCoupon_"+couponCode+"' name='hidCouponCode' value='"+faceValue+"'></input>");
}

//呈现用户已选择的优惠券
function showCouponsSelected(){
var promotionId = $("#hidPromotionId").val();
var selectedCoupons = window.parent.$("<p></p>").append(window.parent.$("#CouponSelDiv #CouponSelTr_"+promotionId+" tr").clone(true)).html();//.children("tr");
var canotSelCoupons = window.parent.$("<p></p>").append(window.parent.$("#CouponSelDiv table:not('#CouponSelTr_"+promotionId+"') tr").clone(true)).html();
    selectedCoupons = $(selectedCoupons);
    canotSelCoupons = $(canotSelCoupons);
    
    //剔除用户不能选择的优惠券
    for(var i=0;i<canotSelCoupons.length;i++){
       var $curNotSel = $(canotSelCoupons[i]);
       var couponNotTrId = $curNotSel.attr("id").split("_")[1];
       if($("#couponTr_"+couponNotTrId).length>0){
            $("#couponTr_"+couponNotTrId).remove();
       }
    }
    //添加用户已经选择的优惠券
    for(var i=0;i<selectedCoupons.length;i++){
       var $curSel = $(selectedCoupons[i]);
       var $curSelCopy = $curSel.clone(true);
       var couponTrId = $curSelCopy.attr("id").split("_")[1];
       if($("#couponTr_"+couponTrId).length>0){
           var obj = $("#couponAdd_"+couponTrId)[0];
            addCoupon(obj,couponTrId);
       }else{
           /**if($("#couponsTable thead tr").length <= 0){
                $("#couponsTable thead").append("<tr><td class='xx'>优惠券密码</td><td>面值</td><td>过期日期</td><td>操作</td></tr>");
            }**/
           $("#couponsTable tbody").prepend($curSelCopy);
           $("#couponAdd_"+couponTrId).attr("onclick","addCoupon(this,'"+couponTrId+"')");
           $("#couponDel_"+couponTrId).attr("onclick","deleteCoupon(this,'"+couponTrId+"')");
           var faceValue = $curSelCopy.find("td:eq(1)").find("span").text();
           $("#hiddenCouponInfo").append("<input type='hidden' id='hidCoupon_"+couponTrId+"' name='hidCouponCode' value='"+faceValue+"'></input>");
           var sumValue = accAdd($("#allCouponValue").text(),faceValue);
           sumValue=(Math.round(sumValue*100)/100).toFixed(2);
           $("#allCouponValue").text(sumValue);
           $("#couponSumVal").val(sumValue);
       }
    }
}

//优惠券绑定按钮
function boundCoupons(){
    var promotionId = $("#hidPromotionId").val();
    var userId = $("#hidUserId").val();
    var cateId = $("#hidCateId").val();
    var localId = $("#hidLocalId").val();
    var auctionType = $("#hidAuctionType").val();
    var couponType = $("#hidCouponType").val();
    var pageType = $("#hidPageType").val();
    var adSource = $("#hidAdSource").val();
    var iFrameId = $("#hidiFrameId").val();
    
    var sumValue = $("#couponSumVal").val();
    var adsource = $("#hidAdSource").val();
    if(adsource == 3){
    	var topprice = $("#topprice").val();
	    if(!checkCouponMsg(topprice, sumValue)){
	    	return ;
	    }
		if(!confirm("优惠券添加成功")){
			return ;
		}
    }
    $("#boundCouponButton").attr("disabled","true");
    var couponCodesStr = "";
    $("#hiddenCouponInfo input[name='hidCouponCode']").each(function(){
        var thisCouponCode = $(this).attr("id").split("_")[1];
        if(couponCodesStr == ""){
            couponCodesStr = thisCouponCode;
        }else{
            couponCodesStr = couponCodesStr + "," +thisCouponCode;
        }
    });
    //新建页面不绑定
    if(pageType== "0"){
        if(window.parent.$("#CouponSelDiv").length==0){
          var $popup =window.parent.$("<div style='display:none;' id='CouponSelDiv'></div>");
          window.parent.$("body").append($popup);
        }
         if(window.parent.$("#CouponSelTr_"+promotionId).length==0){
             var $popup =window.parent.$("<table id='CouponSelTr_"+promotionId+"'></table>");
             window.parent.$("#CouponSelDiv").append($popup);
         }else{
            window.parent.$("#CouponSelTr_"+promotionId).text("");
         }
        $("#hiddenCouponInfo input[name='hidCouponCode']").each(function(){
            var thisCouponCode = $(this).attr("id").split("_")[1];
            var $couponSelTr = $("<p></p>").append($("#couponTr_"+thisCouponCode).clone(true)).html();
            window.parent.$("#CouponSelTr_"+promotionId).append($couponSelTr);
        });
         var sumValue = $("#couponSumVal").val();
          if(sumValue != 0){
            alert("绑定的优惠券号为："+ couponCodesStr +",总价值为："+$("#couponSumVal").val()+"元。");
           }
         parent.newPageReturn(couponCodesStr,sumValue,promotionId);
         return;
    }else{
        if(couponCodesStr == ""){
            alert("请选择优惠券！");
            $("#boundCouponButton").removeAttr("disabled");
            return;
        }
            var url = "http://tuiguang.58.com/coupon/boundCoupon";
            var postdata = {"userId":userId,"promotionId":promotionId,"couponCodesStr":couponCodesStr,"adSource":adSource,"cateId":cateId,"localId":localId,"couponType":couponType,"auctionType":auctionType};
            $.post(url, postdata, function(data) {
            	var highRisk = $.highRiskVerify(data, boundCoupons.bind(null), userId);
	        	if(highRisk == 1){
	        		return;
	        	}
                $("#boundCouponButton").removeAttr("disabled");
                var result = data.split("-");
                var resultCode = result[0];
                var resultMsg = result[1];
                var offSet = result[2];
                alert(resultMsg);
                parent.managePageReturn(resultCode,resultMsg,offSet,promotionId);
            });
        }
    }
    
 //IFrame高度自适应
  function resetIframe(contentId,IFrameId){
    try{
        var dingiframe = window.parent.$("#"+IFrameId);
        if (dingiframe.length >0){
            var newheight = $("#"+contentId).height()+20;
            setframeheight(dingiframe,newheight);
        }
    }catch(ex){
        
    }
}  
  
  function setframeheight(frm, height) {
    if (frm.length > 0) {
        frm.css("height", height + "px");
    }
}  