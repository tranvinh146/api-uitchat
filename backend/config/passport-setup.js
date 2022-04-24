import passport from 'passport';
import passportFacebook from 'passport-facebook';
import User from '../models/User.js';
import dotenv from 'dotenv';

export default function () {
    dotenv.config();

    const FacebookStrategy = passportFacebook.Strategy;
    
    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: "http://localhost:3000/api/v1/uitchat/auth/facebook/callback"
        },
        function(accessToken, refreshToken, profile, cb) {
          User.findOrCreate({ facebookId: profile.id }, function (err, user) {
            console.log(user)
            return cb(err, user);
          });
        }
    ));
}