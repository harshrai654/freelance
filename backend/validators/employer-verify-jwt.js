const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const regex = new RegExp("/project/(.)*");
  if (req.originalUrl === "/projects" || regex.test(req.originalUrl) === true) {
    return next();
  }

  let token = req.header("Authorization");
  token = token.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Access denied!" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (verified.type !== "employer")
      return res.status(401).json({ error: "Access denied!" });
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: "Token is not valid" });
  }
};

module.exports = verifyToken;
