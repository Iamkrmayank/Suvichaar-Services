import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import {
  BookOpen,
  PenTool,
  FlaskConical,
  Globe2,
  CheckCircle,
  Video,
  Settings,
  Zap,
  Link2,
  Rocket,
} from "lucide-react";

// Services Data
const services = [
  {
    icon: BookOpen,
    title: "OCR Core & Advanced",
    desc: "Extracts text from images, PDFs, and handwritten notes with high accuracy.",
    useCases: [
      "Digitize invoices, contracts, and compliance documents",
      "Extract information from forms, receipts, and scanned reports",
      "Recognize tables, financial data, and structured records",
      "Automate data entry and document processing",
    ],
    features: [
      "Image text extraction",
      "PDF processing",
      "Handwriting recognition",
      "Structuring",
      "Math equations",
      "Formulas",
      "Tables",
    ],
  },
  {
    icon: FlaskConical,
    title: "Story Generation",
    desc: "Turns raw documents, links, or ideas into structured, engaging stories for reports, presentations, and content sharing.",
    useCases: [
      "Generate business reports, executive summaries, and internal communications",
      "Create structured presentations and decks for meetings",
      "Convert raw data into engaging content for internal and external stakeholders",
      "Automate reporting from raw documents or spreadsheets",
    ],
    features: [
      "Blog content creation",
      "Social media posts",
      "Web stories",
      "Content structuring",
      "PPTx generation",
      "Social media content",
    ],
  },
  {
    icon: PenTool,
    title: "Doc Transformation",
    desc: "Converts documents across formats while retaining layout and branding.",
    useCases: [
      "Convert PDF contracts, proposals, or reports into editable Word or Docx formats",
      "Batch process multiple documents for audits or compliance",
      "Maintain formatting for corporate reports, presentations, and manuals",
      "Export PPTx and Docx for board meetings or team briefings",
    ],
    features: [
      "Format conversion",
      "Layout preservation",
      "Brand consistency",
      "Batch processing",
      "PPTx support",
      "Docx support",
    ],
  },
  {
    icon: Globe2,
    title: "Doc Translation",
    desc: "Multilingual, context-aware translation that preserves meaning and style.",
    useCases: [
      "Translate corporate communications, contracts, and presentations into multiple languages",
      "Maintain professional tone, context, and accuracy",
      "Facilitate global business operations and multilingual teams",
      "Translate policies, HR documents, and training manuals efficiently",
    ],
    features: [
      "50+ languages",
      "Context preservation",
      "Style maintenance",
      "Cultural adaptation",
    ],
  },
  {
    icon: FlaskConical,
    title: "Summarization & QnA",
    desc: "Condenses long documents and generates intelligent Q&A for learning and corporate insights.",
    useCases: [
      "Summarize long reports, financial statements, and research documents",
      "Generate Q&A for training, onboarding, or internal knowledge sharing",
      "Extract key insights from business intelligence reports",
      "Assist managers in decision-making and meeting prep",
    ],
    features: [
      "Document summarization",
      "Q&A generation",
      "Key insights extraction",
      "Research assistance",
    ],
  },
  {
    icon: CheckCircle,
    title: "Custom AI Workflow Automation",
    desc: "End-to-end automation for content and document pipelines tailored to corporate teams.",
    useCases: [
      "Automate invoice processing, contract approvals, and HR workflows",
      "Schedule document review, reporting, or content distribution",
      "Integrate with CRM, ERP, Google Drive, Slack, and Notion",
      "Monitor corporate workflows with dashboards and automated alerts",
    ],
    features: [
      "Custom workflows",
      "API integration",
      "Scalable solutions",
      "Enterprise support",
      "Bulk posting",
      "Workflow orchestration",
      "Human-in-the-loop reviews",
      "Drive/Notion/Slack connectors",
      "Monitoring & SLAs",
    ],
  },
  {
    icon: PenTool,
    title: "DocviewerAI",
    desc: "Generate stories, transform documents, translate, summarize, and automate—no setup needed.",
    useCases: [
      "Instantly process contracts, reports, and internal documents",
      "Summarize, translate, or restructure content for corporate decision-making",
      "Browser-based, no coding required",
    ],
    features: ["Start instantly", "Browser-based tools", "No-code workflows", "Fast results"],
  },
  {
    icon: Video,
    title: "Video Clipper",
    desc: "Create short video snippets from corporate training sessions or presentations.",
    useCases: [
      "Clip training videos, presentations, or board meetings for quick sharing",
      "Prepare highlight reels for corporate communication",
      "Use short videos for employee training, onboarding, or marketing content",
      "Save time in creating internal video briefs or knowledge snippets",
    ],
    features: [
      "Trim and clip videos quickly",
      "High-quality output",
      "Export ready for YouTube or social media",
      "Fast, browser-based workflow",
    ],
  },
];

