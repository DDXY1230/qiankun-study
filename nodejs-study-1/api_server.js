"use strict";
exports.__esModule = true;
// 
var express_1 = require("express");
var app = express_1["default"]();
app.get('/', function (req, res) {
    res.end('123321');
});
app.listen(8080, function () {
    console.log('服务已经开启!');
});
