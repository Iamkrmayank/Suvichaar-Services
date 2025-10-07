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
    Settings, Zap, Link2, Rocket
} from "lucide-react";

// Services Data
const services = [
    {
        icon: BookOpen,
        title: "OCR Core & Advanced",
        desc: "Extracts text from images, PDFs, and handwritten notes with high accuracy.",
        useCases: [
            "Digitize manuscripts, drafts, and scanned notes for editing",
            "Convert archived content and research material into searchable text",
            "Recognize tables, formulas, and structured data in technical publications",
            "Automate document organization and metadata extraction",
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
            "Generate book summaries, blurbs, and synopses from drafts",
            "Convert research or raw notes into structured articles",
            "Create blog posts, web stories, and social media content for audience engagement",
            "Organize ideas into chapters, sections, or multimedia content",
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
            "Convert PDF manuscripts into editable Word or Docx formats",
            "Batch process multiple drafts for editing or publishing",
            "Maintain formatting for books, journals, and reports",
            "Export PPTx for presentations or pitch decks",
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
            "Translate books, articles, or publications into multiple languages",
            "Maintain writing style, tone, and cultural context",
            "Enable global reach and multilingual publishing",
            "Translate author notes, summaries, and marketing content",
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
        desc: "Condenses long documents and generates intelligent Q&A for learning and research.",
        useCases: [
            "Summarize long manuscripts, reports, or research material",
            "Generate chapter summaries, editorial briefs, or reading guides",
            "Extract key points for publishing or marketing purposes",
            "Assist editors and writers in structuring content efficiently",
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
        desc: "End-to-end automation for content and document pipelines tailored to your team and systems.",
        useCases: [
            "Automate manuscript processing, content formatting, and version control",
            "Schedule publication or content distribution workflows",
            "Integrate with CMS, Google Drive, Notion, or Slack for streamlined publishing",
            "Monitor content pipelines with dashboards and analytics",
        ],
        features: [
            "Custom workflows & orchestration",
            "API & Drive/Notion/Slack integration",
            "Scalable enterprise solutions",
            "Bulk posting & monitoring",
            "Human-in-the-loop reviews & SLAs",
        ],
    },
    {
        icon: PenTool,
        title: "DocviewerAI",
        desc: "Generate stories, transform documents, translate, summarize, and automate—no setup needed.",
        useCases: [
            "Instantly process drafts, manuscripts, and reference documents",
            "Summarize or restructure content for editing and publication",
            "Browser-based, no coding required",
        ],
        features: [
            "Start instantly",
            "Browser-based tools",
            "No-code workflows",
            "Fast results",
        ],
    },
    {
        icon: Video,
        title: "Video Clipper",
        desc: "Create short video snippets from recorded content or presentations.",
        useCases: [
            "Clip author interviews, book readings, or presentations for social media",
            "Prepare teasers or promotional videos for books and publications",
            "Integrate videos into marketing campaigns or e-learning materials",
            "Save time in creating visual content for engagement",
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
    "Save Time – Automate manuscript digitization, editing, and content generation",
    "Enhance Quality – AI ensures precise transcription, summarization, and formatting",
    "Accelerate Publishing – Generate summaries, synopses, and structured content quickly",
    "Streamline Workflows – Integrate editing, translation, and content distribution in one platform",
    "Seamless Integration – Works with CMS, Google Drive, Notion, Slack, and other tools",
    "Scalable Solutions – Suitable for individual authors or publishing houses",
];

// FAQs
const faqs = [
    {
        q: "Can I convert handwritten manuscripts into editable text?",
        a: "Yes. OCR Core & Advanced digitizes handwritten or scanned manuscripts for easy editing.",
    },
    {
        q: "Can AI help structure and summarize books or articles?",
        a: "Yes. Story Generation and Summarization & QnA create summaries, chapter outlines, and structured content.",
    },
    {
        q: "Can PDF manuscripts be converted into Word or Docx for editing?",
        a: "Absolutely. Doc Transformation preserves layout and converts documents into editable formats.",
    },
    {
        q: "Can my content be translated into multiple languages?",
        a: "Yes. Doc Translation supports 50+ languages while preserving tone, style, and context.",
    },
    {
        q: "Can I automate content workflows for publishing?",
        a: "Yes. Custom AI Workflow Automation streamlines manuscript processing, scheduling, and distribution pipelines.",
    },
    {
        q: "Can I create promotional video snippets for books or articles?",
        a: "Yes. Video Clipper enables quick creation of short, shareable video content for marketing or engagement.",
    },
];

export default function WritersPage() {
    const [faqOpen, setFaqOpen] = useState(null);

    return (
        <main className="bg-background text-foreground font-sans">
            {/* Meta */}
            <Helmet>
                <title>AI Services for Writers & Publications | Contentlab</title>
                <meta
                    name="description"
                    content="Explore AI-powered solutions for writers and publishers. From OCR, Story Generation, Doc Transformation, Translation, Summarization, and Video Clipping — digitize manuscripts, structure content, and automate publishing workflows."
                />
            </Helmet>

            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-orange-50 to-orange-100 py-24 px-6 text-center">
                <div className="max-w-5xl mx-auto">
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                        AI Services for Writers & Publishers
                    </h1>
                    <p className="text-xl text-gray-700 mb-6 max-w-3xl mx-auto">
                        Digitize, structure, and enhance your content creation and publishing workflows. Contentlab’s AI tools help writers, authors, and publishers save time, improve content quality, and manage multiple documents efficiently.
                    </p>
                    <div className="flex justify-center gap-4 mt-6">
                        <Link
                            to="https://labs.suvichaar.org"
                            className="bg-[#E6A24B] text-white font-medium py-3 px-8 rounded-lg shadow-md hover:scale-105 transition-transform"
                        >
                            Start Free Today
                        </Link>
                        <Link
                            to="/contact"
                            className="border border-gray-300 text-gray-700 font-medium py-3 px-8 rounded-lg shadow-md hover:scale-105 transition-transform"
                        >
                            See AI in Action
                        </Link>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-24 px-6 max-w-7xl mx-auto">
                <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
                    Our Services for Writers & Publications
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
                    Benefits for Writers & Publications
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
                        Why Choose Contentlab AI for Writers & Publications
                    </h2>
                    <div className="flex flex-wrap justify-center gap-8">
                        {[
                            {
                                icon: Settings,
                                title: "Tailored AI Tools",
                                text: "Specialized solutions for writing, editing, and publishing workflows."
                            },
                            {
                                icon: Zap,
                                title: "Automation",
                                text: "Automate digitization, summarization, translation, and content structuring."
                            },
                            {
                                icon: BookOpen,
                                title: "Content Generation",
                                text: "Quickly generate synopses, summaries, and marketing content."
                            },
                            {
                                icon: Link2,
                                title: "Seamless Integration",
                                text: "Works with CMS, Google Drive, Notion, Slack, and other publishing tools."
                            },
                            {
                                icon: Rocket,
                                title: "Fast & Scalable",
                                text: "Ideal for individual authors, editors, and entire publishing teams."
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
                    Empower your writing and publishing workflow with AI-powered tools
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
                        Contact Us for Publishing Solutions
                    </Link>
                </div>
            </section>
        </main>
    );
}
