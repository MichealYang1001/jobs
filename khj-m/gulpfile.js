/**
 * Created by 58 on 2016/1/20.
 */
var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify'),

    spriter = require('gulp-css-spriter'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    del = require('del');

gulp.task('minifycss', function() {
    return gulp.src('static/css/*.css')      //压缩的文件
        .pipe(minifycss())
    .pipe(gulp.dest('build/css'));   //输出文件夹
          //执行压缩
});
gulp.task('minifyjs', function() {
    return gulp.src('static/js/*.js')
        .pipe(uglify())    //压缩
        .pipe(gulp.dest('build/js'));  //输出
});
gulp.task('imagemin', function(){
    return gulp.src('static/images/*.png')
        .pipe(imagemin())
        .pipe(gulp.dest('build/images'))
})
//gulp.task('clean', function(cb) {
//    del(['build/css', 'build/js'], cb)
//});
//
gulp.task('css', function() {
    var timestamp = +new Date();
    //需要自动合并雪碧图的样式文件
    return gulp.src('./static/css/index.css')
        .pipe(spriter({
            // 生成的spriter的位置
            'spriteSheet': './build/images/sprite'+timestamp+'.png',
    // 生成样式文件图片引用地址的路径
    // 如下将生产：backgound:url(../images/sprite20324232.png)
            'pathToSpriteSheetFromCSS': '../images/sprite'+timestamp+'.png'
    }))
    .pipe(minifycss())
    //产出路径
    .pipe(gulp.dest('./build/css'));
});
gulp.task('default', function() {
    gulp.start('minifycss', 'minifyjs','imagemin');
});