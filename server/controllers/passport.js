import passport from "passport";
import googleOauth from "passport-google-oauth20";
import dotenv from "dotenv";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
dotenv.config();

const GoogleStrategy = googleOauth.Strategy;
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL } =
  process.env;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      const name = profile.displayName;
      const email = profile.emails[0]?.value;

      try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          console.log("User already registered");
          return done(null, existingUser);
        }

        const hashedPw = await bcrypt.hash(email + name + email, 10);
        const newUser = new User({
          name,
          email,
          password: hashedPw,
          avatar: profile.photos[0].value,
        });

        await newUser.save();

        return done(null, newUser);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => done(null, user._id));

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    return done(null, user);
  } catch (error) {
    return done(error);
  }
});

export default passport;
