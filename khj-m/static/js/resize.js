
var fontsize=function () {
    var W=window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        defaultW=640,
        defaultSize = 20;
    if (W > defaultW) W = defaultW;
    if (W < 320) W = 320;
    document.getElementsByTagName('html')[0].style.fontSize = (W / defaultW * defaultSize).toFixed(2) + 'px';
}
onresize = fontsize;
fontsize();
