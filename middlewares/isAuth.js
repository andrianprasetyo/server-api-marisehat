require("dotenv").config();
const jwt = require("jsonwebtoken");

const isAuth = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    res.status(401).json({ message: "Not authenticated" });
    return res.redirect("/signin");
  }
  const token = authHeader.split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
    return res.redirect("/signin");
  }
  if (!decodedToken) {
    res.status(401).json({ message: "Not authenticated" });
    return res.redirect("/signin");
  }
  req.userId = decodedToken.userId;
  next();
};

module.exports = { isAuth };
