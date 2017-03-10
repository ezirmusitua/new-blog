const gulp = require('gulp');
const babel = require('gulp-babel');
const nodemon = require('gulp-nodemon');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('./server/tsconfig.json');
const tslint = require('gulp-tslint');
const plumber = require('gulp-plumber');
const argv = require('yargs').argv;

gulp.task('compile', () => {
    return tsProject.src()
        .pipe(tsProject(ts.reporter.defaultReporter())).js
        .pipe(babel({
            plugins: ['transform-es2015-modules-commonjs']
        }))
        .pipe(gulp.dest('./server/dist'));
});

gulp.task('watch', ['compile'], () => {
    const env = {
        NODE_ENV: argv.env || '',
        PORT: argv.port ? parseInt(argv.port) : '',
    };
    return nodemon({
        script: './server/dist/index.js',
        watch: './server/app',
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
