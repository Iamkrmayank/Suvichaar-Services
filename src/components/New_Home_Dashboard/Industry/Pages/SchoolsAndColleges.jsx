
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
// Service Icons
import {
    FileText,
    BookOpen,
    Languages,
    ListChecks,
    Zap,
    GraduationCap,
    PlayCircle, Settings, Link2, Rocket
} from "lucide-react";

export default function SchoolCollegePage() {
    const [faqOpen, setFaqOpen] = useState(null);
    const services = [
        {
            icon: FileText,
            title: "OCR Core & Advanced",
            description:
                "Extracts text from images, PDFs, and handwritten notes with high accuracy.",
            useCases: [
                "Convert scanned worksheets and handwritten notes into editable text",
                "Digitize library books and study material for easy access",
                "Recognize math equations, formulas, and tables",
                "Streamline grading and record-keeping with structured output",
                "Automate repetitive scanning tasks for digital learning platforms",
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
            icon: BookOpen,
            title: "Story Generation",
            description:
                "Turn raw documents, links, or ideas into structured, engaging stories for blogs, web stories, and social media.",
            useCases: [
                "Generate chapter summaries and study guides",
                "Create web stories or blog posts for college websites",
                "Produce interactive quizzes and assignments",
                "Prepare PPTx presentations for classroom sessions",
            ],
            features: [
                "Content creation for blogs & social media",
                "Web stories generation",
                "Structured story formatting",
                "PPTx presentations",
                "Interactive quizzes",
            ],
        },
        {
            icon: FileText,
            title: "Doc Transformation",
            description:
                "Converts documents across formats while retaining layout and branding.",
            useCases: [
                "Convert PDF assignments to Word or editable formats",
                "Batch process multiple worksheets or reports",
                "Maintain formatting for lesson notes or presentations",
                "Export PPTx and Docx for classroom content",
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
            icon: Languages,
            title: "Doc Translation",
            description:
                "Multilingual, context-aware translation that preserves meaning and style.",
            useCases: [
                "Translate lesson plans, assignments, and handouts into multiple languages",
                "Preserve context and academic style in translated content",
                "Enable inclusive learning for diverse students",
                "Translate study material, notices, and newsletters efficiently",
            ],
            features: [
                "50+ language support",
                "Context-aware translation",
                "Preserves academic style",
                "Cultural adaptation",
                "Inclusive learning enabled",
            ],
        },
        {
            icon: ListChecks,
            title: "Summarization & QnA",
            description:
                "Condenses long documents and generates intelligent Q&A for learning and research.",
            useCases: [
                "Summarize chapters or lecture notes for faster learning",
                "Generate practice questions, quizzes, and exam prep content",
                "Extract key insights from research papers or assignments",
                "Assist in lesson planning and student evaluations",
            ],
            features: [
                "Document summarization",
                "Q&A generation",
                "Key insights extraction",
                "Exam & quiz prep",
                "Research assistance",
            ],
        },
        {
            icon: Zap,
            title: "Custom AI Workflow Automation",
            description:
                "End-to-end automation for content and document pipelines tailored to your team and systems.",
            useCases: [
                "Automate assignment processing, grading, and record-keeping",
                "Schedule bulk posting of learning materials",
                "Integrate with Google Drive, Notion, Slack, or LMS platforms",
                "Monitor workflows with dashboards and SLAs",
            ],
            features: [
                "Custom workflow automation",
                "API & LMS integration",
                "Bulk content posting",
                "Monitoring & dashboards",
                "Human-in-the-loop reviews",
            ],
        },
        {
            icon: GraduationCap,
            title: "DocviewerAI",
            description:
                "Generate stories, transform documents, translate, summarize, and automate — no setup needed.",
            useCases: [
                "Start processing content instantly in the browser",
                "Convert documents, generate stories, or summarize lessons",
                "Ideal for teachers, admin staff, and college departments",
            ],
            features: [
                "Instant browser access",
                "Stories & document processing",
                "Translation & summarization",
                "No-code workflow",
                "Fast & easy to use",
            ],
        },
        {
            icon: PlayCircle,
            title: "Video Clipper",
            description:
                "Create short, educational video snippets from recorded lectures or content.",
            useCases: [
                "Clip and share lecture highlights or tutorials",
                "Prepare short learning videos for students",
                "Integrate videos into digital learning platforms",
                "Save time in video content creation for remote learning",
            ],
            features: [
                "Clip videos easily",
                "Create educational snippets",
                "Integration with digital platforms",
                "Time-saving workflow",
                "Student-friendly learning content",
            ],
        },
    ];


    // ---------------- Benefits ----------------
    const benefits = [
        "Save Time – Automate repetitive tasks like scanning, grading, and content creation",
        "Increase Accuracy – AI ensures high precision in OCR, translation, and summaries",
        "Enhance Learning – Create interactive, shareable study material",
        "Enable Digital Classrooms – Move from paper-heavy workflows to fully digital",
        "Integrate Easily – Works with LMS, Google Classroom, Notion, and Slack",
        "Scalable Solutions – Supports single teachers, entire schools, or large college departments",
    ];

    // ---------------- FAQs ----------------
    const faqs = [
        {
            q: "How can I digitize handwritten notes and worksheets?",
            a: "Use OCR Core & Advanced to instantly convert handwritten or scanned content into editable text for students and teachers.",
        },
        {
            q: "Can AI help generate summaries or quizzes for class material?",
            a: "Yes. Story Generation and Summarization & QnA tools automatically create summaries, interactive quizzes, and study guides.",
        },
        {
            q: "Is it possible to convert PDF assignments into editable Word or PPT files?",
            a: "Absolutely. Doc Transformation preserves formatting and layout while converting PDFs into Word, PPTx, or HTML formats.",
        },
        {
            q: "Can we translate study material into multiple languages?",
            a: "Yes. Doc Translation supports 50+ languages with context preservation and academic style maintenance.",
        },
        {
            q: "Can video lectures be clipped into shorter educational snippets?",
            a: "Yes. Video Clipper allows teachers and staff to create short, shareable video lessons for students.",
        },
        {
            q: "How can AI workflows simplify administrative tasks?",
            a: "Custom AI Workflow Automation streamlines grading, record-keeping, bulk posting, and integrates with LMS platforms to save educators significant time.",
        },
    ];

    return (
        <main className="bg-background text-foreground font-sans">
            {/* Meta */}
            <Helmet>
                <title>AI Services for Schools & Colleges | OCR, Story Generation, Doc Transformation & More</title>
                <meta
                    name="description"
                    content="Explore AI-powered solutions for schools and colleges. From OCR, Story Generation, and Doc Transformation to Translation, Summarization, and Video Clipping — streamline educational content, digitize notes, and automate workflows."
                />
                <meta
                    name="keywords"
                    content="OCR for schools, OCR for colleges, AI for educational content, Story Generation for teachers, Doc Transformation for education, Doc Translation for students, Summarization for learning, QnA generation for schools, AI workflow automation for colleges, DocviewerAI for classrooms, Video Clipper for educational content"
                />
            </Helmet>

            <section className="relative bg-gradient-to-r from-orange-50 to-orange-100 py-24 px-6 text-center">
                <div className="max-w-5xl mx-auto">
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                        AI Services for Schools & Colleges
                    </h1>
                    <h2 className="text-2xl text-gray-700 mb-6">
                        Digitize, automate, and enhance educational content seamlessly.
                    </h2>
                    <p className="max-w-3xl mx-auto text-lg text-gray-600 mb-10">
                        <span className="font-semibold text-[#E6A24B]">Contentlab</span>’s AI suite simplifies workflows, enhances learning materials, and saves educators’ valuable time. Convert handwritten notes, generate stories, summarize lessons, and more.
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
                    Our Services for Schools & Colleges
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
                    Benefits for Schools & Colleges
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
                <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
                    Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                    {faqs.map((f, i) => (
                        <div
                            key={i}
                            className="bg-white rounded-xl shadow-md p-6 cursor-pointer transition-all duration-300"
                            onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                        >
                            <div className="flex justify-between items-center">
                                <h3 className="font-semibold text-gray-900">{f.q}</h3>
                                <span className="text-gray-500 font-bold text-xl">{faqOpen === i ? "-" : "+"}</span>
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
                        Why Choose Contentlab AI for Schools & Colleges
                    </h2>
                    <div className="flex flex-wrap justify-center gap-8">
                        {[
                            {
                                icon: Settings,
                                title: "Tailored AI Tools",
                                text: "Specialized AI solutions for educational content."
                            },
                            {
                                icon: Zap,
                                title: "Automation",
                                text: "Automate repetitive tasks and streamline workflows."
                            },
                            {
                                icon: BookOpen,
                                title: "Content Digitization",
                                text: "Digitize, summarize, translate, and generate content instantly."
                            },
                            {
                                icon: Link2,
                                title: "Seamless Integration",
                                text: "Integrates with LMS, Google Classroom, and collaboration tools."
                            },
                            {
                                icon: Rocket,
                                title: "Fast & Scalable",
                                text: "Fast, secure, and scalable solutions for schools and colleges."
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


            {/* <section className="py-24 px-6 bg-gray-50">
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
      </section> */}

            {/* CTA Section */}
            <section className="bg-[#E6A24B] text-white py-24 px-6 text-center">
                <h2 className="text-4xl font-bold mb-8">
                    Empower your school or college with AI-powered educational solutions.
                </h2>
                <div className="flex justify-center gap-4 flex-wrap">
                    <a
                        href="https://labs.suvichaar.org"
                        className="bg-white text-[#E6A24B] font-medium py-3 px-8 rounded-lg shadow-md transform transition-transform duration-200 hover:scale-105 active:scale-95"
                    >
                        👉 Start Free Today
                    </a>
                    <a
                        href="/contact"
                        className="border border-white text-white font-medium py-3 px-8 rounded-lg shadow-md transform transition-transform duration-200 hover:scale-105 active:scale-95"
                    >
                        📩 Contact Us for Education Plans
                    </a>
                </div>
            </section>
        </main>
    );
}
