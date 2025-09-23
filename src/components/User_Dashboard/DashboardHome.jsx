import { Link, useOutletContext } from "react-router-dom";

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

  return (
    <div className="p-6">
      {/* Welcome Section */}
      <h1 className="text-4xl font-bold mt-10">Welcome {getUserName()}</h1>
      <p className="text-gray-700 mt-2 mb-8">
        Here are some tools you can start using today:
      </p>

      {/* Tools Section (cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* OCR Core */}
        <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
          <h2 className="text-lg font-semibold mb-2">OCR Core</h2>
          <p className="text-gray-600 mb-4">
            Extracts text from images, scanned PDFs, and handwritten notes with reliable accuracy. Designed for everyday digitization needs across printed and handwritten content.
          </p>
          <Link to="/dashboard/ocr-core">
            <button className="px-4 py-2 bg-[#E6A24B] text-white rounded-lg hover:bg-[#d68d32] w-full">
              Open Tool
            </button>
          </Link>
        </div>

        {/* OCR Advanced */}
        <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
          <h2 className="text-lg font-semibold mb-2">
            OCR Advanced
          </h2>
          <p className="text-gray-600 mb-4">
            High-precision OCR that handles complex layouts, tables, multi-language documents, and low-quality scans. Provides enterprise-grade recognition for detailed document processing.
          </p>
          <Link to="/dashboard/ocr-advance">
            <button className="px-4 py-2 bg-[#E6A24B] text-white rounded-lg hover:bg-[#d68d32] w-full">
              Open Tool
            </button>
          </Link>
        </div>

        {/* Story Generator */}
        {/* <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
          <h2 className="text-lg font-semibold mb-2">Story Generation</h2>
          <p className="text-gray-600 mb-4">
            AI-driven tool that transforms raw inputs (documents, news links, product info, etc.) into structured and engaging stories for blogs, web stories, and digital content.
          </p>
          <Link to="/dashboard/quiz-generator">
            <button className="px-4 py-2 bg-[#E6A24B] text-white rounded-lg hover:bg-[#d68d32] w-full">
              Open Tool
            </button>
          </Link>
        </div> */}

        {/* Doc Transformation */}
        {/* <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
          <h2 className="text-lg font-semibold mb-2">Doc Transformation</h2>
          <p className="text-gray-600 mb-4">
            Converts documents across formats (PDF, Word, HTML, Web Stories, etc.) while retaining style, layout, and structure. Ideal for publishing, automation, and repurposing.
          </p>
          <Link to="/dashboard/quiz-generator">
            <button className="px-4 py-2 bg-[#E6A24B] text-white rounded-lg hover:bg-[#d68d32] w-full">
              Open Tool
            </button>
          </Link>
        </div> */}

        {/* Doc Translation  */}
        {/* <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
          <h2 className="text-lg font-semibold mb-2">Doc Translation </h2>
          <p className="text-gray-600 mb-4">
            AI-based multilingual document translation that preserves context and formatting. Enables seamless content accessibility for global audiences.

          </p>
          <Link to="/dashboard/quiz-generator">
            <button className="px-4 py-2 bg-[#E6A24B] text-white rounded-lg hover:bg-[#d68d32] w-full">
              Open Tool
            </button>
          </Link>
        </div> */}

        {/* Summarization and QnA  */}
        {/* <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
          <h2 className="text-lg font-semibold mb-2">Summarization and QnA </h2>
          <p className="text-gray-600 mb-4">
            Condenses lengthy documents into concise summaries and generates intelligent Q&A sets. Simplifies research, learning, and quick knowledge extraction.
          </p>
          <Link to="/dashboard/quiz-generator">
            <button className="px-4 py-2 bg-[#E6A24B] text-white rounded-lg hover:bg-[#d68d32] w-full">
              Open Tool
            </button>
          </Link>
        </div> */}
      </div>
    </div>
  );
}

export default DashboardHome;
