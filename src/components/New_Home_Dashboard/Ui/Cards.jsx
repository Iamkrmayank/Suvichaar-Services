import React from "react";

export default function ServiceCard({ icon: Icon, title, description, features, href }) {
  const CardInner = (
    <div className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg hover:bg-gray-50 transition-all duration-300 p-6 flex flex-col h-full">
      
      {/* Icon + Title */}
      <div className="flex items-center mb-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#E6A24B]/10 mr-3">
          <Icon className="h-6 w-6 text-[#E6A24B]" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-4">{description}</p>

      {/* Features */}
      <ul className="space-y-2 mt-auto">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-center text-sm text-gray-600">
            <span className="mr-2 h-1.5 w-1.5 rounded-full bg-[#E6A24B] mt-1" />
            {feature}
          </li>
        ))}
      </ul>

      {/* Optional CTA */}
      {href && (
        <div className="mt-4 text-right">
          <span className="text-[#E6A24B] font-medium hover:underline transition-colors cursor-pointer">
            Learn More →
          </span>
        </div>
      )}
    </div>
  );

  return href ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E6A24B]/50 rounded-xl"
      aria-label={`${title} - opens in a new tab`}
    >
      {CardInner}
    </a>
  ) : (
    <div>{CardInner}</div>
  );
}
