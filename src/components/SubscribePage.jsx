import React from "react";

const SubscribePage = () => {
  const handleSubscribe = () => {
    // Check if script already exists
    if (!document.getElementById("swg-script")) {
      const script = document.createElement("script");
      script.id = "swg-script";
      script.src = "https://news.google.com/swg/js/v1/swg-basic.js";
      script.async = true;
      script.type = "application/javascript";
      script.onload = () => {
        // Initialize SwG after script loads
        if (window.SWG_BASIC) {
          window.SWG_BASIC.push((basicSubscriptions) => {
            basicSubscriptions.init({
              type: "NewsArticle",
              isPartOfType: ["Product"],
              isPartOfProductId: "CAowitXBDA:openaccess",
              clientOptions: { theme: "light", lang: "en" },
            });
          });
          alert("Subscribe with Google initialized!");
        }
      };
      document.body.appendChild(script);
    } else {
      // Script already loaded — reinitialize
      if (window.SWG_BASIC) {
        window.SWG_BASIC.push((basicSubscriptions) => {
          basicSubscriptions.init({
            type: "NewsArticle",
            isPartOfType: ["Product"],
            isPartOfProductId: "CAowitXBDA:openaccess",
            clientOptions: { theme: "light", lang: "en" },
          });
        });
        alert("SwG script already loaded and initialized!");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <button
        onClick={handleSubscribe}
        className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
      >
        Subscribe
      </button>
    </div>
  );
};

export default SubscribePage;
