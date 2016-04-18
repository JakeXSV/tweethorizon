module.exports = function (wallaby) {
    return {
        files: [
            'domain/**/*.js',
            'service/**/*.js',
            'routes/**/*.js'
        ],
        tests: [
            'test/**/*Spec.js'
        ],
        debug: true,
        env: {
            type: 'node',
            runner: 'node'
        },
        workers: {
            initial: 6,
            regular: 2,
            recycle: true
        }
    };
};
