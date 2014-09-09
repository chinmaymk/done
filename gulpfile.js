var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var livereload = require('gulp-livereload');

gulp.task('js', function() {

});

gulp.task('lr', function() {
  livereload.listen();
  gulp.watch('./views/**/*.jade').on('change', livereload.changed);
  gulp.watch('./public/**/*.js').on('change', livereload.changed);
  gulp.watch('./public/**/*.css').on('change', livereload.changed);
});

gulp.task('serve', ['js', 'lr'], function() {
  return nodemon({
    script: 'app.js',
    ignore: ['/public/js/*.js'],
    ext: 'js',
  });
});