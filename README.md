# webpack-react-redux-router-es6
一套目前常用的react全家桶开发方案

#基本结构：
####app：业务组件+常用函数库+redux+入口文件+项目的css文件
####output：存放开发时候需要生成的引用库文件
####static：antd的字体文件
####templates：模板html文件
####webpack.config.js：开发中的webpack配置文件
####webpack.dll.config.js：生成引用库文件的webpack配置文件
####webpack.production.config.js：生成最终生产环境中所需的文件



#优化点一
为了减少开发时自动编译的时间，将体积比较大的引用库代码通过webpack.dll.config.js文件分离出来，成为output中的lib.js文件。
这时候注意得手动在templates中的html文件中引入lib.js文件。
通过执行：npm run dll

#优化点二
为了减少最终生成的js文件代码的大小，通过extract-text-webpack-plugin组件，将相应的css文件从js文件中分离出来；同时对js代码
进行了压缩。

update 2017.08.28
--------------------------------------------
1.调整了redux的结构。将每个组件的action单独拆分开。并且如果两个component组件不存在联系，那么可以为每个component创建一个
reducer分开存放
