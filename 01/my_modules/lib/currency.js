/**
 * Created by slipkinem on 2016/11/4.
 */
// var canadianDollelr = 0.91;
//
// function roundTwoDecimals(amount) {
//     return Math.round(amount * 100) / 100;
// }
//
// exports.canadianToUs = function (canadian) {
//     return roundTwoDecimals(canadian * canadianDollelr);
// };
//
// exports.UsToCanadian = function (us) {
//     return roundTwoDecimals(us / canadianDollelr);
// };

var Currency = function (canadianDoller) {
    this.candianDoller = canadianDoller;  //
};

Currency.prototype.roundTwoDecimals = function (amount) {
    return Math.round(amount * 100) / 100; //四舍五入
};

Currency.prototype.canadianToUs = function (canadian) {
    return this.roundTwoDecimals(canadian * this.candianDoller);
};

Currency.prototype.UsToCanadian = function (us) {
    return this.roundTwoDecimals(us / this.candianDoller);
};

module.exports = Currency;