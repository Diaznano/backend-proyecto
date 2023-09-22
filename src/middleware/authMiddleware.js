const jwt = require("jsonwebtoken");
const { TokenErrors } = require("../utils/errorsMessage");

exports.authenticate = (req, res, next) => {
  const token = req.header("Authorization");
  const jwtSecret = process.env.JWT_SECRET;

  if (!token) {
    return res.status(401).json({ message: TokenErrors.TokenNotFound });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: TokenErrors.TokenInvalid });
  }
};
