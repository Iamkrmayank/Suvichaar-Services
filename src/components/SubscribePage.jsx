import React, { useEffect, useState } from 'react';

// The main React component for the SwG Basic integration.
const SubscribePage = () => {
  const [isSwgInitialized, setIsSwgInitialized] = useState(false);
  const [error, setError] = useState(null);

  // 1. Load the external swg-basic.js script AND configure it immediately
  useEffect(() => {
    const scriptId = 'swg-basic-script';
    let script = document.getElementById(scriptId);

    // --- Part 1: Load the Script Dynamically ---
    if (!script) {
        script = document.createElement('script');
        script.id = scriptId;
        // Using the basic script URL as per your confirmed usage
        script.src = 'https://news.google.com/swg/js/v1/swg-basic.js'; 
        script.async = true;
        script.type = 'application/javascript';

        script.onerror = () => {
            setError("Failed to load swg-basic.js script.");
            console.error("Failed to load swg-basic.js script.");
        };

        document.head.appendChild(script);
    }
    
    // --- Part 2: Use the Canonical Initialization Pattern (Most Reliable) ---
    // The .push() pattern ensures the configuration is queued even if the script 
    // hasn't fully executed, solving the previous timing issue.
    
    console.log('Pushing SWG Basic Initialization payload...');
    
    try {
        // Initialize or retrieve the global SWG_BASIC array
        const SWG_BASIC = (self.SWG_BASIC = self.SWG_BASIC || []);

        SWG_BASIC.push(basicSubscriptions => {
            basicSubscriptions.init({
                type: "NewsArticle",
                isPartOfType: ["Product"],
                // WARNING: Ensure this Product ID is correctly configured for your deployed domain
                isPartOfProductId: "CAowitXBDA:openaccess", 
                clientOptions: { 
                    theme: "light", 
                    lang: "en", 
                    // Tell SwG where to place the button. 
                    buttonLocations: ['#swg-button-container']
                },
            });
            setIsSwgInitialized(true); 
            console.log('SWG Basic Initialization complete (config pushed and executed).');
        });
    } catch (e) {
        setError("SWG initialization failed during config push: " + e.message);
        console.error("SWG initialization failed:", e);
    }
    
  }, []); // Run only once on mount

  
  const contentState = error 
    ? 'ERROR' 
    : !isSwgInitialized 
    ? 'WAITING_FOR_INIT_EXECUTION' 
    : 'BUTTON_EXPECTED';
    
  let statusMessage;
  
  switch (contentState) {
    case 'ERROR':
      statusMessage = { text: `Error: ${error}`, color: 'text-red-600 font-medium' };
      break;
    case 'WAITING_FOR_INIT_EXECUTION':
      statusMessage = { text: 'Initializing subscription service...', color: 'text-indigo-500' };
      break;
    case 'BUTTON_EXPECTED':
      statusMessage = { text: 'Subscription service configured. Waiting for button to render...', color: 'text-gray-500' };
      break;
    default:
      statusMessage = { text: 'Loading...', color: 'text-gray-500' };
  }


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
        #swg-button-container {
            min-height: 48px; 
            display: flex;
            justify-content: center;
            align-items: center;
            min-width: 250px; 
        }
      `}</style>

      {/* Structured Data (MUST be included in the final HTML head for SwG to work) */}
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{__html: JSON.stringify({
            "@context": "http://schema.org",
            "@type": "NewsArticle",
            "headline": "The Essential Guide to Modern Content Monetization",
            "isAccessibleForFree": "False",
            "hasPart": [
                {
                    "@type": "WebPageElement",
                    "isAccessibleForFree": "True",
                    "cssSelector": ".preview-content" // Selector for the visible content
                },
                {
                    "@type": "WebPageElement",
                    "isAccessibleForFree": "False",
                    "cssSelector": ".paywalled-content" // Selector for the locked content
                }
            ],
            // More required fields like datePublished, author, publisher, etc., should go here
        })}}
      />


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
        
        {/* Visible Preview Text - Use .preview-content class for structured data */}
        <p className="text-gray-700 mb-6 leading-relaxed preview-content">
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
          <div id="swg-button-container" className="py-2">
            {!isSwgInitialized || contentState === 'ERROR' ? (
                <div className={`${statusMessage.color} flex items-center justify-center space-x-2 text-sm`}>
                    {(contentState === 'WAITING_FOR_INIT_EXECUTION') && (
                        <svg className="animate-spin h-5 w-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    )}
                    <span>{statusMessage.text}</span>
                </div>
            ) : (
                <div className="text-sm text-gray-500">
                    {statusMessage.text}
                </div>
            )}
            {/* The actual button will be injected here by swg-basic.js */}
          </div>
          
        </div>

        {/* Paywalled Content - Use .paywalled-content class for structured data */}
        <div className="text-gray-500 mt-6 pt-6 border-t border-dashed border-gray-200 paywalled-content">
          <p className="font-light italic">
            [... The full article continues below this point. This content is locked behind the paywall...]
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
