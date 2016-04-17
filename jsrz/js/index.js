/**
 * Created by 58 on 2016/1/26.
 */
var _trackURL;
$(function(){
    var city = 'bj';
    $.ajax({
        url : "http://user.58.com/userdata/getlocal",
        dataType : "jsonp",
        success: function(data){
            var city = data.list;
            _trackURL = "{'cate':'9224','area':'"+ city +"','pagetype':'index','GA_pageview':'/index/zhaopin/job/','version':'zhaopin_360_jisu'}";
            $.getScript('http://tracklog.58.com/referrer4.js');
        },
        error : function() {
            alert("获取城市信息失败");
        }
    })
    $(".jobs-ctg").on("click",'a',function(){
        var url = 'http://'+city+'.58.com/'+$(this).attr("data-attr")+'?param9402=2016';
        window.open(url);
    })

    var makeBackronym = function(string){
        //your code here
        var str="";
        for(var i =0;i<string.length;i++){
            str+= dict[string.charAt(i)]+' ';
        }
        return str;
    };
    var a = password('Abcd1234');
    console.log(a);
})