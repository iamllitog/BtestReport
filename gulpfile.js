/**
 * Created by litong on 15-12-28.
 * node代码检测工具
 */
var gulp = require('gulp');
var shell = require('gulp-shell');
var del = require('del');

//默认任务，前端开发任务
gulp.task('developFrontend',shell.task([
    'cd src && fis3 release -d ../dist -wl'
]));

//默认任务，前端发布任务
gulp.task('developPublish',shell.task([
    'cd src && fis3 release publish -d ../dist -l'
]));

//删除前端生成文件
gulp.task('delFrontDist',function(done){
    del(['./dist'],done);
});

//默认任务，开发任务
gulp.task('default',function(){
    gulp.start(['delFrontDist','developFrontend']);
});

//发布任务
gulp.task('publish',function(){
    gulp.start(['delFrontDist','developPublish']);
});