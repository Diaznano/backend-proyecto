const { UserErrors, GenericErrors } = require("../utils/errorsMessage");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/User");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const jwtSecret = process.env.JWT_SECRET;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: UserErrors.MissingCredentials });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: UserErrors.InvalidCredentials });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: UserErrors.InvalidCredentials });
    }

    delete user.dataValues.password;

    const token = jwt.sign({ userId: user.id }, jwtSecret, {
      expiresIn: process.env.EXPIRESIN,
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: GenericErrors.ServerError });
  }
};
