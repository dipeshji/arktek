const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const user = require('../model/login');

passport.use(new GoogleStrategy({
    clientID: keys.clientId,
    clientSecret: keys.clientSecret,
    callbackURL: '/auth/google/callback'
},
    function (token, tokenSecret, profile, cb) {
        user.findOne({ authtoken: profile.id })
            .then((existingUser) => {
                if (!existingUser) {
                    new user({ authtoken: profile.id, userName: profile.displayName }).save()
                        .then((gotuser) => {
                            return cb(null, gotuser)
                        })
                } else {
                    return cb(null, existingUser)
                }
            });
    }
));

passport.serializeUser(function (user, done) {
    done(null, user);
});