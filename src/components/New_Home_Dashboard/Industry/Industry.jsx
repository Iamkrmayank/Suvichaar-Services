import React from "react";
import { Helmet } from "react-helmet";
import {
  School,
  University,
  BookOpen,
  FlaskConical,
  PenTool,
  Globe2,
  Building2,
} from "lucide-react";
const IndustrySection = () => {
  const items = [
    {
      icon: <School className="w-6 h-6 text-[#E6A24B]" />,
      title: "Schools",
      desc: "Digitize notes, assignments, and worksheets with OCR. Turn teaching material into digital learning content, summaries, quizzes, and lesson aids.",
      link: "/industry/school-college-page",
    },
    {
      icon: <University className="w-6 h-6 text-[#E6A24B]" />,
      title: "Colleges",
      desc: "Streamline workflows like admissions, records, research papers, and study materials. Automate content transformation for academic use.",
      link: "/industry/school-college-page",
    },
    {
      icon: <BookOpen className="w-6 h-6 text-[#E6A24B]" />,
      title: "Educators & Teachers",
      desc: "Convert lesson plans, notes, and exams into editable text. Use Story Generation to create engaging study content, summaries, and presentations.",
      link: "/industry/educators-page",
    },
    {
      icon: <FlaskConical className="w-6 h-6 text-[#E6A24B]" />,
      title: "Researchers & Thinkers",
      desc: "Extract insights from research papers with Summarization & QnA. Digitize scanned references using OCR and generate structured notes & citations.",
      link: "/industry/researchers-page",
    },
    {
      icon: <PenTool className="w-6 h-6 text-[#E6A24B]" />,
      title: "Writers & Publications",
      desc: "Turn manuscripts and drafts into editable text with OCR. Generate blurbs, synopses, and story ideas. Republish and transform old works easily.",
      link: "/industry/writers-page",
    },
    {
      icon: <Globe2 className="w-6 h-6 text-[#E6A24B]" />,
      title: "Social Organizations",
      desc: "Convert reports, field notes, and surveys into structured documents. Use AI for summarization, Q&A, and communication workflows.",
      link: "/solutions/social-orgs",
    },
    {
      icon: <Building2 className="w-6 h-6 text-[#E6A24B]" />,
      title: "Corporates & Offices",
      desc: "Automate contracts, invoices, compliance docs, and HR records with OCR & AI workflows. Push extracted data into dashboards and tools.",
      link: "/industry/corporate-services-page",
    },
  ];

  return (
    <section id="industry" className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <header className="max-w-3xl mb-16 text-center mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Industries We Serve
          </h2>
          <p className="mt-6 text-lg text-gray-600 leading-relaxed">
            Contentlab provides intelligent AI tools that adapt to your industry’s needs.
            From digitizing notes to automating compliance documents, we help you work smarter, faster, and more accurately.
          </p>
        </header>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {items.map((it) => (
            <div
              key={it.title}
              className="group bg-white rounded-2xl shadow-md p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-gray-100"
            >
              <div className="flex items-center gap-3 mb-4">
                {it.icon}
                <h3 className="text-xl font-semibold text-gray-800 group-hover:text-[#E6A24B] transition-colors duration-300">
                  {it.title}
                </h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">{it.desc}</p>
              <a
                href={it.link}
                className="text-[#E6A24B] font-medium text-sm transform transition-transform duration-200 hover:scale-105 active:scale-95"
              >
                Explore Solutions →
              </a>


            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const IndustryPage = () => {
  const benefits = [
    "Tailored AI tools for your sector",
    "Secure, accurate, and fast processing",
    "Save hours of manual work",
    "Ready-to-use workflows + custom API support",
    "Scalable from small teams to enterprise",
  ];

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center">
      {/* Meta Tags */}
      <Helmet>
        <title>Explore AI Tools by Industry | Contentlab</title>
        <meta
          name="description"
          content="Discover how AI-powered tools like OCR, Story Generation, Document Transformation, Translation, and Summarization help schools, colleges, educators, researchers, writers, corporates, and more. Tailored solutions for every industry."
        />
        <meta
          name="keywords"
          content="AI for schools, AI for colleges, AI for teachers, AI for researchers, AI for writers, AI document tools for industries, OCR for education, AI content tools for publishing, AI workflow for corporates, AI for NGOs, document automation for industries"
        />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gray-50 w-full text-center">
        <div className="max-w-4xl mx-auto px-6 py-24">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            AI Solutions for Every Industry
          </h1>
          <h2 className="text-xl md:text-2xl text-gray-700 mb-8">
            Tailored AI tools to simplify your document and content workflows.
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-10">
            At <span className="text-[#E6A24B] font-semibold">Contentlab</span>, we know every industry has unique challenges with documents, text, images, and ideas.
            Our AI-powered tools — including OCR, Story Generation, Document Transformation, Translation, and Summarization — help you save time, reduce manual effort, and enhance productivity.
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="/#industry"
              className="bg-[#E6A24B] text-white font-medium py-3 px-8 rounded-lg shadow-md transform transition-transform duration-200 hover:scale-105 active:scale-95"
            >
              Explore Solutions
            </a>
            <a
              href="https://labs.suvichaar.org"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-gray-300 text-gray-700 font-medium py-3 px-8 rounded-lg shadow-md transform transition-transform duration-200 hover:scale-105 active:scale-95"
            >
              Start Free Today
            </a>
          </div>
        </div>
      </section>

      {/* Industry Use Cases */}
      <IndustrySection />

      {/* Benefits */}
      <section className="bg-gradient-to-b from-gray-50 to-gray-100 w-full text-center py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-10">
            Why Choose Contentlab for Industries?
          </h2>
          <ul className="space-y-4 text-gray-700 text-lg">
            {benefits.map((b, idx) => (
              <li key={idx} className="flex items-center gap-3 justify-center">
                <span className="text-[#E6A24B] font-bold">✓</span> {b}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#E6A24B] w-full text-center text-white py-20">
        <h2 className="text-3xl font-bold mb-8">
          Every industry has unique document challenges.
          <br /> Contentlab AI makes them simple.
        </h2>
        <div className="flex justify-center gap-4">
          <a
            href="https://labs.suvichaar.org"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-[#E6A24B] font-medium py-3 px-8 rounded-lg shadow-md transform transition-transform duration-200 hover:scale-105 active:scale-95"
          >
            Start Free Today
          </a>
          <a
            href="/contact"
            className="bg-gray-900 text-white font-medium py-3 px-8 rounded-lg shadow-md transform transition-transform duration-200 hover:scale-105 active:scale-95"
          >
            Contact Us for a Demo
          </a>
        </div>
      </section>
    </main>
  );
};

export default IndustryPage;
