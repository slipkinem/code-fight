/**
 * Created by slipkinem on 2016/11/15.
 */

const assert = require('assert');
var Todo = require('./todo');
var todo = new Todo();
var testTemplate = 0;

function deleteTest() {
    todo.add('delete me');
    assert.equal(todo.getContent(),1,'1 item should exist');
    todo.deleteAll();
    assert.equal(todo.getContent(),0,'no items should exist');
    testTemplate++;
}

function addtest() {
    todo.deleteAll();
    todo.add('test');
    assert.notEqual(todo.getContent(),0,'1 items should exist');
    testTemplate++;
}

function doAsyncTest(cb) {
    todo.doAsync(function (value) {
        assert.ok(value,'callback should be passed ture');
        testTemplate++;
        cb();
    })
}

function throwTest(cb) {
    assert.throws(todo.add,/requires/);
    testTemplate++;
}

deleteTest();
addtest();
throwTest();
doAsyncTest(function () {
    console.log('Complated' + testTemplate + 'tests' );
});