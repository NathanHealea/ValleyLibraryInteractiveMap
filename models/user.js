/**
 * Description:
 *  handles all logic for authenticating a user and starting a session.
 */
var fs = require('fs');
var encrypt = require('../classes/encrypt');
var configFile = fs.readFileSync('./config/config.json');
var config = null;


/**
 *
 * @param userOG
 * @param passwdOG
 * @returns {boolean}
 */
exports.authenticate = function(userOG, passwdOG){
    // declaring variables
    var userCK = config['login']['username'];
    var passwdCK = config['login']['username'];
    var isMatch = false;

    // hashing inputted username and password
    userOG = encrypt.hash(userOG, config['salt']);
    passwdOG = encrypt.hash(passwdOG, config['salt']);
    // crypto.createHash('md5').update(userOG);
    // crypto.createHash('md5').update(passwdOG);

    if((userOG == userCK) && (passwdOG == passwdCK)){
        isMatch = true;
    }

    return isMatch;
};


exports.openconfig = function(){
    var jsonData = fs.readFileSync('config/config.json');
    config = JSON.parse(jsonData);
};
