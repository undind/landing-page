import gulp from 'gulp';
import sass from 'gulp-sass';
import imagemin from 'gulp-imagemin';
import browserSync from 'browser-sync';
import fileinclude from 'gulp-file-include';
import formatHtml from 'gulp-format-html';
import autoprefixer from 'gulp-autoprefixer';
import rm from 'gulp-rm';
import replace from 'gulp-replace';

const sassOptions = { outputStyle: 'expanded', errLogToConsole: true };

exports.sass = () =>
    gulp
        .src('./src/scss/styles.scss')
        .pipe(sass(sassOptions))
        .pipe(
            autoprefixer({
                overrideBrowserslist: ['last 2 versions', '> 1%'],
                cascade: false,
            })
        )
        .pipe(gulp.dest('./dist/assets/css'))
        .pipe(browserSync.reload({ stream: true }));

exports.images = () =>
    gulp
        .src('./src/img/**/*')
        .pipe(
            imagemin([
                imagemin.svgo({
                    plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
                }),
            ])
        )
        .pipe(gulp.dest('./dist/assets/img'))
        .pipe(browserSync.reload({ stream: true }));

exports.include = () =>
    gulp
        .src('./src/html/*.html')
        .pipe(
            fileinclude({
                prefix: '@@',
                basepath: '@file',
            })
        )
        .pipe(formatHtml())
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.reload({ stream: true }));

exports.js = () =>
    gulp
        .src('./src/js/*.js')
        .pipe(gulp.dest('./dist/assets/js'))
        .pipe(browserSync.reload({ stream: true }));

gulp.task('clean', () => gulp.src('dist/**/*', { read: false }).pipe(rm()));

gulp.task('serve', () => {
    browserSync.init({
        server: {
            baseDir: './dist',
            index: 'index.html',
        },
        notify: false,
        injectChanges: true,
    });

    gulp.watch('./src/scss/**/*', gulp.series('sass'));
    gulp.watch('./src/img/**/*', gulp.series('images'));
    gulp.watch('./src/html/*.html', gulp.series('include'));
    gulp.watch('./src/js/*.js', gulp.series('js'));
    gulp.watch('./dist/*').on('change', browserSync.reload);
});

gulp.task('default', gulp.series('serve'));

/// BUILD
gulp.task('for-dev-html', function () {
    return gulp
        .src('./src/html/*.html')
        .pipe(
            fileinclude({
                prefix: '@@',
                basepath: '@file',
            })
        )
        .pipe(formatHtml())
        .pipe(
            replace(/.\/themes\/([^"]*)/g, function (cssPath) {
                return '/themes' + cssPath.substr(8);
            })
        )
        .pipe(gulp.dest('dev'));
});

gulp.task('for-dev-css', function () {
    return gulp
        .src('./src/scss/styles.scss')
        .pipe(sass(sassOptions))
        .pipe(
            autoprefixer({
                overrideBrowserslist: ['last 2 versions'],
                cascade: false,
            })
        )
        .pipe(
            replace(/..\/img\/([^"]*)/g, function (cssPath) {
                return '/themes' + cssPath.substr(2);
            })
        )
        .pipe(gulp.dest('./dev/themes/css'));
});

gulp.task('for-dev-js', function () {
    return gulp.src('./src/js/*.js').pipe(gulp.dest('./dev/js'));
});

gulp.task('for-dev-img', function () {
    return gulp
        .src('./src/img/**/*')
        .pipe(
            imagemin([
                imagemin.svgo({
                    plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
                }),
            ])
        )
        .pipe(gulp.dest('./dev/themes/img'));
});

gulp.task('dev', gulp.parallel('for-dev-html', 'for-dev-css', 'for-dev-img', 'for-dev-js'));
