import React from "react"
import ServiceCard from "./Ui/Cards.jsx"
import { FileText, Sparkles, RefreshCw, Languages, MessageSquare, Wrench, Sliders } from "lucide-react"

const services = [
  {
    icon: FileText,
    title: "OCR Core & Advanced",
    description: "Extracts text from images, PDFs, and handwritten notes with high accuracy.",
    features: [
      "Image & PDF text extraction",
      "Handwriting recognition & structuring",
      "Math equations & formulas",
      "Tables"
    ],
    href: "https://labs.suvichaar.org"
  },
  {
    icon: Sparkles,
    title: "Story Generation",
    description: "Turns raw documents, links, or ideas into structured, engaging stories for blogs, web stories, and social media.",
    features: [
      "Blog content & social media posts",
      "Web stories & content structuring",
      "PPTx generation",
      "Social media content planning"
    ],
    href: "https://labs.suvichaar.org"
  },
  {
    icon: RefreshCw,
    title: "Doc Transformation",
    description: "Converts documents across formats (PDF, Word, HTML, Web Stories) while retaining layout and branding.",
    features: [
      "Format conversion & layout preservation",
      "Brand consistency & batch processing",
      "PPTx support",
      "Docx support"
    ],
    href: "https://labs.suvichaar.org"
  },
  { icon: Languages, title: "Doc Translation", description: "Multilingual, context-aware translation that preserves meaning and style.", features: ["50+ languages", "Context preservation", "Style maintenance", "Cultural adaptation"], href: "https://labs.suvichaar.org" },
  { icon: MessageSquare, title: "Summarization & QnA", description: "Condenses long documents and generates intelligent Q&A for learning and research.", features: ["Document summarization", "Q&A generation", "Key insights extraction", "Research assistance"], href: "https://labs.suvichaar.org" },
  { icon: Wrench, title: "DocviewerAI", description: "Use DocviewerAI to generate stories, transform documents, translate, summarize, and automate—no setup needed.", features: ["Start instantly", "Browser-based tools", "No-code workflows", "Fast results"], href: "https://labs.suvichaar.org" },
]

export function Services() {
  return (
    <section id="services" className="py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto  text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance">
            Our collection of AI services spans various needs at every stage of the transformation process
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Explore how we help businesses transform their document workflows with intelligent automation.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, idx) => (
            <ServiceCard key={idx} {...service} />
          ))}
        </div>
      </div>
    </section>
  )
}
