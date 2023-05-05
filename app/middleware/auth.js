const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authentication =
      req.body.token || req.query.token || req.headers["authorization"];
  
    if (!authentication) {
        console.log(req.headers);
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const token = authentication.split(" ");
        const decoded = jwt.verify(token[1], process.env.JWT_SECRET);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
  };
  
  module.exports = verifyToken;