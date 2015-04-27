module.exports = {
    console: {
        src: ["src/js/**/*_spec.js"],
        options: {
            reporter: ["dot"]
        }
    },
    watch: {
        src: ["src/js/**/*_spec.js"],
        options: {
            reporter: ["dot"]
        }
    },
    ci: {
        src: ["src/js/**/*_spec.js"],
        options: {
            reporter: ["xunit"],
	          captureFile: "junit-report.xml"
        }
    }
};
