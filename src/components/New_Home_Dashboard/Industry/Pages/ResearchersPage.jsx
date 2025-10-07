import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { BookOpen, FlaskConical, PenTool, Globe2, CheckCircle, Video, Settings } from "lucide-react";

// Services Data
const services = [
    {
        icon: BookOpen,
        title: "OCR Core & Advanced",
        desc: "Extracts text from images, PDFs, and handwritten notes with high accuracy.",
        useCases: [
            "Digitize handwritten notes, lab notebooks, and scanned research papers",
            "Convert archived documents or reference books into searchable text",
            "Extract formulas, tables, and figures for data analysis",
            "Streamline citation management and literature archiving",
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
        desc: "Turns raw documents, links, or ideas into structured, engaging stories for blogs, web stories, and social media.",
        useCases: [
            "Generate research summaries and executive reports",
            "Convert raw research notes into structured articles or insights",
            "Produce blog posts or web stories to share findings with a wider audience",
            "Organize ideas into presentations, reports, or structured documentation",
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
            "Convert PDF research papers into editable Word documents",
            "Batch process multiple reports or datasets",
            "Maintain formatting for academic publications or presentations",
            "Export PPTx and Docx formats for conferences, seminars, or lectures",
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
            "Translate research papers, case studies, and references into multiple languages",
            "Maintain technical accuracy and context in translations",
            "Facilitate international collaboration and cross-border research",
            "Translate summaries, abstracts, and conference papers efficiently",
        ],
        features: [
            "50+ languages",
            "Context preservation",
            "Style maintenance",
            "Cultural adaptation",
        ],
    },
    {
        icon: BookOpen,
        title: "Summarization & QnA",
        desc: "Condenses long documents and generates intelligent Q&A for learning and research.",
        useCases: [
            "Summarize academic papers, reports, and literature for faster review",
            "Generate key questions and Q&A for study or peer discussions",
            "Extract critical insights from research datasets and notes",
            "Assist in writing literature reviews or structured research documents",
        ],
        features: [
            "Document summarization",
            "Q&A generation",
            "Key insights extraction",
            "Research assistance",
        ],
    },
    {
        icon: BookOpen,
        title: "DocviewerAI",
        desc: "Generate stories, transform documents, translate, summarize, and automate—no setup needed.",
        useCases: [
            "Instantly process research notes, scanned papers, and study material",
            "Summarize, structure, or generate content from multiple sources",
            "No coding or setup required — works directly in the browser",
        ],
        features: [
            "Start instantly",
            "Browser-based tools",
            "No-code workflows",
            "Fast results",
        ],
    },
    {
        icon: Settings,
        title: "Custom AI Workflow Automation",
        desc: "End-to-end automation for content and document pipelines tailored to your team and systems.",
        useCases: [
            "Automate data extraction, note organization, and reporting",
            "Schedule research document processing or publication workflows",
            "Integrate AI with reference management tools, Google Drive, or collaboration platforms",
            "Monitor and manage research pipelines with dashboards and alerts",
        ],
        // features: [
        //     "Custom workflows",
        //     "API integration",
        //     "Scalable solutions",
        //     "Enterprise support",
        //     "Bulk posting",
        //     "Workflow orchestration",
        //     "Human-in-the-loop reviews",
        //     "Drive/Notion/Slack connectors",
        //     "Monitoring & SLAs",
        // ],
        features: [
            "Custom workflows & orchestration",
            "API & Drive/Notion/Slack integration",
            "Scalable enterprise solutions",
            "Bulk posting & monitoring",
            "Human-in-the-loop reviews & SLAs",
        ],

    },
    {
        icon: Video,
        title: "Video Clipper",
        desc: "Create short, educational or research-focused video snippets from recorded content.",
        useCases: [
            "Clip lectures, conference talks, or lab demos for quick sharing",
            "Prepare video summaries or highlights of presentations",
            "Integrate video content into research repositories or teaching platforms",
            "Save time in creating visual documentation for findings",
        ],
        features: ["Trim and clip videos quickly",
            "Add timestamps and highlights",
            "Export ready for YouTube",
            "High-quality video output",
            "Fast and browser-based",],
    },
];

// Benefits
const benefits = [
    "Save Time – Automate note-taking, summarization, and data extraction",
    "Enhance Accuracy – OCR and AI ensure precise transcription and content structuring",
    "Accelerate Research – Summarize papers and extract insights faster",
    "Streamline Collaboration – Share digital research content with teams",
    "Integrate Seamlessly – Works with LMS, Google Drive, Notion, Slack, and reference tools",
    "Scalable for Teams & Labs – Suitable for individual researchers or entire departments",
];

// FAQs
const faqs = [
    {
        q: "How can I digitize handwritten research notes and old manuscripts?",
        a: "Use OCR Core & Advanced to convert handwritten or scanned content into editable and searchable text.",
    },
    {
        q: "Can AI help summarize long research papers?",
        a: "Yes. Summarization & QnA condenses academic documents and generates structured insights or questions.",
    },
    {
        q: "Can I convert PDF papers into editable Word or PPT documents?",
        a: "Absolutely. Doc Transformation preserves formatting and converts PDFs to Word, PPTx, or HTML.",
    },
    {
        q: "Can I translate research material into multiple languages?",
        a: "Yes. Doc Translation supports 50+ languages while maintaining technical and contextual accuracy.",
    },
    {
        q: "Can AI help organize and automate research workflows?",
        a: "Yes. Custom AI Workflow Automation streamlines note-taking, document processing, and reporting pipelines.",
    },
    {
        q: "Can I create video summaries of research presentations or lectures?",
        a: "Yes. Video Clipper allows clipping lectures and presentations into short, shareable educational videos.",
    },
];

export default function ResearchersPage() {
    const [faqOpen, setFaqOpen] = useState(null);

    return (
        <main className="bg-background text-foreground font-sans">
            {/* Meta */}
            <Helmet>
                <title>AI Services for Researchers & Thinkers | Contentlab</title>
                <meta
                    name="description"
                    content="Explore AI-powered solutions for researchers and thinkers. From OCR, Story Generation, Doc Transformation, Translation, Summarization, and Video Clipping — streamline literature review, extract insights, and automate research workflows."
                />
            </Helmet>

            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-orange-50 to-orange-100 py-24 px-6 text-center">
                <div className="max-w-5xl mx-auto">
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                        AI Tools for Researchers & Thinkers
                    </h1>
                    <h2 className="text-2xl text-gray-700 mb-6">
                        Streamline research, extract insights, and manage knowledge efficiently.
                    </h2>
                    <p className="text-lg text-gray-700 mb-6 max-w-3xl mx-auto">
                        <span className="font-semibold text-[#E6A24B]">Contentlab</span>’s AI tools help researchers and thinkers process large volumes of documents, extract key information, and generate structured content. From digitizing handwritten notes to summarizing academic papers, our platform empowers you to focus on insights, not manual data processing.
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
                    Our Services for Researchers & Thinkers
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

                            {s.useCases.length > 0 && (
                                <>
                                    <h4 className="font-semibold text-gray-900 mb-2">Use Cases:</h4>
                                    <ul className="list-disc pl-5 text-gray-700 mb-4 space-y-1">
                                        {s.useCases.map((uc, i) => (
                                            <li key={i}>{uc}</li>
                                        ))}
                                    </ul>
                                </>
                            )}

                            {s.features.length > 0 && (
                                <>
                                    <h4 className="font-semibold text-gray-900 mb-2">Key Features:</h4>
                                    <ul className="list-disc pl-5 text-gray-700 space-y-1">
                                        {s.features.map((f, i) => (
                                            <li key={i}>{f}</li>
                                        ))}
                                    </ul>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* Benefits Section */}
            <section className="bg-orange-50 py-24 px-6">
                <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
                    Benefits for Researchers & Thinkers
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

            {/* CTA Section */}
            <section className="bg-[#E6A24B] text-white py-24 px-6 text-center">
                <h2 className="text-4xl font-bold mb-8">
                    Accelerate your research and knowledge workflows with AI-powered tools
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
                        Contact Us for Research Solutions
                    </Link>
                </div>
            </section>
        </main>
    );
}
