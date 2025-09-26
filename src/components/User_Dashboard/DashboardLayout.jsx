
import { Link, Outlet, useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase_config/config";
import { useEffect, useState, useRef } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { signOut } from "firebase/auth";
import {
  Home as HomeIcon,
  Repeat,
  LogOut,
  Settings,
  FileText,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  ScanText,
  CreditCard,
  Menu as MenuIcon,
  X as XIcon,
} from "lucide-react";
import logo from "/ContentLabs_2.png";
import logoIcon from "/Contentlabs2.png";

function DashboardLayout() {
  const [userDetails, setUserDetails] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [showMobileHeader, setShowMobileHeader] = useState(true);
  const navigate = useNavigate();
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const userRef = doc(db, "Users", user.uid);
        const unsubSnap = onSnapshot(userRef, (snap) => {
          if (snap.exists()) {
            setUserDetails(snap.data());
          } else {
            setUserDetails({
              email: user.email,
              displayName: user.displayName || "",
              photoURL: user.photoURL || "",
            });
          }
        });
        return () => unsubSnap();
      } else {
        setUserDetails(null);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const scrollingUp = prevScrollPos > currentScrollPos;

      setShowMobileHeader(scrollingUp || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  const handleLogout = async () => {
    await signOut(auth);
    setUserDetails(null);
    navigate("/");
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const handleLinkClick = () => {
    setShowMobileMenu(false);
  };

  useEffect(() => {
    if (showMobileMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showMobileMenu]);

return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Desktop Sidebar (visible on md screens and up) */}
      <aside
        className={`${
          isCollapsed ? "w-20" : "w-64"
        } hidden md:flex flex-col bg-white shadow-lg text-black transition-all duration-300 fixed inset-y-0 left-0 h-screen z-50`}
      >
        {/* Logo + Collapse Button */}
        <div className="flex items-center justify-between h-20 px-4 border-b border-gray-200">
          {isCollapsed ? (
            <img src={logoIcon} alt="Logo small" className="h-12 w-auto" />
          ) : (
            <div className="flex items-center justify-center h-16 px-8">
              <img src={logo} alt="Logo" className="h-20 w-auto" />
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 rounded hover:bg-gray-100"
          >
            {isCollapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <ChevronLeft className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
          <Link
            to="/dashboard"
            className={`flex items-center py-2 rounded-lg hover:bg-gray-100 ${
              isCollapsed ? "justify-center" : "px-3"
            }`}
          >
            <HomeIcon className="w-5 h-5" />
            {!isCollapsed && <span className="ml-3">Dashboard</span>}
          </Link>
          <Link
            to="/dashboard/ocr-core"
            className={`flex items-center py-2 rounded-lg hover:bg-gray-100 ${
              isCollapsed ? "justify-center" : "px-3"
            }`}
          >
            <ScanText className="w-5 h-5" />
            {!isCollapsed && <span className="ml-3">OCR Core</span>}
          </Link>
          <Link
            to="/dashboard/ocr-advance"
            className={`flex items-center py-2 rounded-lg hover:bg-gray-100 ${
              isCollapsed ? "justify-center" : "px-3"
            }`}
          >
            <Repeat className="w-5 h-5" />
            {!isCollapsed && <span className="ml-3">OCR Advanced</span>}
          </Link>
        </nav>

        {userDetails && (
          <div className="flex flex-col p-2 border-t border-gray-200 gap-2">
            <Link
              to="/dashboard/terms/view"
              className={`flex items-center py-2 rounded-lg hover:bg-gray-100 ${
                isCollapsed ? "justify-center" : "px-3"
              }`}
            >
              <FileText className="w-5 h-5" />
              {!isCollapsed && <span className="ml-3">Terms & Conditions</span>}
            </Link>
            <Link
              to="/dashboard/credits"
              className={`flex items-center py-2 rounded-lg hover:bg-gray-100 ${
                isCollapsed ? "justify-center" : "px-3"
              }`}
            >
              <CreditCard className="w-5 h-5" />
              {!isCollapsed && <span className="ml-3">Credits</span>}
            </Link>
            <Link
              to="/dashboard/support"
              className={`flex items-center py-2 rounded-lg hover:bg-gray-100 ${
                isCollapsed ? "justify-center" : "px-3"
              }`}
            >
              <HelpCircle className="w-5 h-5" />
              {!isCollapsed && <span className="ml-3">Support</span>}
            </Link>
            <Link
              to="/dashboard/settings"
              className={`flex items-center py-2 rounded-lg hover:bg-gray-100 ${
                isCollapsed ? "justify-center" : "px-3"
              }`}
            >
              <Settings className="w-5 h-5" />
              {!isCollapsed && <span className="ml-3">Settings</span>}
            </Link>
            <button
              onClick={() => setShowConfirm(true)}
              className={`flex items-center py-2 rounded-lg hover:bg-gray-100 ${
                isCollapsed ? "justify-center" : "px-3"
              }`}
            >
              <LogOut className="w-5 h-5" />
              {!isCollapsed && <span className="ml-3">Logout</span>}
            </button>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main
        className={`flex-1 overflow-y-auto relative ${
          isCollapsed ? "md:ml-20" : "md:ml-64"
        }`}
      >
        {/* Mobile Header (visible on screens less than md) */}
        <div
          className={`md:hidden flex items-center justify-between px-4 py-2 bg-white shadow-sm fixed top-0 left-0 right-0 z-40 transition-transform duration-300 ${
            showMobileHeader ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <button
            onClick={toggleMobileMenu}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <MenuIcon className="w-6 h-6 text-gray-800" />
          </button>
          <img src={logo} alt="Logo" className="h-16 w-auto" />
          {userDetails ? (
            <div className="w-8 h-8 rounded-full border border-[#E6A24B] overflow-hidden flex items-center justify-center bg-white">
              {userDetails?.photoURL ? (
                <img
                  src={userDetails.photoURL}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="w-full h-full flex items-center justify-center bg-[#E6A24B] text-sm font-bold text-white">
                  {userDetails?.firstName?.charAt(0)?.toUpperCase() ||
                    userDetails?.displayName?.charAt(0)?.toUpperCase() ||
                    "U"}
                </span>
              )}
            </div>
          ) : (
            <Link to="/login">
              <button className="px-3 py-1 text-sm bg-[#E6A24B] text-white rounded-lg hover:bg-[#d68d32]">
                Login
              </button>
            </Link>
          )}
        </div>

        {/* Main content area */}
        <div className="md:pt-0 pt-16">
          <div className="hidden md:block absolute top-5 right-5 z-50">
            {userDetails ? (
              <div className="w-12 h-12 rounded-full border border-[#E6A24B] overflow-hidden flex items-center justify-center bg-white">
                {userDetails?.photoURL ? (
                  <img
                    src={userDetails.photoURL}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="w-full h-full flex items-center justify-center bg-[#E6A24B] text-xl font-bold text-white">
                    {userDetails?.firstName?.charAt(0)?.toUpperCase() ||
                      userDetails?.displayName?.charAt(0)?.toUpperCase() ||
                      "U"}
                  </span>
                )}
              </div>
            ) : (
              <div>
                <Link to="/login">
                  <button className="px-4 py-2 bg-[#E6A24B] text-white rounded-lg hover:bg-[#d68d32]">
                    Login
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="ml-2 px-4 py-2 bg-[#E6A24B] text-white rounded-lg hover:bg-[#d68d32]">
                    Sign Up
                  </button>
                </Link>
              </div>
            )}
          </div>
          <Outlet context={{ userDetails }} />
        </div>
      </main>

      {/* Backdrop for the mobile menu */}
      {showMobileMenu && (
        <div
          onClick={toggleMobileMenu}
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
        />
      )}

      {/* Mobile Menu Panel */}
      <div
        ref={mobileMenuRef}
        className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          showMobileMenu ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <img src={logo} alt="Logo" className="h-10 w-auto" />
          <button
            onClick={toggleMobileMenu}
            className="p-1 rounded hover:bg-gray-100"
          >
            <XIcon className="w-6 h-6 text-gray-800" />
          </button>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-2">
          <Link
            to="/dashboard"
            onClick={handleLinkClick}
            className="flex items-center py-2 px-3 rounded-lg hover:bg-gray-100"
          >
            <HomeIcon className="w-5 h-5" />
            <span className="ml-3">Dashboard</span>
          </Link>
          <Link
            to="/dashboard/ocr-core"
            onClick={handleLinkClick}
            className="flex items-center py-2 px-3 rounded-lg hover:bg-gray-100"
          >
            <ScanText className="w-5 h-5" />
            <span className="ml-3">OCR Core</span>
          </Link>
          <Link
            to="/dashboard/ocr-advance"
            onClick={handleLinkClick}
            className="flex items-center py-2 px-3 rounded-lg hover:bg-gray-100"
          >
            <Repeat className="w-5 h-5" />
            <span className="ml-3">OCR Advanced</span>
          </Link>
          {userDetails && (
            <>
              <div className="border-t border-gray-200 my-2"></div>
              <Link
                to="/dashboard/terms/view"
                onClick={handleLinkClick}
                className="flex items-center py-2 px-3 rounded-lg hover:bg-gray-100"
              >
                <FileText className="w-5 h-5" />
                <span className="ml-3">Terms & Conditions</span>
              </Link>
              <Link
                to="/dashboard/credits"
                onClick={handleLinkClick}
                className="flex items-center py-2 px-3 rounded-lg hover:bg-gray-100"
              >
                <CreditCard className="w-5 h-5" />
                <span className="ml-3">Credits</span>
              </Link>
              <Link
                to="/dashboard/support"
                onClick={handleLinkClick}
                className="flex items-center py-2 px-3 rounded-lg hover:bg-gray-100"
              >
                <HelpCircle className="w-5 h-5" />
                <span className="ml-3">Support</span>
              </Link>
              <Link
                to="/dashboard/settings"
                onClick={handleLinkClick}
                className="flex items-center py-2 px-3 rounded-lg hover:bg-gray-100"
              >
                <Settings className="w-5 h-5" />
                <span className="ml-3">Settings</span>
              </Link>
              <button
                onClick={() => {
                  setShowConfirm(true);
                  setShowMobileMenu(false);
                }}
                className="flex items-center py-2 px-3 rounded-lg hover:bg-gray-100 w-full text-left"
              >
                <LogOut className="w-5 h-5" />
                <span className="ml-3">Logout</span>
              </button>
            </>
          )}
        </nav>
      </div>

      {/* Confirmation Dialog */}
      {showConfirm && (
        <div className="fixed inset-0 bg-gray-600/25 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm border-2 border-[#E6A24B] drop-shadow-2xl">
            <h2 className="text-xl font-semibold text-[#E6A24B] mb-2">
              Confirm Logout
            </h2>
            <p className="mb-6 text-gray-700">
              Are you sure you want to log out?
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={handleLogout}
                className="px-5 py-2 bg-[#E6A24B] text-white rounded-lg shadow hover:bg-[#d68d32] transition w-full sm:w-auto"
              >
                Yes, Logout
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="px-5 py-2 bg-gray-100 text-gray-800 rounded-lg shadow hover:bg-gray-200 transition w-full sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardLayout;