const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/userModel");
const { generateToken, generateRefreshToken } = require("../utils/tokenUtils");


const callbackURL = process.env.NODE_ENV === "production"
  ? process.env.CALLBACK_URL_PROD
  : process.env.CALLBACK_URL_DEV;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: callbackURL,
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {

        // Extract the email from the Google profile
        const email = profile.emails[0].value;


        // Check if the user exists by email
        let user = await User.findOne({ email });
        
        if (user) {
          // Log that the user already exists

          // User already exists, update the refresh token
          const newRefreshToken = generateRefreshToken(user._id);

          user = await User.findByIdAndUpdate(
            user._id,
            { refreshToken: newRefreshToken },
            { new: true }
          );

        } else {
          // Log that a new user will be created

          // Create a new user
          user = new User({
            firstname: profile.name.givenName,
            lastname: profile.name.familyName,
            email,
            provider: "google",
            mobile: undefined, // Do not set mobile if it's not provided
          });

          await user.save();

          // Log the newly created user

          // Generate a new refresh token
          const newRefreshToken = generateRefreshToken(user._id);

          user = await User.findByIdAndUpdate(
            user._id,
            { refreshToken: newRefreshToken },
            { new: true }
          );

        }

        // Generate access token
        const token = generateToken(user._id);

        // Log the generated token

        // Attach tokens to the user object
        return done(null, {
          _id: user._id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          token,
          refreshToken: user.refreshToken,
        });
      } catch (error) {
        console.error("Error in Google Strategy:", error);
        return done(error, false);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id); // Store user ID in session
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    console.error("Error deserializing user:", error);
    done(error, null);
  }
});

module.exports = passport;
