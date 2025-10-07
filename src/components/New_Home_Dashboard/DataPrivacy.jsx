import React from "react";
import { Shield, Lock, Eye, Zap } from "lucide-react";

const privacyFeatures = [
  {
    icon: Shield,
    title: "Fully Encrypted",
    description: "All data is encrypted end-to-end during transmission and processing.",
  },
  {
    icon: Eye,
    title: "Complete Transparency",
    description: "Clear visibility into how your data is processed and handled.",
  },
  {
    icon: Lock,
    title: "No Storage",
    description: "Your documents are never stored on our servers after processing.",
  },
  {
    icon: Zap,
    title: "Real-time Processing",
    description: "Instant processing with immediate results and automatic data deletion.",
  },
];

export function DataPrivacy() {
  return (
    <section id="privacy" className="py-24 sm:py-32 ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wide text-[#2B2B2B] leading-snug">
            Your Data Privacy is Our Priority
          </h2>
          <p className="mt-4 text-lg sm:text-xl text-[#555555] max-w-xl mx-auto">
            We ensure complete data security with transparent, real-time processing that never stores your information.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {privacyFeatures.map((feature, idx) => (
            <div
              key={idx}
              className="bg-[#F9F5F0] border border-[#E6A24B]/20 rounded-2xl shadow-md hover:shadow-xl transition-shadow p-6 flex flex-col items-center text-center"
            >
              {/* Icon */}
              <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-[#E6A24B]/10 mb-4">
                <feature.icon className="h-6 w-6 text-[#E6A24B]" />
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl font-semibold text-[#2B2B2B] mb-2">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-sm sm:text-base text-[#555555]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
