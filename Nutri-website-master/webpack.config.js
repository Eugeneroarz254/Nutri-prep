
const path = require('path');
const htmlPlugin=require('html-webpack-plugin')
module.exports = {


  mode:"production",
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    publicPath:'/' 
  }, 
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test:/\.(js|jsx)$/,
        exclude:/node_modules/,
        use:{

            loader:"babel-loader",


        }
    },
      {
        test: /\.css$/,

        use: [ "style-loader",'css-loader'],
      },
           {
                test: /\.(png|svg|jpg|jpeg|ico|gif)$/,
                use: {
                 loader:'file-loader',
                 options:{
                    name:"[name].[hash].[ext]",
                    outputPath:"public/images"
                }

            },
            },
    ],
  },
  plugins:[

    new htmlPlugin({
        template:"./public/index.html",
        
    }),
  ],




devServer: {
  historyApiFallback: {
    index: false,
    rewrites: [{ from: /./, to: '/index.html' }]
  },
  open: true
}



};