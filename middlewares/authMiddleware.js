const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  console.log(req.cookies) 
  const token = req?.cookies?.authToken;
  console.log("BE")
  console.log({token})
  console.log("after")
  if (!token) {
    return res.status(401).json({
      message: "Access denied. No token provided.",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log({decoded})
    req.userId = decoded.userId; 
    console.log({req})
    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid token" });
  }
};
module.exports = { authMiddleware };
