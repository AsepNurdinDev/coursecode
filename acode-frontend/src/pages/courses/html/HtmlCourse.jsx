import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

import {
  FaBars,
  FaArrowLeft,
  FaChevronDown,
  FaHeading,
  FaParagraph,
  FaLink,
} from "react-icons/fa";

import AboutHtml from "./About/AboutHtml";

const Html = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleSubmenu = (menu) =>
    setOpenSubmenu(openSubmenu === menu ? null : menu);

  return (
    <div>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <div
          className={`${
            isOpen ? "w-64" : "w-16"
          } bg-slate-700 text-white transition-all duration-300 ease-in-out flex flex-col`}
        >
          {/* Tombol Kembali */}
          <Link
            to="/courses"
            className="p-4 flex items-center gap-2 text-white hover:bg-slate-600"
          >
            <FaArrowLeft />
            {isOpen && <span>Kembali ke Kursus</span>}
          </Link>

          {/* Tombol Sidebar */}
          <button
            onClick={toggleSidebar}
            className="p-4 text-white hover:bg-slate-600 flex items-center"
          >
            <FaBars className="text-xl" />
          </button>

          {/* Menu */}
          <ul className="mt-4 space-y-2 px-2">
            <li>
              <Link
                to="./About/AboutHtml.jsx"
                className="w-full flex items-center gap-2 text-left px-4 py-2 text-sm hover:bg-slate-600 rounded"
              >
                <FaHeading />
                {isOpen && <span>HTML</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/html/paragraph"
                className="w-full flex items-center gap-2 text-left px-4 py-2 text-sm hover:bg-slate-600 rounded"
              >
                <FaParagraph />
                {isOpen && <span>Paragraf</span>}
              </Link>
            </li>

            {/* Menu dengan Submenu */}
            <li>
              <button
                onClick={() => toggleSubmenu("link")}
                className="w-full flex items-center justify-between text-left px-4 py-2 text-sm hover:bg-slate-600 rounded"
              >
                <div className="flex items-center gap-2">
                  <FaLink />
                  {isOpen && <span>Link</span>}
                </div>
                {isOpen && (
                  <FaChevronDown
                    className={`transition-transform ${
                      openSubmenu === "link" ? "rotate-180" : ""
                    }`}
                  />
                )}
              </button>

              {/* Submenu */}
              {openSubmenu === "link" && (
                <ul
                  className={`ml-6 space-y-1 mt-1 transition-all ${
                    isOpen ? "block" : "hidden"
                  }`}
                >
                  <li>
                    <Link
                      to="/html/link"
                      className="w-full text-left px-4 py-2 text-xs hover:bg-slate-500 rounded"
                    >
                      Link Dasar
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>

        {/* Konten Utama */}
        <div className="flex-1 p-6">
          <h1 className="text-2xl font-bold text-gray-800">Materi HTML</h1>
          <Routes>
            <Route path="heading" element={<HeadingHtml />} />
            <Route
              path="*"
              element={
                <div className="p-4 bg-white rounded shadow-md border border-gray-300">
                  Pilih materi di sidebar
                </div>
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Html;
