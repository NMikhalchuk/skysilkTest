const path = require('path');

module.exports = {
    //mode: "development",
    mode: 'production',
    context: __dirname + '/app',
    entry: "./app.module.js", // string | object | array  // defaults to './src'
    // Here the application starts executing
    // and webpack starts bundling
    output: {
        path: __dirname + '/app',
        filename: 'bundle.js'
    },

    module: {
        rules: [
            {test: /.\.js$/}
        ]
    },

    resolve: {
        extensions: ['.js']
    }
};