const jwt = require("jsonwebtoken");

// generate a jwt token to send to frontend when user logs in
const generateToken = (user) => {
  //generate token
  const token = jwt.sign(
    { Username: user.Username, id: user._id, Type: user.Type },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
  return token;
};

module.exports = generateToken;
