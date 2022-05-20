import passport from "passport";
import User from"../models/User.js";
import GoogleStrategy from "passport-google-oauth20";
import FacebookStrategy  from "passport-facebook";
import dotenv from "dotenv";
import bcrypt from "bcrypt"; 
dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    async (accessToken, refreshToken, profile, done) => {
        const email = profile.emails[0].value;
        const firstName = profile.name.givenName;
        const lastName = profile.name.familyName;
        const fullName = firstName + ' ' + lastName;
        const profilePhoto = profile.photos[0].value;
        const source = "google";
		
        const currentUser = await User.findByEmail(email);

        if (!currentUser) {
            const password = email;
            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds);
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = await User.createUser(
              email,
              password,
              fullName,
              profilePhoto
            );
            return done(null, newUser);
          }
        return done(null, currentUser);
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
    },
    async (accessToken, refreshToken, profile, done) => {
        const email = profile.emails[0].value;
        const firstName = profile.name.givenName;
        const lastName = profile.name.familyName;
        const fullName = firstName + ' ' + lastName;
        const profilePhoto = profile.photos[0].value;
        const source = "facebook";
		
        const currentUser = await User.findByEmail(email);

        if (!currentUser) {
            const password = email;
            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds);
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = await User.createUser(
              email,
              password,
              fullName,
              profilePhoto
            );
            return done(null, newUser);
          }
        return done(null, currentUser);
    }
  )
);

passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  
passport.deserializeUser(async (_id, done) => {
    const currentUser = await User.findOne({ _id });
    done(null, currentUser);
});