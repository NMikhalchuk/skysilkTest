//const path = require('path');
const webpack = require('webpack');

module.exports = {
    //mode: "development",
    mode: 'production',
    context: __dirname + '/app',

    entry: "./app.module.js", // string | object | array  // defaults to './src'
    // Here the application starts executing
    // and webpack starts bundling
    output: {
        path: __dirname + '/app/assets',
        filename: 'bundle.js'
    },

/*
    entry: {
        app: './app.module.js',
        vendor: ['angular', 'angular-local-storage']
    },
    */
/*
    output: {
        path: __dirname + '/app',
        filename: 'bundle.js'
    },
    */
/*
    output: {
        path: __dirname + '/app/dist',
        filename: 'app.bundle.js'
    },
    */
/*
    optimization: {
        runtimeChunk: true,
        splitChunks: {
            cacheGroups: {
                commons: {
                    chunks: 'initial',
                    name: 'commons',
                    test: 'commons',
                    enforce: true,
                    minChunks: 2
                }
            }
        }
    }
*/
};