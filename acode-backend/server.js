require("dotenv").config(); // Load environment variables
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "acode_db",
});

// Secret Key JWT
const JWT_SECRET = process.env.JWT_SECRET || "default_secret_key";

// Middleware untuk verifikasi admin
const verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Akses ditolak" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== "admin")
      return res
        .status(403)
        .json({ message: "Hanya admin yang bisa mengakses" });

    req.admin = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: "Token tidak valid" });
  }
};

// ========================= AUTH USER ========================= //

// Register User
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Semua field harus diisi" });
  }

  try {
    const [existingUser] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    if (existingUser.length > 0) {
      return res.status(400).json({ message: "Email sudah terdaftar" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );

    res.status(201).json({ message: "Registrasi berhasil, silakan login" });
  } catch (err) {
    res.status(500).json({ message: "Registrasi gagal" });
  }
});

// Login User
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const [users] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (users.length === 0)
      return res.status(400).json({ message: "Email tidak ditemukan" });

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Password salah" });

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "Login berhasil", token });
  } catch (err) {
    res.status(500).json({ message: "Login gagal" });
  }
});

// ========================= AUTH ADMIN ========================= //

// Register Admin
app.post("/admin/register", async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await db.query(
      "INSERT INTO admins (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );
    res.json({ message: "Admin berhasil didaftarkan!" });
  } catch (error) {
    res.status(500).json({ message: "Gagal mendaftarkan admin" });
  }
});

// Login Admin
app.post("/admin/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const [admins] = await db.query("SELECT * FROM admins WHERE email = ?", [
      email,
    ]);
    if (admins.length === 0)
      return res.status(401).json({ message: "Email tidak ditemukan" });

    const isMatch = await bcrypt.compare(password, admins[0].password);
    if (!isMatch) return res.status(401).json({ message: "Password salah" });

    const token = jwt.sign({ id: admins[0].id, role: "admin" }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Gagal login admin" });
  }
});

// ========================= CRUD USERS (Hanya Admin) ========================= //

// Ambil semua users
app.get("/users", verifyAdmin, async (req, res) => {
  try {
    const [users] = await db.query("SELECT id, name, email FROM users");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Gagal mengambil data users" });
  }
});

// Tambah user baru
app.post("/users", verifyAdmin, async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await db.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );
    res.json({ message: "User berhasil ditambahkan!" });
  } catch (err) {
    res.status(500).json({ message: "Gagal menambahkan user" });
  }
});

// Edit user
app.put("/users/:id", verifyAdmin, async (req, res) => {
  const { name, email } = req.body;

  try {
    await db.query("UPDATE users SET name = ?, email = ? WHERE id = ?", [
      name,
      email,
      req.params.id,
    ]);
    res.json({ message: "User berhasil diperbarui!" });
  } catch (err) {
    res.status(500).json({ message: "Gagal memperbarui user" });
  }
});

// Hapus user
app.delete("/users/:id", verifyAdmin, async (req, res) => {
  try {
    await db.query("DELETE FROM users WHERE id = ?", [req.params.id]);
    res.json({ message: "User berhasil dihapus!" });
  } catch (err) {
    res.status(500).json({ message: "Gagal menghapus user" });
  }
});

// ========================= JALANKAN SERVER ========================= //
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
