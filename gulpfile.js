var gulp = require('gulp');
var sass = require('gulp-sass');
var del = require('del');
var rename = require('gulp-rename');
var htmlmin = require('gulp-html-minifier');


var scssFiles = ['./source/scss/*.scss'];
var cssDest = './dist/css';
var cssDestMin = './dist/minCss';



var sassDevOptions = {
  outputStyle: 'expanded'
}


var sassProdOptions = {
  outputStyle: 'compressed'
}


// del é um plugin para apagar diretórios recursivamente
gulp.task("clean", function(){

	del(["./dist"]);

})


// Tarefa para compilar os arquivos scss e enviar para o diretório ./dist/css
gulp.task('compila-scss', function(){

	return gulp.src(scssFiles)
			.pipe(sass(sassDevOptions).on('error', sass.logError))
			.pipe(gulp.dest(cssDest));

});

// Tarefa para minificar o scss e enviar para o diretório ./dist/minCss
gulp.task('minifica-scss', function() {
  return gulp.src(scssFiles)
    .pipe(sass(sassProdOptions).on('error', sass.logError))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest(cssDestMin));
});


// Tarefa para minificar o html e enviar para o diretório ./dist
gulp.task('minifica-html', function() {
  return gulp.src('./source/index.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(rename('index.min.html'))
    .pipe(gulp.dest('./dist/'))
});




gulp.task('background', function(){
	gulp.watch('./source/index.html', ['minifica-html']);
	gulp.watch('./source/scss/*.scss', ['minifica-scss', 'compila-scss']);

})

