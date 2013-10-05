var passport = require('passport');
var GoogleStrategy = require('passport-google').Strategy;
var googlePaths = {};
var userAuth = require('../auth/userAuth');
var config = require('../config.json');

if (config.development) {
	googlePaths.returnURL = 'http://localhost:3000/auth/google/return';
	googlePaths.realm = 'http://localhost:3000/';
} else {
	googlePaths.returnURL = 'http://obiechat.com/auth/google/return';
	googlePaths.realm = 'http://obiechat.com/';
}


module.exports = function(app) {
	var User = app.db.User;
	passport.use(new GoogleStrategy(googlePaths, function(identifier, profile, done) {
		User.findOrCreateByGoogleEmail(profile, function(err, user) {
			if (err) {
				return done(null, false, { message: 'Not allowed access'});
			}
			if (!user) {
				return done(null, false, { message: 'Something went wrong'});
			}
			done(null, user);
		});
	}));

	passport.serializeUser(function(user, done) {
		done(null, user._id);
	});

	passport.deserializeUser(function(_id, done) {
		User.findOne({_id: _id}, function(err, user) {
			done(err, user);
		});
	});


	/*
	 * Routes!
	 */

	app.get('/auth/google', passport.authenticate('google'));

	app.get('/auth/google/return', passport.authenticate('google', { 
		successRedirect: '/',
		failureRedirect: '/splash'
	}));

	app.get('/signOut', userAuth.signedIn, function(req, res) {
		req.session.destroy();
		res.redirect('/splash');
	});
};
