import { CheckCircle } from "lucide-react";

export default function PricingPage() {
  const plans = [
    {
      name: "Starter",
      price: "₹499",
      period: "/month",
      description: "For individuals exploring Content Labs tools.",
      features: [
        "Access to all core features",
        "5 GB secure cloud storage",
        "Basic email support",
        "Single user access",
      ],
      button: "Get Started",
      highlight: false,
    },
    {
      name: "Pro",
      price: "₹1,499",
      period: "/month",
      description: "For growing teams that need advanced collaboration & insights.",
      features: [
        "Everything in Starter",
        "50 GB secure cloud storage",
        "Priority chat & email support",
        "Up to 10 team members",
        "Advanced analytics & reports",
      ],
      button: "Start Free Trial",
      highlight: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "Tailored solutions for large organizations & enterprises.",
      features: [
        "Unlimited storage",
        "Dedicated account manager",
        "24/7 priority support",
        "Custom integrations",
        "Onboarding & training",
      ],
      button: "Contact Sales",
      highlight: false,
    },
  ];

  return (
    <div className="bg-background min-h-screen py-16 px-6 sm:px-12 lg:px-20">
      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
          Pricing Plans for Every Team
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Content Labs gives you simple, flexible, and transparent pricing.  
          Scale seamlessly as your projects and teams grow.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, idx) => (
          <div
            key={idx}
            className={`flex flex-col justify-between rounded-2xl shadow-md p-8 border transition-transform hover:scale-105 ${
              plan.highlight
                ? "border-[#E6A24B] shadow-xl"
                : "border-gray-200"
            } bg-white`}
          >
            <div>
              <h3 className="text-2xl font-semibold text-gray-900">
                {plan.name}
              </h3>
              <p className="mt-2 text-gray-600">{plan.description}</p>

              <div className="mt-6 flex items-baseline">
                <span className="text-4xl font-bold text-gray-900">
                  {plan.price}
                </span>
                <span className="ml-2 text-lg text-gray-600">
                  {plan.period}
                </span>
              </div>

              <ul className="mt-6 space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-gray-700">
                    <CheckCircle className="h-5 w-5 text-[#E6A24B] mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <button
                className={`w-full py-3 px-5 rounded-xl font-medium text-lg transition ${
                  plan.highlight
                    ? "bg-[#E6A24B] hover:bg-[#d68d32] text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                }`}
              >
                {plan.button}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer note */}
      <div className="text-center mt-12 text-gray-500 text-sm">
        No contracts. No hidden fees. Cancel anytime.
      </div>
    </div>
  );
}
