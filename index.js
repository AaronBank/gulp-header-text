/*
 * @Author: Aaron
 * @Date: 2020-02-23 23:17:38
 * @LastEditors: Aaron
 * @LastEditTime: 2020-02-24 00:18:40
 * @Description: file content
 */

 // 引入插件需要的包
 var through = require('through2');

 module.exports = function(prefix = "") {
    var stream = through.obj(function(file, encoding, callback){
        if(!file.isBuffer()) return callback();

        const originalText = file.contents.toString()
        const expr = new RegExp(prefix);
        const isExisted = expr.test(originalText)

        if (!isExisted) {
            prefix = new Buffer(prefix);
            file.contents = Buffer.concat([prefix, file.contents]);
        }

        this.push(file);

        callback();
    });

    return stream;
};
 