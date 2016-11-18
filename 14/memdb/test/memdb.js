/**
 * Created by slipkinem on 2016/11/16.
 */

var memdb = require('..');
var assert = require('assert');

// describe('memdb',function () {
//
//     describe('.save(doc)',function () {
//         it ('should save the document',function () {
//             var pet = {name:'Tobi'};
//             memdb.save(pet);
//             var ret = memdb.first({name:'Tobi'});
//             assert(ret == pet);
//         })
//     })
// });

// describe('memdb',function () {
//     beforeEach(function () {
//         memdb.clear();
//     });
//
//     describe('.first(obj)',function () {
//         it ('should return the first matching doc',function () {
//             var toci = {name:'tobi'};
//             var tobi = {name:'toci'};
//
//             memdb.save(toci);
//             memdb.save(tobi);
//
//             var ret = memdb.first({name:'tobi'});
//             assert(ret == toci);
//
//             var res = memdb.first({name:'tocu'});
//             assert(res == tobi);
//         });
//         it ('should return null when no doc matches',function () {
//             var ret = memdb.first({name:'Manny'});
//
//             assert(ret == null);
//         })
//
//     })
//
// });

/**
 * 异步测试
 */
describe('.save(doc)',function () {
    it ('should save the document',function (done) {
        var pet = {name:'ls'};
        memdb.save(pet,function () {
            var ret = memdb.first({name:'ls'});
            assert(ret == pet);
            done();
        })
    })
});