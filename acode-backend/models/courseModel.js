const db = require("../config/database");

const getAllCourses = async () => {
  const [courses] = await db.query("SELECT * FROM courses");
  return courses;
};

module.exports = { getAllCourses };
