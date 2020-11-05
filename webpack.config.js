const path = require('path');
const HtmlWebpackPlugin= require('html-webpack-plugin');


module.exports={
    entry:"./src/index.js",
    output:{
        path:path.join(__dirname,'dist'),
        filename:'blunde.js'
    },
    devServer:{
        host:'192.168.1.56',
        port:3001,
        contentBase:':/dist',
        disableHostCheck:true,
        stats:{colors:true},
        historyApiFallback:true
    },
    resolve:{
        extensions: ['.js','.jsx','.css','jpg','png','.less','.scss','.styl']
    },
    module:{
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.(css)$/,
                exclude: /node_modules/,
                use: [
                'style-loader',
                {
                    loader: 'css-loader',
                    options:{
                        importLoaders:1
                    }
                },'postcss-loader']
            },
            {
                test: /\.(less)$/,
                exclude: /node_modules/,
                use: ['style-loader',
                    'css-loader',
                    'less-loader']
            },
            {
                test: /\.(scss)$/,
                exclude: /node_modules/,
                use: ['style-loader',
                    'css-loader',
                    'sass-loader']
            },
            {
                test: /\.(styl)$/,
                exclude: /node_modules/,
                use: ['style-loader',
                    'css-loader',
                    'stylus-loader']
            },
            {
                test: /\.(jpg|png)$/,
                exclude: /node_modules/,
                use: ['file-loader']
            }
            ,
            {
                  test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                    use: [
                      {
                        loader: 'file-loader',
                        options: {
                          name: '[name].[ext]',
                          outputPath: 'fonts/'
                        }
                      }
                    ]
                  }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
    ]
}