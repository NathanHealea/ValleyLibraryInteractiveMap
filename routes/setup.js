var express = require('express');
var router = express.Router();
var encrypt  =  require('../classes/encrypt');
var fs = require('fs');

var config = {
    'login': {
        'username': null,
        'password': null
    },
    'database': {
        'host': null,
        'name': null,
        'username': null,
        'password': null
    },
    'salt': null
};

/* GET setup index page. */
router.get('/', function (req, res, next) {
    res.render('setup/index', {title: 'Express'});
});

/* POST setup index page. */
router.post('/', function (req, res, next) {
    var salt = encrypt.genSalt(16);
    config['login']['username'] = encrypt.hash(req.body.masterUsername, salt);
    config['login']['password'] = encrypt.hash( req.body.masterPassword, salt);
    config['database']['host'] = req.body.dbHost;
    config['database']['name'] = req.body.dbName;
    config['database']['username'] = encrypt.hash(req.body.dbUsername, salt);
    config['database']['password'] = encrypt.hash( req.body.dbPassword, salt);
    config['salt'] = salt;

    fs.writeFile('config/config.json', JSON.stringify(config));

    res.json(JSON.stringify(true));
    // res.render('home/index', { title: 'Express' });

});


module.exports = router;
