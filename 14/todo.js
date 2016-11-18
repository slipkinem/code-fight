/**
 * Created by slipkinem on 2016/11/15.
 */

function Todo() {
    this.todo = [];
}

Todo.prototype.add = function (item) {
    if (!item) throw new Error('item is not defined');

    this.todo.push(item);
};

Todo.prototype.deleteAll = function () {
    this.todo = [];
};

Todo.prototype.getContent = function () {
    return this.todo.length;
};

Todo.prototype.doAsync = function (cb) {
  setTimeout(cb,2000,true);
};

module.exports = Todo;