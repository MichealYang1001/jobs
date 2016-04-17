$(function(){
    var json = {goods: [
        {goodid:533725729752858624, orderid:533725727299190784, serviceid:51, createtime:'Thu Nov 19 19:15:29 CST 2015', gooddetail:{"0":1,"56":"代账业务负责人","55":"1","51":"1","52":"2","71":"服务费","53":20151120,"72":"账本费","54":20160215}, state:3},
        {goodid:533725729752858624, orderid:533725727299190784, serviceid:51, createtime:'Thu Nov 19 19:15:29 CST 2015', gooddetail:{"0":51,"56":"代账业务负责人","55":"1","51":"1","52":"2","71":"服务费","53":20151120,"72":"账本费","54":20160215}, state:4},

    ]};
    var list = json.goods;
    for(var i=0;i<list.length;i++){
        if(list[i].gooddetail[0]==1){  //公司注册订单
            var rstate = list[i].state; //标示步骤
        }else if(list[i].gooddetail[0].toString().substr(0,1)==5){ //代理记账订单
            var astate = list[i].state;
        }
    }
    if(rstate){
        $(".register .step").eq(rstate).addClass("now").nextAll().addClass("future");
    }else{
        $(".register").hide();
    }
    if(astate){
        $(".agent .step").eq(astate).addClass("now").nextAll().addClass("future");
    }else{
        $(".agent").hide();
    }

    console.info(rstate);
    console.info(astate);
})
