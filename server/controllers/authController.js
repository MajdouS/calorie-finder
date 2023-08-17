const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.register = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
// Function to generate JWT
const generateJWT = (user) => {
    return jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
  };
  
  // Google/Facebook callback handler
  exports.socialLogin = async (token, tokenSecret, profile, done) => {
    try {
      // Check if the user exists
      let user = await User.findOne({ providerId: profile.id });
  
      if (!user) {
        // If not, create a new user
        user = new User({
          provider: profile.provider, // 'google' or 'facebook'
          providerId: profile.id,
          email: profile.emails[0].value,
          // other fields...
        });
        await user.save();
      }
  
      const jwtToken = generateJWT(user);
      done(null, { user, token: jwtToken });
    } catch (error) {
      done(error, false, error.message);
    }
  };
  
