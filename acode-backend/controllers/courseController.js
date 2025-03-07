const { getAllCourses } = require("../models/courseModel");

const getCourses = async (req, res) => {
  try {
    const courses = await getAllCourses();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil kursus" });
  }
};

module.exports = { getCourses };
