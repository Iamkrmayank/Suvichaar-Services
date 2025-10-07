
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase_config/config";
import { onAuthStateChanged } from "firebase/auth";
import logo from "/ContentLabs_2.png";
import { Menu, X } from "lucide-react"; // Hamburger icons

const Navbar = () => {
  const navigate = useNavigate();
  const tabs = ["Services", "Industry", "Pricing", "FAQ", "Tools"];
  const [hovered, setHovered] = useState(null);
  const [user, setUser] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false); // mobile menu state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    auth.signOut();
    navigate("/");
  };

  return (
    <nav className="w-full bg-white shadow-md px-6 py-4 flex items-center justify-between relative">
      {/* Left - Logo */}
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => navigate("/home")}
      >
        <img src={logo} alt="Logo" className="h-14 w-auto" />
      </div>

      {/* Center - Tabs (hidden on small screens) */}
      <div className="flex-1 justify-center hidden md:flex">
        <ul className="flex items-center gap-8 text-gray-700 font-medium">
          {tabs.map((tab, idx) => (
            <li
              key={idx}
              className="relative"
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
            >
              <Link to={`/${tab.toLowerCase()}`} className="relative px-1">
                {tab}
                <span
                  className={`absolute left-0 -bottom-1 h-[2px] bg-[#E6A24B] 
                    ${hovered === idx ? "w-full transition-all duration-300" : "w-0 transition-all duration-300"}`}
                ></span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Right - Auth Buttons (hidden on small screens) */}
      <div className="hidden md:flex items-center gap-4">
        {user ? (
          <button
            onClick={handleLogout}
            className="bg-[#E6A24B] hover:bg-[#d68d32] text-white px-4 py-2 rounded-lg shadow-md"
          >
            Logout
          </button>
        ) : (
          <>
            <Link
              to="/login"
              className="border border-[#E6A24B] text-[#E6A24B] hover:bg-[#E6A24B] hover:text-white px-4 py-2 rounded-lg transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-[#E6A24B] hover:bg-[#d68d32] text-white px-4 py-2 rounded-lg shadow-md"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>

      {/* Mobile Hamburger Menu Button */}
      <div className="md:hidden flex items-center">
        <button onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md md:hidden z-50">
          <ul className="flex flex-col gap-4 p-4 text-gray-700 font-medium">
            {tabs.map((tab, idx) => (
              <li key={idx}>
                <Link
                  to={`/${tab.toLowerCase()}`}
                  className="block w-full px-2 py-2 hover:bg-[#F9F5F0] rounded"
                  onClick={() => setMobileOpen(false)} // close menu on click
                >
                  {tab}
                </Link>
              </li>
            ))}
            <li className="border-t border-gray-200 mt-2 pt-2">
              {user ? (
                <button
                  onClick={handleLogout}
                  className="w-full bg-[#E6A24B] hover:bg-[#d68d32] text-white px-4 py-2 rounded-lg shadow-md"
                >
                  Logout
                </button>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link
                    to="/login"
                    className="border border-[#E6A24B] text-[#E6A24B] hover:bg-[#E6A24B] hover:text-white px-4 py-2 rounded-lg text-center"
                    onClick={() => setMobileOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-[#E6A24B] hover:bg-[#d68d32] text-white px-4 py-2 rounded-lg shadow-md text-center"
                    onClick={() => setMobileOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
