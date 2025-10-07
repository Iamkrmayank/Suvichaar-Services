import React from "react";
import logoGif from "/contentlabsGif2.gif?url";

export function Process() {
  return (
    <section id="process" className="py-24 sm:py-32 ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mx-auto max-w-3xl text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wide text-[#2B2B2B] leading-snug">
            Our AI-Powered Process
          </h2>
          <p className="mt-4 text-lg sm:text-xl text-[#6B6B6B] mx-auto">
            See how our advanced AI technology transforms your documents through intelligent automation.
          </p>
        </div>

        {/* Custom Themed Card */}
        <div className="mx-auto max-w-6xl">
          <div className="bg-[#F9F5F0] rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 p-8 border border-[#E6A24B]/20">
            <div className="flex flex-col lg:flex-row items-center gap-12">

              {/* Left Text Content */}
              <div className="flex-1">
                <h3 className="text-2xl sm:text-4xl font-bold text-[#2B2B2B] mb-6">
                  Intelligent Document Processing
                </h3>
                <p className="text-[#555555] mb-8 leading-relaxed text-base sm:text-lg">
                  Our AI stack processes your documents through multiple stages of analysis, extraction, and
                  transformation. From initial OCR scanning to final output generation, every step is optimized for
                  accuracy and efficiency. Our system ensures faster processing with minimal errors.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    "Document ingestion & analysis",
                    "AI-powered content extraction",
                    "Intelligent processing & transformation",
                    "Quality assurance & output delivery"
                  ].map((point, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <span className="flex-shrink-0 h-3 w-3 rounded-full bg-[#E6A24B] mt-1" />
                      <span className="text-sm sm:text-base text-[#555555]">{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Image */}
              {/* <div className="flex-1 max-w-md lg:max-w-lg"> */}
              <div className="flex-1 max-w-md lg:w-12">
                <div className="rounded-2xl overflow-hidden bg-white p-4 shadow-inner">
                  <img
                    src={logoGif}
                    alt="Contentlabs AI Processing Workflow"
                    className="w-full h-auto rounded-xl"
                  />
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
