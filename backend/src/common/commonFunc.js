// Add common methods that are used in many places here
const exp = require("constants");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  //generate token
  const token = jwt.sign(
    { Username: user.Username, Type: user.Type },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
  return token;
};

module.exports = { generateToken };
