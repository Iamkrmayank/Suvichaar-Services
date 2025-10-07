import React from "react";

const IndustrySection = () => {
  const items = [
    {
      title: "Educators & Teachers",
      desc: "Turn lesson plans, notes, and handouts into searchable, shareable content. Generate summaries, quizzes, and reading aids with Storytelling AI.",
    },
    {
      title: "Schools and Colleges",
      desc: "Digitize archives and forms, streamline admissions and records, and automate document workflows across departments with secure OCR.",
    },
    {
      title: "Writers and Publishers",
      desc: "Ingest manuscripts, PDFs, and book scans. Extract clean text, reorganize chapters, and generate synopses, blurbs, and metadata.",
    },
    {
      title: "Thinkers and Researchers",
      desc: "Parse papers, highlight insights, and build literature reviews. Create structured notes and citations from scanned documents.",
    },
    {
      title: "Social Organizations",
      desc: "Convert reports, surveys, and field notes into structured data. Automate repetitive documentation and create human-readable briefs.",
    },
    {
      title: "Corporates and Offices",
      desc: "Automate invoices, contracts, and compliance docs. Extract key fields at scale and route them to your workflows and dashboards.",
    },
  ];

  return (
    <section id="industry" className="py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <header className="max-w-3xl mb-12 text-center mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Industry
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Automate your workflow with <span className="text-[#E6A24B] font-semibold">Storytelling AI</span>. 
            Extract, transform, and generate content from any document—fast, accurate, and secure.
          </p>
        </header>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((it) => (
            <div
              key={it.title}
              className="group bg-white rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-gray-100"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-[#E6A24B] transition-colors duration-300">
                {it.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {it.desc}
              </p>
              <div className="mt-4 h-1 w-0 bg-[#E6A24B] group-hover:w-20 transition-all duration-400 rounded-full"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustrySection;
