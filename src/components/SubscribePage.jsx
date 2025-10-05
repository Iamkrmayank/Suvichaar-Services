
import React, { useEffect, useState } from 'react';

// The main React component for the SwG integration.
const SubscribePage = () => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  // 1. Load the external swg-basic.js script
  useEffect(() => {
    const scriptId = 'swg-basic-script';
    let script = document.getElementById(scriptId);

    // If the script is already present, just ensure the flag is set.
    if (script) {
        setIsScriptLoaded(true);
        return;
    }

    // Create the script element
    script = document.createElement('script');
    script.id = scriptId;
    script.src = 'https://news.google.com/swg/js/v1/swg-basic.js';
    script.async = true;
    script.type = 'application/javascript';

    // Once the script is loaded, set the state
    script.onload = () => {
      console.log('Subscribe with Google Basic script loaded.');
      setIsScriptLoaded(true);
    };

    // Append the script to the document head
    document.head.appendChild(script);

    // No need for cleanup in this single-file context, but in production, 
    // a return function would handle removing the script.
    // return () => { ... }
  }, []); // Run only once on mount

  // 2. Initialize the SwG configuration once the script is loaded
  useEffect(() => {
    if (isScriptLoaded) {
      console.log('Initializing Subscribe with Google Basic...');
      
      // The initialization function must run after swg-basic.js defines 
      // the global variable self.SWG_BASIC
      
      if (typeof self.SWG_BASIC !== 'undefined' && Array.isArray(self.SWG_BASIC)) {
        
        // Push the configuration object into the global array as requested.
        self.SWG_BASIC.push(basicSubscriptions => {
          basicSubscriptions.init({
            type: "NewsArticle",
            isPartOfType: ["Product"],
            // NOTE: This Product ID must match your publication's configuration
            isPartOfProductId: "CAowitXBDA:openaccess", 
            clientOptions: { 
              theme: "light", 
              lang: "en", 
              // Tell SwG where to place the button. This ID must match the div below.
              buttonLocations: ['#swg-button-container']
            },
          });
          console.log('SWG Initialization complete. Button should appear.');
        });
      } else {
        console.error('SWG_BASIC global variable not found after script load.');
      }
    }
  }, [isScriptLoaded]); // Run whenever the script loading state changes

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4 sm:p-8">
      {/* Tailwind CSS and Font Setup */}
      <script src="https://cdn.tailwindcss.com"></script>
      <link 
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" 
        rel="stylesheet"
      />
      <style>{`
        body { font-family: 'Inter', sans-serif; }
        .article-card {
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }
        /* Ensure the button container has enough height and is centered */
        #swg-button-container {
            min-height: 48px; 
            display: flex;
            justify-content: center;
            align-items: center;
        }
      `}</style>

      {/* Main Content Area */}
      <header className="w-full max-w-2xl text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">
          Premium Publication
        </h1>
        <p className="text-gray-600 mt-2">
          Unlock this full article with your Google subscription.
        </p>
      </header>

      {/* Article Card */}
      <div className="article-card bg-white w-full max-w-2xl rounded-xl p-6 md:p-10">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          The Essential Guide to Modern Content Monetization
        </h2>
        
        {/* Visible Preview Text */}
        <p className="text-gray-700 mb-6 leading-relaxed">
          The future of high-quality digital publishing hinges entirely on diversified revenue streams. 
          While display advertising offers volume, it often fails to deliver predictable returns or high margins. 
          Consequently, publishers are pivoting towards reader-supported models. This shift guarantees content 
          quality remains the top priority, free from the volatility of the ad-tech market.
        </p>

        {/* Paywall Gate */}
        <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-200 text-center transition-all duration-300">
          <p className="text-xl font-medium text-indigo-900 mb-4">
            Subscribe to read the complete analysis and data charts.
          </p>
          
          {/* SwG Button Container - The button will be injected here */}
          {isScriptLoaded ? (
            <div id="swg-button-container" className="py-2">
              {/* The Subscribe with Google button will be automatically injected here */}
            </div>
          ) : (
            <div className="text-sm text-gray-500 flex items-center justify-center space-x-2">
              <svg className="animate-spin h-5 w-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Loading Subscription Service...</span>
            </div>
          )}
          
        </div>

        {/* Placeholder for paywalled content (Hidden) */}
        <div className="text-gray-500 mt-6 pt-6 border-t border-dashed border-gray-200">
          <p className="font-light italic">
            [... The full article continues below this point, accessible only after the user successfully completes the subscription/login process via the button above ...]
          </p>
        </div>
      </div>
      
      <footer className="mt-8 text-sm text-gray-500">
        Subscription mechanism powered by Subscribe with Google Basic.
      </footer>
    </div>
  );
};

export default SubscribePage;
