import passport from "passport";
import dotenv from "dotenv";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.js";

dotenv.config();

console.log("Google Client ID:", process.env.GOOGLE_CLIENT_ID);
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
},
async (accessToken, refreshToken, profile, done) => {
    try {
        console.log("Profile:", profile);
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
            user = new User({
                googleId: profile.id,
                user_name: profile.displayName,
                email: profile.emails[0].value,
            });
            await user.save();
        }else if (!user.googleId) {
            // If user exists but doesn't have Google ID, update it
            user.googleId = profile.id;
            await user.save();
        }

        user.incrementLoginCount();

        return done(null, user);
    } catch (error) {
        return done(error, null);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});

export default passport;
