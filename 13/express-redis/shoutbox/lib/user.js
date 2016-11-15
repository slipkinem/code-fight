/**
 * Created by slipkinem on 2016/11/14.
 */

const redis = require('redis');
const bcrypt = require('bcrypt-nodejs');
const db = redis.createClient();

module.exports = User;

module.exports = function (req, res, next) {
    if (req.remoteUser) {
        res.locals.user = req.remoteUser;
    }
    var uid = req.session.uid;
    if (!uid) return next();
    User.get(uid,function (err, user) {
        if (err) return next(err);
        req.user = req.locals.user = user;
        next();
    })
};

function User(obj) {
    for (var index in obj) {
        this[index] = obj[index];
    }
}

User.prototype.save = function (fn) {
    if (this.id) {
        this.update(fn);
    } else {
        var user = this;
        db.incr('user:ids',function (err, id) {
            if (err) return fn(err);

            user.id = id;

            user.hashPassword(function (err) {
                if (err) return fn(err);

                user.update(fn);
            })
        })
    }
};

User.prototype.update = function (fn) {
    var user = this;
    var id = user.id;
    db.set('user:id:' + user.name,id,function (err) {
        if (err) return fn(err);

        db.hmset('user:' + id,user,function (err) {
            fn(err);
        });
    });
};

User.prototype.hashPassword = function (fn) {
    var user = this;
    /**
     * 加盐
     */
    bcrypt.genSalt(12,function (err, salt) {
        if (err) return fn(err);

        user.salt = salt;
        bcrypt.hash(user.pass,salt,'',function (err,hash) {
            if(err) return fn(err);

            user.pass = hash;
            fn();
        })
    })
};

User.prototype.toJSON = function () {
    return {
        id:this.id,
        name:this.name
    }
};

User.getByName = function (name, fn) {
    User.getId(name,function (err, id) {
        if (err) return fn(err);

        User.get(id,fn);
    })
};

User.getId = function (name, fn) {
    db.get('user:id:' + name,fn);
};

User.get = function (id, fn) {
    db.hgetall('user:' + id,function (err, user) {
        if (err) return fn(err);

        fn(null,new User(user));
    })
};
/**
 * 认证名称和密码
 * @param name
 * @param pass
 * @param fn
 */
User.authenticate = function (name, pass, fn) {
    User.getByName(name,function (err, user) {
        if (err) return fn(err);

        if(!user.id) return fn();

        bcrypt.hash(pass,user.salt,'',function (err,hash) {
            if (err) return fn(err);

            if (hash == user.pass) return fn(null,user);
            fn();
        })
    })
};