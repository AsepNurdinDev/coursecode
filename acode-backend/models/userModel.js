const db = require("../config/database");

const findUserByEmail = async (email) => {
  const [users] = await db.query("SELECT * FROM users WHERE email = ?", [
    email,
  ]);
  return users[0];
};

const createUser = async (name, email, password) => {
  await db.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [
    name,
    email,
    password,
  ]);
};

module.exports = { findUserByEmail, createUser };
