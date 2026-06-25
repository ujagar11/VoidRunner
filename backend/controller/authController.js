const AuthUser = require("../model/authUser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const register = async (req, res) => {
  const { userName, email, password } = req.body;

  if (!userName || !email || !password) {
    return res.status(400).json({ message: "all fields are required" });
  }

  const existingUser = await AuthUser.findOne({ email });
  if (existingUser) {
    return res.status(401).json({ message: "user found", existingUser });
  }

  const hashPassword = bcrypt.hashSync(password, 10);

  const user = await AuthUser.create({
    userName,
    email,
    password: hashPassword,
  });

  const token = jwt.sign({ id: user._id, email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  user.password = undefined;
  return res.status(201).json({ message: "user created", user, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await AuthUser.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "user not found" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({
      message: "Invalid password",
    });
  }

  const token = jwt.sign({ id: user._id, email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  user.password = undefined;
  res.status(200).json({ message: "Login successful", user, token });
};

module.exports = { register, login };
