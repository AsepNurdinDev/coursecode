import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../../components/Footer";
import img1 from "../courses/img/html.png";
import img2 from "../courses/img/CSS.jpg";
import img3 from "../courses/img/js.png";
import img4 from "../courses/img/React.png";
import img5 from "../courses/img/nodejs.png";
import img6 from "../courses/img/MySql.png";
import img7 from "../courses/img/PHP.png";
import img8 from "../courses/img/java.png";
import img9 from "../courses/img/python.png";

const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9];
const title = [
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "Node.js",
  "MySQL",
  "PHP",
  "Java",
  "Python",
];
const description = [
  "HTML adalah bahasa markup standar untuk membuat halaman web.",
  "CSS adalah bahasa untuk mendesain tampilan halaman web.",
  "JavaScript adalah bahasa pemrograman untuk membuat website interaktif.",
  "React adalah library JavaScript untuk membangun antarmuka pengguna.",
  "Node.js adalah runtime JavaScript berbasis Chrome V8 untuk membuat server.",
  "MySQL adalah sistem manajemen basis data relasional yang populer.",
  "PHP adalah bahasa pemrograman server-side yang populer.",
  "Java adalah bahasa pemrograman yang digunakan untuk membuat berbagai jenis aplikasi.",
  "Python adalah bahasa pemrograman yang mudah dipelajari dan kuat.",
];

const link = [
  "/html",
  "/css",
  "/javascript",
  "/react",
  "/nodejs",
  "/mysql",
  "/php",
  "/java",
  "/python",
];

const API = axios.create({
  baseURL: "http://localhost:5000",
});

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const res = await API.get("/courses", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setCourses(res.data);
      } catch (err) {
        setError("Gagal memuat kursus.");
      }
    };

    fetchCourses();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="bg-gray-100 text-white p-4 flex justify-between items-center shadow-md fixed top-0 left-0 w-full z-50 opacity-90">
        <h1 className="text-xl font-semibold text-blue-700">CodeCourses</h1>
        <div className="flex space-x-4">
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Daftar Kursus */}
      <div
        data-aos="fade-up"
        data-aos-duration="2000"
        className="container mt-24 mx-auto px-6 py-12 cursor-pointer px-auto shadow-lg"
      >
        <div className="justify-center text-center px-4">
          <h2 className="text-2xl mb-12 font-semibold cursor-default">
            Silahkan pilih kelas yang ingin kamu pelajari
          </h2>
          <h2 className="text-3xl font-bold text-red-600 mb-12 cursor-default">
            Daftar kelas
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <div
              key={index}
              onClick={() => navigate(link[index])}
              className="group relative block bg-black rounded-lg overflow-hidden"
            >
              <img
                src={image}
                alt={`Card ${index + 1}`}
                className="absolute inset-0 h-full w-full opacity-75 transition-opacity group-hover:opacity-50 object-fit-cover"
              />
              <div className="relative p-4 sm:p-6 lg:p-8">
                <p className="text-sm font-medium uppercase tracking-widest text-white">
                  {title[index]}
                </p>
                <div className="mt-32 sm:mt-48 lg:mt-64">
                  <div className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="text-sm text-white">{description[index]}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Courses;
