/**
 * Created by slipkinem on 2016/11/4.
 */

var Currency = require('./lib/currency');

var currency = new Currency(0.19);

console.log(currency.canadianToUs(14));
console.log(currency.UsToCanadian(45));