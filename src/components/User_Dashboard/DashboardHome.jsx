
import { Link, useOutletContext } from "react-router-dom";
import { ScanText, Repeat, Sparkles, Languages, FileCode, BookOpen } from "lucide-react";

function DashboardHome() {
  // Get userDetails from parent (DashboardLayout)
  const { userDetails } = useOutletContext();

  // Utility function to decide which name to show
  const getUserName = () => {
    if (!userDetails) return "Guest";

    if (userDetails.firstName || userDetails.lastName) {
      return `${userDetails.firstName || ""} ${userDetails.lastName || ""}`.trim();
    }

    if (userDetails.displayName) {
      return userDetails.displayName;
    }

    return "Guest";
  };
  
  const tools = [
    {
      name: "OCR Core",
      description: "Extracts text from images, scanned PDFs, and handwritten notes with reliable accuracy. Designed for everyday digitization needs across printed and handwritten content.",
      link: "/dashboard/ocr-core",
      icon: <ScanText className="w-8 h-8 text-[#E6A24B] mb-2" />,
    },
    {
      name: "OCR Advanced",
      description: "High-precision OCR that handles complex layouts, tables, multi-language documents, and low-quality scans. Provides enterprise-grade recognition for detailed document processing.",
      link: "/dashboard/ocr-advance",
      icon: <Repeat className="w-8 h-8 text-[#E6A24B] mb-2" />,
    },
  ];

  return (
    <div className="p-4 sm:p-6 md:p-8">
      {/* Welcome Section */}
      <h1 className="text-3xl sm:text-4xl font-bold mt-4 sm:mt-8">
        Welcome {getUserName()} 👋
      </h1>
      <p className="text-gray-700 mt-2 mb-6 sm:mb-8">
        Here are some tools you can start using today:
      </p>

      {/* Tools Section (cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool, index) => (
          <div 
            key={index} 
            className="bg-white shadow-md rounded-xl p-6 border border-gray-200 hover:shadow-lg transition"
          >
            <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
              {tool.icon} {tool.name}
            </h2>
            <p className="text-gray-600 mb-4 text-sm">
              {tool.description}
            </p>
            <Link to={tool.link}>
              <button 
                className="px-4 py-2 bg-[#E6A24B] text-white rounded-lg hover:bg-[#d68d32] w-full transition"
                disabled={tool.disabled}
              >
                {tool.disabled ? "Coming Soon" : "Open Tool"}
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardHome;