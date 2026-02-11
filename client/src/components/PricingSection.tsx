import { useState } from "react";
import { Check, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const packages = [
  {
    id: 1,
    name: "The Foundation",
    tagline: "Legal & Digital Presence in <30 Days",
    description: "Founders needing a legal & digital presence in less than 30 days",
    price: "AED 12,500",
    speed: "21-30 Days",
    roots: [
      "Trade License Setup",
      "Business Registration",
      "Basic Banking Setup",
    ],
    growth: [
      "Professional Website",
      "Brand Copy & Messaging",
      "Social Media Profiles",
    ],
    highlight: false,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    id: 2,
    name: "The Scaler",
    tagline: "Hire & Dominate Local Search",
    description: "Companies ready to hire and dominate local search",
    price: "AED 28,000",
    speed: "30-45 Days",
    roots: [
      "Everything in Foundation",
      "PRO License (up to 5 employees)",
      "HR & Payroll Setup",
    ],
    growth: [
      "SEO Optimization",
      "Meta Ad Spend Strategy",
      "Monthly Analytics & Reporting",
    ],
    highlight: true,
    gradient: "from-pink-500 to-cyan-500",
  },
  {
    id: 3,
    name: "The Fortress",
    tagline: "Retention & Tax Efficiency",
    description: "Brands focused on retention and tax efficiency",
    price: "AED 45,000",
    speed: "45-60 Days",
    roots: [
      "Everything in Scaler",
      "Accounting & Tax Setup",
      "Legal Compliance Audit",
    ],
    growth: [
      "Email Marketing & CRM",
      "Content Calendar & Strategy",
      "Quarterly Business Reviews",
    ],
    highlight: false,
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    id: 4,
    name: "The Visionary",
    tagline: "Long-Term Strategic Partnership",
    description: "Firms seeking a long-term strategic partner",
    price: "Custom",
    speed: "Ongoing",
    roots: [
      "Everything in Fortress",
      "Fractional COO Services",
      "Executive Office Support",
    ],
    growth: [
      "Fractional CMO Strategy",
      "Growth Hacking & Innovation",
      "Dedicated Account Manager",
    ],
    highlight: false,
    gradient: "from-blue-500 to-purple-500",
  },
];

export default function PricingSection() {
  const [showRoots, setShowRoots] = useState(true);

  return (
    <section id="packages" className="py-20 px-4 md:px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
              Choose Your Growth Path
            </span>
          </h2>
          <p className="text-xl text-foreground/70 mb-8">
            Every package includes both Roots (operational) and Growth (digital) services
          </p>

          {/* Roots/Growth Toggle */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <button
              onClick={() => setShowRoots(true)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                showRoots
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                  : "bg-white/10 text-foreground/70 hover:text-foreground"
              }`}
            >
              <span className="flex items-center gap-2">
                🌱 Roots (Operational)
              </span>
            </button>
            <div className="text-foreground/50">+</div>
            <button
              onClick={() => setShowRoots(false)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                !showRoots
                  ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg"
                  : "bg-white/10 text-foreground/70 hover:text-foreground"
              }`}
            >
              <span className="flex items-center gap-2">
                🚀 Growth (Digital)
              </span>
            </button>
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative group rounded-2xl backdrop-blur-xl transition-all duration-300 ${
                pkg.highlight
                  ? "ring-2 ring-purple-400 scale-105 md:scale-100 lg:scale-105"
                  : ""
              }`}
            >
              {/* Gradient Border */}
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${pkg.gradient} p-0.5 opacity-0 group-hover:opacity-100 transition-opacity`}
              ></div>

              {/* Card Content */}
              <div className="relative bg-white/95 rounded-2xl p-6 h-full flex flex-col">
                {/* Popular Badge */}
                {pkg.highlight && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Header */}
                <div className="mb-6 pt-2">
                  <h3 className="text-2xl font-bold text-foreground mb-1">
                    {pkg.name}
                  </h3>
                  <p className="text-sm font-semibold text-purple-600 mb-2">
                    {pkg.tagline}
                  </p>
                  <p className="text-xs text-foreground/60">{pkg.description}</p>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <p className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
                    {pkg.price}
                  </p>
                  <div className="flex items-center gap-2 mt-2 text-xs text-foreground/60">
                    <Zap size={14} className="text-yellow-500" />
                    <span>Live in {pkg.speed}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-3 mb-8 flex-1">
                  {(showRoots ? pkg.roots : pkg.growth).map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground/80">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Button
                  className={`w-full bg-gradient-to-r ${pkg.gradient} text-white border-0 hover:opacity-90`}
                >
                  Get Started
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Note */}
        <div className="mt-16 text-center">
          <p className="text-foreground/70 text-sm">
            All packages include 24/7 support, quarterly strategy sessions, and access to our founder community.
          </p>
        </div>
      </div>
    </section>
  );
}
