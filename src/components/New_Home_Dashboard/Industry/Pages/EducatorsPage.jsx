import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import {
  BookOpen,
  FlaskConical,
  PenTool,
  Globe2,
  CheckCircle,
  Settings,
  Zap,
  Link2,
  Rocket
} from "lucide-react";

// Services Data
const services = [
  {
    icon: BookOpen,
    title: "OCR Core & Advanced",
    desc: "Extracts text from images, PDFs, and handwritten notes with high accuracy.",
    useCases: [
      "Convert lesson plans, student submissions, and handwritten notes into editable text",
      "Digitize classroom worksheets and teaching material for easy sharing",
      "Recognize math equations, tables, and formulas for digital lessons",
      "Automate grading, record-keeping, and digital lesson archives",
    ],
    features: [
      "Image & PDF text extraction",
      "Handwriting recognition",
      "Structuring tables & formulas",
      "Batch processing",
      "Fast, accurate results",
    ],
  },
  {
    icon: FlaskConical,
    title: "Story Generation",
    desc: "Turns raw documents, links, or ideas into structured, engaging stories for blogs, web stories, and social media.",
    useCases: [
      "Generate interactive lesson summaries and study guides",
      "Create classroom presentations and teaching content",
      "Produce quizzes, exercises, and educational blog posts",
      "Convert ideas into structured content for remote learning or e-learning platforms",
    ],
    features: [
      "Blog content creation",
      "Social media posts",
      "Web stories",
      "Content structuring",
      "PPTx generation",
      "Interactive quizzes",
    ],
  },
  {
    icon: PenTool,
    title: "Doc Transformation",
    desc: "Converts documents across formats while retaining layout and branding.",
    useCases: [
      "Convert PDF lesson materials to Word or editable docs",
      "Batch process multiple worksheets and student assignments",
      "Preserve formatting for lesson notes, presentations, or teaching guides",
      "Export PPTx and Docx formats for classroom delivery",
    ],
    features: [
      "Format conversion (PDF, Word, PPTx)",
      "Layout & brand preservation",
      "Batch processing support",
      "Maintains academic formatting",
      "Easy export & sharing",
    ],
  },
  {
    icon: Globe2,
    title: "Doc Translation",
    desc: "Multilingual, context-aware translation that preserves meaning and style.",
    useCases: [
      "Translate lesson plans, worksheets, and notes for multilingual classrooms",
      "Maintain academic context and teaching style",
      "Ensure inclusive learning for students with different language backgrounds",
      "Translate digital resources, newsletters, and study guides efficiently",
    ],
    features: [
      "50+ language support",
      "Context-aware translation",
      "Preserves academic style",
      "Cultural adaptation",
      "Inclusive learning enabled",
    ],
  },
];

// Benefits
const benefits = [
  "Save Time – Automate lesson prep, grading, and content creation",
  "Increase Accuracy – OCR and AI tools ensure precise digitization and formatting",
  "Enhance Teaching – Generate structured study material, quizzes, and summaries",
  "Enable Digital Classrooms – Move from paper-based teaching to fully digital workflows",
  "Seamless Integration – Works with LMS, Google Classroom, Notion, and Slack",
  "Scalable for Schools & Colleges – Suitable for individual teachers or full academic departments",
];

// FAQs
const faqs = [
  {
    q: "Can I convert handwritten lesson notes into editable text?",
    a: "Yes. OCR Core & Advanced digitizes handwritten or scanned notes into editable and searchable formats.",
  },
  {
    q: "How can AI help in creating quizzes and assignments?",
    a: "Story Generation and Summarization & QnA automatically generate structured learning content, including practice questions and exercises.",
  },
  {
    q: "Can I convert PDF teaching materials into Word or PPT files?",
    a: "Absolutely. Doc Transformation converts PDF assignments, lesson notes, or worksheets while preserving formatting and layout.",
  },
  {
    q: "Is translation supported for multi-language classrooms?",
    a: "Yes. Doc Translation supports 50+ languages, maintaining context, style, and academic integrity.",
  },
  {
    q: "Can I create short educational videos from recorded lessons?",
    a: "Yes. Video Clipper enables teachers to clip lectures into short, shareable videos for student learning.",
  },
  {
    q: "How can AI workflows simplify teaching administration?",
    a: "Custom AI Workflow Automation streamlines grading, content scheduling, and record-keeping, integrating with LMS and collaboration platforms.",
  },
];

export default function EducatorsPage() {
  const [faqOpen, setFaqOpen] = useState(null);

  return (
    <main className="bg-background text-foreground font-sans">
      {/* Meta */}
      <Helmet>
        <title>AI Services for Educators & Teachers | Contentlab</title>
        <meta
          name="description"
          content="Explore AI-powered solutions for educators and teachers. From OCR, Story Generation, and Doc Transformation to Translation, Summarization, and Video Clipping — streamline lesson planning, digitize notes, and automate teaching workflows."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-50 to-orange-100 py-24 px-6 text-center">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            AI Services Designed for Educators & Teachers
          </h1>
          <p className="text-xl text-gray-700 mb-6 max-w-3xl mx-auto">
            Digitize, organize, and enhance teaching content with AI. Contentlab’s AI tools help educators save time, improve lesson delivery, and create engaging learning content.
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
          Our Services for Educators & Teachers
        </h2>
        <div className="grid md:grid-cols-2 gap-10">
          {services.map((s, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-md p-8 hover:shadow-2xl transition-all duration-300">
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
          Benefits for Educators & Teachers
        </h2>
        <div className="max-w-5xl mx-auto grid sm:grid-cols-2 gap-6">
          {benefits.map((b, i) => (
            <div key={i} className="bg-white rounded-xl shadow-lg p-6 flex items-start space-x-3 hover:shadow-2xl transition">
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

      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-12">
            Why Choose Contentlab AI for Educators & Teachers
          </h2>
          <div className="flex flex-wrap justify-center gap-8">
            {[
              {
                icon: Settings,
                title: "Tailored AI Tools",
                text: "Specialized AI solutions for teaching, lesson planning, and classroom needs."
              },
              {
                icon: Zap,
                title: "Automation",
                text: "Automate repetitive tasks, grading assistance, and classroom efficiency."
              },
              {
                icon: BookOpen,
                title: "Content Digitization",
                text: "Digitize notes, create structured lessons, and summarize learning material."
              },
              {
                icon: Link2,
                title: "Seamless Integration",
                text: "Works with LMS, Google Classroom, and other collaboration tools."
              },
              {
                icon: Rocket,
                title: "Fast & Scalable",
                text: "Designed for individual teachers, schools, or entire academic departments."
              }
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
          Empower your teaching with AI-powered tools
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
            Contact Us for Education Plans
          </Link>
        </div>
      </section>
    </main>
  );
}
