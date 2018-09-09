const gulp = require('gulp');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const gulpPugBeautify = require('gulp-pug-beautify');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const babel = require('gulp-babel');
const pump = require('pump');
const browserSync = require('browser-sync').create();

// Rutas
const config = {
    bootstrapDir: './node_modules/bootstrap/scss',
    publicDir: './dist',
    sassPath: './src/scss/**/*.scss',
    pugPath: './src/pug/*.pug',
    jsPath: './dist/js/**/*.js',
};

const paths = {
    javascript: [
        './src/js/jquery.js',
        './src/js/typed.js',
        './src/js/main.js'
    ],
    alljs: [
        './dist/js/*.js'
    ],
    css: [
        './dist/css/*.css'
    ]
};

// Tarea Pug
gulp.task('pug', ()=> {
    pump([
        gulp.src(config.pugPath),
        pug({
            pretty: true
        }),
        gulpPugBeautify({ omit_empty: true, omit_div: false, fill_tab: true, omit_empty_lines: true, tab_size: false }),
        gulp.dest(config.publicDir)
    ])
});

// Compila sass en CSS y autoinyecta en los navegadores
// outputStyle: nested = opcion por defecto
// outputStyle: campact 
// outputStyle: extended
// outputStyle: compressed = para comprimir

gulp.task('sass', (x)=> {
    // Manejo de Errores
    pump([
        gulp.src(config.sassPath),
        sass({includePaths: [config.bootstrapDir], outputStyle: 'campact'}).on('error', sass.logError),
        autoprefixer({ browsers: ['last 2 versions'], cascade: false }),
        rename({ suffix: ".min" }),
        gulp.dest(config.publicDir + '/css'),
        browserSync.stream()
    ], x);
});

// Compreson JS
gulp.task('compress', ()=> {
    gulp.src(paths.javascript)
        .pipe(concat('dist/js/build.js'))
        .pipe(uglify())
        .pipe(rename({ suffix: ".min", }))
        .pipe(gulp.dest('./'));
});

// arreglar para transpilar
gulp.task('babel', ()=> {
    gulp.src(paths.javascript)
    .pipe(babel({
        presets:['env']
    }))
    .pipe(gulp.dest('./'));
})

// Static Server + Vigilacia a los  archivos scss / html
gulp.task('watch', ()=> {

    browserSync.init({
        server: "./dist"
    });

    gulp.watch(config.pugPath, ['pug']).on('change',browserSync.reload);
    gulp.watch(['./node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/**/*.scss'], ['sass']);
    gulp.watch(['./node_modules/bootstrap/scss/**/*.scss', 'src/scss/*.scss'], ['sass']);
    gulp.watch(paths.css).on('change', browserSync.stream);
    gulp.watch("src/js/*.js", ['compress']).on('change', browserSync.reload);
    gulp.watch("dist/*.html").on('change', browserSync.reload);
});

gulp.task('default', ['pug', 'sass', 'compress', 'watch']);

// Mueva los archivos javascript a nuestra carpeta / src / js / IMG

// Comprimir IMG
gulp.task('importIMG', () =>
    gulp.src('src/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/img'))
);

gulp.task('importJS', function() {
    return gulp.src(['./node_modules/jquery/dist/jquery.js',
        './node_modules/typed.js/src/typed.js'])
        .pipe(gulp.dest("src/js"))
});

// Importar css
gulp.task('importCSS', function() {
    return gulp.src(['node_modules/lightbox2/dist/css/lightbox.css'])
        .pipe(gulp.dest("src/scss"))
        .pipe(browserSync.stream());

});

// Tarea para las Fonts y Icons
gulp.task('importFont', function() {
    return gulp.src(['src/fonts/*'])
        .pipe(gulp.dest("dist/fonts/icons"))
});

