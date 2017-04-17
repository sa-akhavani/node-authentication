var express = require('express');
var passport = require('passport');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Index'
  });
});

// GET login page
router.get('/login', function (req, res, next) {
  res.render('login', {
    title: 'Login',
    message: req.flash('loginMessage')
  });
});

// GET signup page
router.get('/signup', function (req, res, next) {
  res.render('signup', {
    title: 'Sign Up',
    message: req.flash('signupMessage')
  });
});

// GET profile page
router.get('/profile', isLoggedIn, function (req, res, next) {
  res.render('profile', {
    title: 'Sign Up',
    user: req.user
  });
});

// GET logout
router.get('/logout', function (req, res, next) {
  res.logout();
  res.redirect('/');
});

// POST login
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: 'Invalid Username or Password'
}), function (req, res) {

  // the authenticated user is now in req.user
  console.log(req.user.username);
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next;
  res.redirect('/');
}


module.exports = router;