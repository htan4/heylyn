var gulp=require('gulp'),
	minifycss = require('gulp-minify-css'), 
	notify = require('gulp-notify'),
	uglify = require('gulp-uglify'),
	imagemin = require('gulp-imagemin'),
	cache = require('gulp-cache'),
	livereload = require('gulp-livereload');
gulp.task('styles',function(){
    return gulp.src('src/css/*.css')
    .pipe(minifycss())
    .pipe(gulp.dest('dest/css'))
    .pipe(notify({ message: 'Styles task complete' }));
});
gulp.task('scripts', function() {
    return gulp.src('src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dest/js'))
    .pipe(notify({ message: 'Scripts task complete' }));
});
gulp.task('images', function() {
  return gulp.src('img/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('img'))
    .pipe(notify({ message: 'Images task complete' }));
});
gulp.task('watch', function() {
  gulp.watch('src/css/*.css', ['styles']);
  gulp.watch('src/js/*.js', ['scripts']);
  livereload.listen();
  gulp.watch(['dest/*']).on('change', livereload.changed);
});
gulp.task('default',function(){
    gulp.start('styles','scripts','images');
});