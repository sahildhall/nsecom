var express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    Account = require('../model/user'),
	mongoose = require('mongoose');

router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/signup', function(req, res){
    res.render('signup');
});

router.post('/signup', function(req, res) {
    try {
        Account.register(new Account({username: req.body.username}), req.body.password, function (err, account) {
            if (err) {
                return res.render('signup', {account: account});
            }

            passport.authenticate('local')(req, res, function () {
                res.redirect('/login');
            });
        });
    }
    catch(e){console.log(e)}
});

router.get('/login', function(req, res){
    res.render('login');
});
router.get('/logout', function(req, res) {
    req.session.userName='';
    req.logout();
    res.redirect('/nsecomm/home');
});


router.post('/login', function(req, res) {
    function validateUserInfo()
        {
        try {

/*            var milliseconds = 3500;
            var start = new Date().getTime();
            for (var i = 0; i < 1e7; i++) {
                if ((new Date().getTime() - start) > milliseconds){
                    break;
                }
            }*/
            mongoose.model('EmployeSchema').create({
                name : 'user1',
                age : 45
            }, function (err, blob) {
                if (err) {
                    res.send("There was a problem adding the information to the database.");
                } else {
                    //Blob has been created
                    //console.log('POST creating new blob: ' + blob);
                    try{
                        mongoose.model('EmployeSchema').findById(blob.id,function(err,blob)
                        {
                            if(err)
                            {
                                res.send("There was a problem adding the information to the database.");
                            }
                            if(blob)
                            {
                                try {
                                    mongoose.model('EmployeSchema').remove(blob, function (err) {
                                        if (err)
                                            res.send("There was a problem adding the information to the database.");

                                    })
                                }
                                catch(e){console.log(e)}
                            }
                        })
                    }
                    catch(e){console.log(e)}
                }
            })
            passport.authenticate('local', function (err, user, info) {
                try {
                    if (err) {
                        return next(err);
                    }
                    // Redirect if it fails
                    if (!user) {
                        return res.redirect('/login');
                    }

                    req.session.userName = user;
                    return res.redirect('/nsecomm/home');
                    //res.redirect('/nsecomm/home');
                }
                catch(e){console.log(e)}
            })
            (req, res);
        }catch(e){console.log(e)}
    }
    validateUserInfo();
});


module.exports = router;
