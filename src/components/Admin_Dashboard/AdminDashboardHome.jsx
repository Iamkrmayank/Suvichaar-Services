// function AdminDashboardHome() {
//   return (
//     <div className="p-6">
//       <h1 className="text-4xl font-bold mt-10">Welcome, Admin</h1>
//       <p className="text-gray-700 mt-2 mb-8">Here is a quick overview of the system:</p>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
//           <h2 className="text-lg font-semibold mb-2">Total Users</h2>
//           <p className="text-3xl font-bold text-blue-600">120</p>
//         </div>
//         <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
//           <h2 className="text-lg font-semibold mb-2">Active Admins</h2>
//           <p className="text-3xl font-bold text-green-600">3</p>
//         </div>
//         <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
//           <h2 className="text-lg font-semibold mb-2">Reports</h2>
//           <p className="text-3xl font-bold text-red-600">8</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AdminDashboardHome;


import { Link } from "react-router-dom";

function AdminDashboardHome() {
  return (
    <div className="p-6">
      {/* Welcome Section */}
      <h1 className="text-4xl font-bold mt-10">Welcome, Admin</h1>
      <p className="text-gray-700 mt-2 mb-8">
        Here are your administrative tools:
      </p>

      {/* Admin Tools */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Manage Users */}
        <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
          <h2 className="text-lg font-semibold mb-2">Manage Users</h2>
          <p className="text-gray-600 mb-4">
            View, edit, or remove user accounts and monitor their activity.
          </p>
          <Link to="/admin-dashboard/users">
            <button className="px-4 py-2 bg-[#E6A24B] text-white rounded-lg hover:bg-[#d68d32] w-full">
              Open
            </button>
          </Link>
        </div>

        {/* Manage Admins */}
        <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
          <h2 className="text-lg font-semibold mb-2">Manage Admins</h2>
          <p className="text-gray-600 mb-4">
            Add or remove admin privileges and secure platform access.
          </p>
          <Link to="/admin-dashboard/admins">
            <button className="px-4 py-2 bg-[#E6A24B] text-white rounded-lg hover:bg-[#d68d32] w-full">
              Open
            </button>
          </Link>
        </div>

        {/* Reports */}
        <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
          <h2 className="text-lg font-semibold mb-2">Reports</h2>
          <p className="text-gray-600 mb-4">
            Access usage analytics, error logs, and system performance reports.
          </p>
          <Link to="/admin-dashboard/reports">
            <button className="px-4 py-2 bg-[#E6A24B] text-white rounded-lg hover:bg-[#d68d32] w-full">
              Open
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardHome;
