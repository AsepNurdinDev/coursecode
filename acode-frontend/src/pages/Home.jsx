import { Link } from "react-router-dom";
import img1 from "../assets/html.png";
import img2 from "../assets/CSS.jpg";
import img3 from "../assets/js.png";
import img4 from "../assets/React.png";
import img5 from "../assets/nodejs.png";
import img6 from "../assets/MySql.png";

const images = [img1, img2, img3, img4, img5, img6];
const title = ["HTML", "CSS", "JavaScript", "React", "Node.js", "MySQL"];
const description = [
  "HTML adalah bahasa markup standar untuk membuat halaman web.",
  "CSS adalah bahasa untuk mendesain tampilan halaman web.",
  "JavaScript adalah bahasa pemrograman untuk membuat website interaktif.",
  "React adalah library JavaScript untuk membangun antarmuka pengguna.",
  "Node.js adalah runtime JavaScript berbasis Chrome V8 untuk membuat server.",
  "MySQL adalah sistem manajemen basis data relasional yang populer.",
];

const Home = () => {
  return (
    <div

      className="min-h-screen flex flex-col bg-gray-200"
    >
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-slate-100 shadow-md py-4 px-6 flex justify-between items-center z-50 opacity-90">
        <h1 className="text-2xl font-bold text-blue-600">CC</h1>
        <div className="space-x-4">
          <Link
            to="/register"
            className="bg-blue-800 text-white px-4 py-2 rounded-lg"
          >
            Register
          </Link>
          <Link
            to="/login"
            className="bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            Login
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div
        data-aos="fade-up"
        data-aos-duration="1000"
        className="flex flex-col items-center justify-center text-center px-4 mt-44"
      >
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Selamat Datang di <span className="text-blue-600">CourseCode</span>
        </h2>
        <p className="text-lg text-gray-600 mb-6 max-w-lg">
          Pilih kursus coding favoritmu dan mulai belajar sekarang!
        </p>
        <div className="space-x-4 mt-8">
          <Link
            to="/register"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 transform hover:scale-105"
          >
            Mulai Belajar
          </Link>
        </div>
        <div className="text-center mt-11 cursor-auto font-bold text-2xl text-red-600">
          <h2>Pilih Kelas yang ingin dipelajari 👇</h2>
        </div>
      </div>

      {/* Card Section */}
      <div className="container mt-52 mx-auto px-6 py-12 cursor-pointer px-auto shadow-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <div
              key={index}
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
      <div className="space-x-4 mt-8 justify-center text-center mb-16">
        <Link
          to="/login"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 transform hover:scale-105"
        >
          Mulai Belajar Sekarang
        </Link>
      </div>
      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-4 mt-auto">
        &copy; {new Date().getFullYear()} Acode - Belajar Coding Mudah &
        Menyenangkan
      </footer>
    </div>
  );
};

export default Home;
