const express = require("express");
const { getCourses } = require("../controllers/courseController");
const { authenticate } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/courses", authenticate, getCourses);

module.exports = router;