// Benefits
const benefits = [
  "Save Time – Automate document processing, reporting, and workflow management",
  "Increase Accuracy – OCR and AI tools ensure precise data extraction and summarization",
  "Enhance Productivity – Generate structured reports, presentations, and insights faster",
  "Enable Digital Workflows – Streamline internal communication and document management",
  "Integrate Seamlessly – Works with CRM, ERP, Google Drive, Notion, Slack, and corporate systems",
  "Scalable Solutions – Suitable for small teams, departments, or enterprise-level organizations",
];

// FAQs
const faqs = [
  {
    q: "How can I digitize invoices, contracts, and corporate documents?",
    a: "Use OCR Core & Advanced to convert scanned or handwritten documents into editable and searchable text.",
  },
  {
    q: "Can AI help summarize long reports or research for business decisions?",
    a: "Yes. Summarization & QnA condenses lengthy documents and generates insights for faster decision-making.",
  },
  {
    q: "Can PDFs of corporate documents be converted into editable Word or PPT files?",
    a: "Absolutely. Doc Transformation preserves layout while converting PDFs into Word, PPTx, or Docx formats.",
  },
  {
    q: "Can content be translated for global teams or clients?",
    a: "Yes. Doc Translation supports 50+ languages while maintaining context and professional tone.",
  },
  {
    q: "Can I automate document workflows for multiple teams?",
    a: "Yes. Custom AI Workflow Automation streamlines approvals, reporting, and content distribution across departments.",
  },
  {
    q: "Can I create short video clips from corporate presentations or training sessions?",
    a: "Yes. Video Clipper allows quick creation of shareable video snippets for training, communication, or marketing.",
  },
];

