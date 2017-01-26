/**
 * Description:
 *  handles encrypting data .
 */

var crypto  = require('crypto');
var fs = require('fs');
var crypType = 'sha512';

/**
 * Encrypts data with a given salt.
 * @param data
 * @param salt
 * @returns {*}
 */
exports.hash = function(data, salt){
    var hash = crypto.createHash(crypType, salt);
    hash.update(data);
    var value = hash.digest('hex');

    return value;
};

/**
 * Generates a salt
 * @returns {string}
 */
exports.genSalt = function(length){
    return crypto.randomBytes(Math.ceil(length/2))
        .toString('hex') /** convert to hexadecimal format */
        .slice(0,length);   /** return required number of characters */
};

