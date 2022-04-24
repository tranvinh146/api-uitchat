import passport from 'passport';

export async function passportFacebookAuthenticate(req, res, next) {
    passport.authenticate('facebook');
}

export async function passportFacebookAuthenticateCallback(req, res, next) {
    passport.authenticate("facebook", {
        successRedirect: "/auth/facebook/success",
        failureRedirect: "/auth/facebook/failed"
    })
}