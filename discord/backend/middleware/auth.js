const jwt = require("jsonwebtoken");
const config = process.env;

const verifyToken = (req, res, next) => {
  let token = req.body.token || req.query.token || req.headers["authorization"];
  if (!token) res.status(403).send("token is required for authentication");
  try {
    token = token.replace(/^Bearer\s+/, "");
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (error) {
    return res.status(401).send("Invalid token");
  }

  return next();
};

module.exports = verifyToken;
