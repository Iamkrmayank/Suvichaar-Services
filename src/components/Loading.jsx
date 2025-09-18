// import React from "react";

// const LoadingScreen = ({ text = "Loading..." }) => {
//   return (
//     <div className="absolute inset-0 bg-white/70 flex flex-col items-center justify-center z-50">
//       <div className="w-12 h-12 border-4 border-[#E6A24B] border-t-transparent rounded-full animate-spin"></div>
//       <p className="mt-4 text-gray-700 font-medium">{text}</p>
//     </div>
//   );
// };

// export default LoadingScreen;


import React from "react";

const LoadingScreen = ({ text = "Loading..." }) => {
  return (
    <div className="absolute inset-0 bg-white/70 flex flex-col items-center justify-center z-50">
      {/* Spinner */}
      <div className="w-12 h-12 border-4 border-[#E6A24B] border-t-transparent rounded-full animate-spin"></div>
      {/* Optional text */}
      <p className="mt-4 text-gray-700 font-medium">{text}</p>
    </div>
  );
};

export default LoadingScreen;
