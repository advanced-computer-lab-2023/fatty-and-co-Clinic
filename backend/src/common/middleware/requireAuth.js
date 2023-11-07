const jwt = require("jsonwebtoken");

const systemUserModel = require("../../models/systemusers");

const requireAuth = async (req, res, next) => {
  // get authorization from request header
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send({ error: "No token found, please log in" });
  }

  // get token from authorization
  const token = authorization.split(" ")[1]; // Bearer <token>

  try {
    // if token is valid, return data
    const data = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(data);
    // console.log(data.Username);
    // console.log(data.id);
    // console.log(data.Type);
    // TODO: maybe we dont actually need the whole user so we can just store username or id in req,
    // TODO: but for now we store the whole user in case we need it later
    const user = await systemUserModel.findById(data.id);
    // console.log(user);
    req.user = user; // store user data in req.user for later use
    next();
  } catch (err) {
    // if token expired or invalid then return null
    console.log("Invalid token");
    return res
      .status(401)
      .send({ error: "Token is invalid, please log in again" });
  }
};

module.exports = requireAuth;
