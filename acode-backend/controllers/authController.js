const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { findUserByEmail, createUser } = require("../models/userModel");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await findUserByEmail(email);
    if (userExists)
      return res.status(400).json({ message: "Email sudah digunakan" });

    const hashedPassword = await bcrypt.hash(password, 10);
    await createUser(name, email, hashedPassword);
    res.status(201).json({ message: "Registrasi berhasil" });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan saat register" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);
    if (!user)
      return res.status(401).json({ message: "Email tidak terdaftar" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Password salah" });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan saat login" });
  }
};

module.exports = { register, login };
