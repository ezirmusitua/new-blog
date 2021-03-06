const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('./tsconfig.json');
const tslint = require('gulp-tslint');
const plumber = require('gulp-plumber');
const argv = require('yargs').argv;

gulp.task('compile', () => {
    return tsProject.src()
        .pipe(tsProject(ts.reporter.defaultReporter())).js
        .pipe(gulp.dest('./dist'));
});

gulp.task('watch', ['compile'], () => {
    const env = {
        NODE_ENV: argv.env || '',
        PORT: argv.port ? parseInt(argv.port) : '',
    };
    return nodemon({
        script: './dist/index.js',
        watch: './app',
        ext: 'ts',
        delay: 1,
        tasks: ['compile'],
        env
    });
});

gulp.task('tslint', () =>
    tsProject.src()
        .pipe(plumber({ errorHandler: false }))
        .pipe(tslint({
            configuration: "./tslint.json"
        }))
        .pipe(tslint.report({
            summarizeFailureOutput: true
        }))
);

gulp.task('default', ['watch']);
