module.exports = {
    js: {
        files: ['src/js/**/*.js', 'server/**/*.js'],
        tasks: ['eslint', 'mocha:console']
    }
};