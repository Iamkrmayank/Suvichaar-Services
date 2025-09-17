import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Home,
  FileText,
  Upload,
  Repeat,
  LogOut,
} from "lucide-react"; // you can install lucide-react for icons

function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-[#E6A24B] text-black flex flex-col transition-all duration-300`}
      >
        {/* Logo */}
        <div className="flex items-center justify-center h-16 border-b border-black/20">
          <img
            src="/logo.png" // replace with your logo path
            alt="Logo"
            className="h-10"
          />
        </div>

        {/* Menu Items */}
        <nav className="flex-1 px-2 py-4">
          <Link
            to="/"
            className="flex items-center px-3 py-2 rounded-lg hover:bg-black/10"
          >
            <Home className="mr-3 w-5 h-5" />
            {sidebarOpen && "Dashboard"}
          </Link>
          <Link
            to="/files"
            className="flex items-center px-3 py-2 rounded-lg hover:bg-black/10"
          >
            <FileText className="mr-3 w-5 h-5" />
            {sidebarOpen && "File Manager"}
          </Link>
          <Link
            to="/upload"
            className="flex items-center px-3 py-2 rounded-lg hover:bg-black/10"
          >
            <Upload className="mr-3 w-5 h-5" />
            {sidebarOpen && "Upload File"}
          </Link>
          <Link
            to="/converter"
            className="flex items-center px-3 py-2 rounded-lg hover:bg-black/10"
          >
            <Repeat className="mr-3 w-5 h-5" />
            {sidebarOpen && "Converter Tool"}
          </Link>
        </nav>

        {/* Bottom Logout */}
        <div className="p-3 border-t border-black/20">
          <button className="flex items-center px-3 py-2 w-full text-left rounded-lg hover:bg-black/10">
            <LogOut className="mr-3 w-5 h-5" />
            {sidebarOpen && "Logout"}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {children || <h1 className="text-2xl font-bold">Welcome to Dashboard</h1>}
      </main>
    </div>
  );
}

export default DashboardLayout;
