# code-fight
code-node-fight

这是我进行学习node.js实战的一个目录

window 使用bcrypt

用nodejs稳定版，最好版本稍低一点 如：4.x

将原先 npm install bcrypt 改为 npm install bcrypt-nodejs

运行时 bcrypt.hash(user.pass,salt,function (err,hash)  会报错：没有callback

源代码需要progress,这样就不会报错bcrypt.hash(user.pass,salt,'',function (err,hash)

制造error错误环境变量问题：windows下用set ERROR_ROUTE=1; 这样总是不成功。如果用的webstrom，则在envionment variables选项增加 ERROR_ROUTE = 1


<a href="http://www.w3cfuns.com/house/36058.html" target="_blank">这是我的博客</a>