export default function CorporateServicesPage() {
  const [faqOpen, setFaqOpen] = useState(null);

  return (
    <main className="bg-background text-foreground font-sans">
      {/* Meta */}
      <Helmet>
        <title>AI Services for Offices & Corporates | Contentlab</title>
        <meta
          name="description"
          content="Explore AI-powered solutions for offices and corporates. From OCR, Doc Transformation, and Story Generation to Translation, Summarization, and Workflow Automation — streamline document management, automate processes, and improve efficiency."
        />
        <meta
          name="keywords"
          content="OCR for corporates, AI for offices, Document automation for corporates, Story Generation for business, Doc Transformation for corporates, Doc Translation for offices, Summarization for corporate documents, QnA generation for businesses, AI workflow automation for corporates, DocviewerAI for offices, Video Clipper for corporate training"
        />
      </Helmet>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-50 to-orange-100 py-24 px-6 text-center">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            AI Services for Offices & Corporates
          </h1>
          <p className="text-xl text-gray-700 mb-6 max-w-3xl mx-auto">
            Automate workflows, digitize documents, and enhance productivity with AI. Contentlab’s AI tools help businesses and corporate teams streamline document-heavy workflows, automate repetitive tasks, and improve operational efficiency. From digitizing invoices and contracts to summarizing reports, our platform is designed to boost productivity and reduce manual workload.
          </p>
          <div className="flex justify-center gap-4 mt-6">
            <Link
              to="https://labs.suvichaar.org"
              className="bg-[#E6A24B] text-white font-medium py-3 px-8 rounded-lg shadow-md transform transition-transform duration-200 hover:scale-105 active:scale-95"
            >
              Start Free Today
            </Link>
            <Link
              to="/contact"
              className="border border-gray-300 text-gray-700 font-medium py-3 px-8 rounded-lg shadow-md transform transition-transform duration-200 hover:scale-105 active:scale-95"
            >
              See AI in Action
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
          Our Services for Offices & Corporates
        </h2>
        <div className="grid md:grid-cols-2 gap-10">
          {services.map((s, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-md p-8 hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex items-center justify-center mb-4">
                <div className="bg-[#E6A24B]/20 p-4 rounded-full">
                  <s.icon className="w-12 h-12 text-[#E6A24B]" />
                </div>
              </div>
              <h3 className="text-2xl font-semibold mb-3">{s.title}</h3>
              <p className="text-gray-600 mb-6">{s.desc}</p>

              <h4 className="font-semibold text-gray-900 mb-2">Use Cases:</h4>
              <ul className="list-disc pl-5 text-gray-700 mb-4 space-y-1">
                {s.useCases.map((uc, i) => (
                  <li key={i}>{uc}</li>
                ))}
              </ul>

              <h4 className="font-semibold text-gray-900 mb-2">Key Features:</h4>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                {s.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-orange-50 py-24 px-6">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Benefits for Offices & Corporates
        </h2>
        <div className="max-w-5xl mx-auto grid sm:grid-cols-2 gap-6">
          {benefits.map((b, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-lg p-6 flex items-start space-x-3 hover:shadow-2xl transition"
            >
              <CheckCircle className="w-6 h-6 text-[#E6A24B] mt-1" />
              <p className="text-gray-700">{b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-24 px-6 max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">FAQs</h2>
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-md p-6 cursor-pointer transition-all duration-300"
              onClick={() => setFaqOpen(faqOpen === i ? null : i)}
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-900">{f.q}</h3>
                <span className="text-gray-500 font-bold text-xl">
                  {faqOpen === i ? "-" : "+"}
                </span>
              </div>
              {faqOpen === i && (
                <p className="text-gray-700 mt-4 transition-all duration-300">{f.a}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-12">
            Why Choose Contentlab AI for Offices & Corporates
          </h2>
          <div className="flex flex-wrap justify-center gap-8">
            {[
              {
                icon: Settings,
                title: "Tailored AI Tools",
                text: "Specialized solutions for document management, automation, and workflow efficiency.",
              },
              {
                icon: Zap,
                title: "Automation",
                text: "Automate OCR, translation, summarization, and report generation.",
              },
              {
                icon: BookOpen,
                title: "Content & Reports",
                text: "Quickly generate summaries, reports, and corporate communications.",
              },
              {
                icon: Link2,
                title: "Seamless Integration",
                text: "Works with CRM, ERP, Google Drive, Notion, Slack, and enterprise tools.",
              },
              {
                icon: Rocket,
                title: "Fast & Scalable",
                text: "Ideal for teams, departments, and enterprise organizations.",
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center h-full hover:shadow-xl transition-shadow duration-300 w-full max-w-xs"
                >
                  <Icon className="w-10 h-10 text-orange-500 mb-4" />
                  <h3 className="font-semibold text-lg mb-2 text-center">{item.title}</h3>
                  <p className="text-gray-700 text-sm text-center">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#E6A24B] text-white py-24 px-6 text-center">
        <h2 className="text-4xl font-bold mb-8">
          Transform your office workflows and corporate content management with AI-powered tools
        </h2>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            to="https://labs.suvichaar.org"
            className="bg-white text-[#E6A24B] font-medium py-3 px-8 rounded-lg shadow-md transform transition-transform duration-200 hover:scale-105 active:scale-95"
          >
            Start Free Today
          </Link>
          <Link
            to="/contact"
            className="border border-white text-white font-medium py-3 px-8 rounded-lg shadow-md transform transition-transform duration-200 hover:scale-105 active:scale-95"
          >
            Contact Us for Corporate Plans
          </Link>
        </div>
      </section>
    </main>
  );
}
