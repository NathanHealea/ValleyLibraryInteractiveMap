var express = require('express');
var router = express.Router();
var user = require('../models/user');
/* GET users listing. */
/*router.get('/', function(req, res, next) {
 res.send('respond with a resource');
 });*/

/* GET user login */
router.get('/login', function (req, res, next) {
    res.render('user/login');
});

/* POST user login */
router.post('/login', function (req, res, next) {

    // testing
    console.log('post/login - username: ' + req.body.username);
    console.log('post/login - password: ' + req.body.password);

    user.openconfig();
    var isAuthenticated = false;
    isAuthenticated = user.authenticate(req.body.username, req.body.password);
    console.log(isAuthenticated);
    if (isAuthenticated) {
        req.session.isAuthenticated = true;
    }
    res.contentType('json');
    res.json(JSON.stringify(isAuthenticated));


});

/*router.post('/login', function (req, res, next) {
 // testing
 console.log('post/login - username: ' + req.body.username);
 console.log('post/login - password: ' + req.body.password);

 user.openconfig();
 var isAuthenticated = false;
 isAuthenticated = user.authenticate(req.body.username, req.body.password);
 console.log(isAuthenticated);

 if (isAuthenticated) {
 req.session.isAuthenticated = true;
 res.redirect('/dashboard');
 } else {
 req.flash('error', 'Username and password are incorrect');
 res.redirect('/login');
 }

 });*/

module.exports = router;
