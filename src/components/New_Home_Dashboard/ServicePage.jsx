import React from "react";
import { FileText, Sparkles, RefreshCw, Languages, MessageSquare, Wrench } from "lucide-react";

const services = [
  { icon: FileText, title: "OCR Core & Advanced", description: "Extracts text from images, PDFs, and handwritten notes with high accuracy.", features: ["Image & PDF text extraction", "Handwriting recognition & structuring", "Math equations & formulas", "Tables"], href: "https://labs.suvichaar.org" },
  { icon: Sparkles, title: "Story Generation", description: "Turns raw documents, links, or ideas into structured, engaging stories for blogs, web stories, and social media.", features: ["Blog content & social media posts", "Web stories & content structuring", "PPTx generation", "Social media content planning"], href: "https://labs.suvichaar.org" },
  { icon: RefreshCw, title: "Doc Transformation", description: "Converts documents across formats (PDF, Word, HTML, Web Stories) while retaining layout and branding.", features: ["Format conversion & layout preservation", "Brand consistency & batch processing", "PPTx support", "Docx support"], href: "https://labs.suvichaar.org" },
  { icon: Languages, title: "Doc Translation", description: "Multilingual, context-aware translation that preserves meaning and style.", features: ["50+ languages", "Context preservation", "Style maintenance", "Cultural adaptation"], href: "https://labs.suvichaar.org" },
  { icon: MessageSquare, title: "Summarization & QnA", description: "Condenses long documents and generates intelligent Q&A for learning and research.", features: ["Document summarization", "Q&A generation", "Key insights extraction", "Research assistance"], href: "https://labs.suvichaar.org" },
  { icon: Wrench, title: "DocviewerAI", description: "Use DocviewerAI to generate stories, transform documents, translate, summarize, and automate—no setup needed.", features: ["Start instantly", "Browser-based tools", "No-code workflows", "Fast results"], href: "https://labs.suvichaar.org" },
];

export default function ServicesPage() {
  return (
    <main className="bg-gray-50 min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Our AI Services</h1>
          <p className="text-lg text-gray-600 mb-6">
            Automate your workflow with OCR, storytelling, translation, and custom AI pipelines—designed to save time and money while improving quality at scale.
          </p>
          <div className="flex justify-center gap-4">
            <a href="https://labs.suvichaar.org" target="_blank" rel="noopener noreferrer" className="bg-[#E6A24B] text-white font-medium py-3 px-6 rounded-lg shadow-md hover:bg-[#d68d32] transition">
              Try Contentlabs Tools
            </a>
            <a href="/#process" className="border border-gray-300 text-gray-700 font-medium py-3 px-6 rounded-lg hover:bg-gray-100 transition">
              See Process
            </a>
          </div>
        </div>
      </section>

      {/* Services Cards */}
      <section className="py-24 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Our AI Services for Every Stage of Document Transformation
          </h2>
          <p className="text-gray-600 text-lg sm:text-xl">
            Explore how <span className="font-semibold">Content LABS</span> helps businesses transform their document workflows with intelligent automation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-16">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <a key={index} href={service.href} target="_blank" rel="noopener noreferrer"
                 className="group relative block bg-white border border-gray-100 rounded-2xl shadow-md p-6 transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-lg">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#E6A24B]/10 transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-5 w-5 text-[#E6A24B]" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 transition-colors duration-300 group-hover:text-[#E6A24B]">{service.title}</h3>
                </div>
                <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                <ul className="text-left space-y-2">
                  {service.features.map((feat, fIndex) => (
                    <li key={fIndex} className="flex items-center text-sm text-gray-600">
                      <span className="mr-2 h-2 w-2 rounded-full bg-[#E6A24B]" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </a>
            );
          })}
        </div>
      </section>

      {/* Custom Workflow Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-100 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold mb-3">Need Custom Workflow Automation?</h2>
          <p className="text-gray-600 mb-6">
            We design and implement tailored AI workflows that integrate with your tools, adding human-in-the-loop review, robust monitoring, and SLAs where needed.
          </p>
          <a href="https://labs.suvichaar.org" target="_blank" rel="noopener noreferrer" className="bg-[#E6A24B] text-white font-medium py-3 px-6 rounded-lg shadow-md hover:bg-[#d68d32] transition">
            Start Free
          </a>
        </div>
      </section>
    </main>
  );
}