window 使用bcrypt

用nodejs稳定版，最好版本稍低一点 如：4.x

将原先 npm install bcrypt 改为 npm install bcrypt-nodejs

运行时 bcrypt.hash(user.pass,salt,function (err,hash)  会报错：没有callback

源代码需要progress,这样就不会报错bcrypt.hash(user.pass,salt,'',function (err,hash)