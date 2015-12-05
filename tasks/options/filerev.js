module.exports = {
    options: {
        algorithm: "md5",
        encoding: "utf8",
        length: 8
    },
    js: {
        src: "<%= buildDir%>/*.js"
    },
    css: {
        src: "<%= buildDir%>/*.css"
    }
};