/**
 * Created by slipkinem on 2016/11/16.
 */

exports.testPony = function (test) {
    test.expect(2);
    if (false) {
        test.ok(false,'This should not have passed');
    }
    test.ok(true,'This should have passed');
    test.equal(count,2,'not all assertions triggered.');
    test.done();
};