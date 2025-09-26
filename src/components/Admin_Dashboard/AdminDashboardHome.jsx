
import { Link, useOutletContext } from "react-router-dom";
import { Users, Shield, FileBarChart, Server, Activity } from "lucide-react";

// The AdminDashboardLayout passes 'adminDetails' via context
function AdminDashboardHome() {
  // Use context to get admin details (for a personalized welcome)
  const { adminDetails } = useOutletContext(); 

  // Utility function to decide which name to show (copied logic)
  const getAdminName = () => {
    if (!adminDetails) return "Admin";
    return adminDetails.displayName || "Admin";
  };

  const adminTools = [
    {
      name: "Manage Users",
      description: "View, edit, or remove user accounts and monitor their activity.",
      link: "/admin/manage-users",
      icon: <Users className="w-8 h-8 text-[#E6A24B] mb-2" />,
    },
  ];

  return (
    <div className="p-4 sm:p-6 md:p-8"> {/* Adaptive Padding */}
      {/* Welcome Section */}
      <h1 className="text-3xl sm:text-4xl font-bold mt-4 sm:mt-8"> {/* Adaptive Text Size and Margin */}
        Welcome, {getAdminName()} 👋
      </h1>
      <p className="text-gray-700 mt-2 mb-6 sm:mb-8"> {/* Adaptive Margin */}
        Here are your administrative tools:
      </p>

      {/* Admin Tools Grid (Responsive) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"> 
        {adminTools.map((tool, index) => (
          <div 
            key={index} 
            // Consistent Card Styling
            className="bg-white shadow-md rounded-xl p-6 border border-gray-200 hover:shadow-lg transition flex flex-col justify-between"
          >
            <div>
              <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
                {tool.icon} {tool.name}
              </h2>
              <p className="text-gray-600 mb-4 text-sm">
                {tool.description}
              </p>
            </div>
            <Link to={tool.link} className="mt-4">
              <button 
                className="px-4 py-2 bg-[#E6A24B] text-white rounded-lg hover:bg-[#d68d32] w-full transition"
              >
                Open Tool
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboardHome;