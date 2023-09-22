const jwt = require("jsonwebtoken");
const { TokenErrors, GenericErrors } = require("../utils/errorsMessage");

exports.authenticate = (roles = []) => {
  return (req, res, next) => {
    const token = req.header("Authorization");
    const jwtSecret = process.env.JWT_SECRET;

    if (!token) {
      return res.status(401).json({ message: TokenErrors.TokenNotFound });
    }

    try {
      const decoded = jwt.verify(token, jwtSecret);
      req.user = decoded.user;
      if (roles.length > 0 && !roles.includes(req.user.role)) {
        console.log(req.user);
        return res.status(403).json({ message: GenericErrors.RolDenied });
      }

      next();
    } catch (error) {
      res.status(401).json({ message: TokenErrors.TokenInvalid });
    }
  };
};
