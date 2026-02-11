import { useState } from "react";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const solutions = [
  {
    id: 1,
    name: "Essentials Package",
    subtitle: "Low Budget Startup",
    price: "AED 12,500",
    description: "Perfect for bootstrapped founders",
    features: [
      "Business License Setup",
      "Basic Compliance",
      "Domain Registration",
      "Email Setup",
      "Social Media Profiles",
    ],
    gradient: "from-purple-500 to-pink-500",
  },
  {
    id: 2,
    name: "Scale Package",
    subtitle: "Growth Stage",
    price: "AED 28,000",
    description: "For growing tech companies",
    features: [
      "Everything in Essentials",
      "Advanced Compliance",
      "Website Development",
      "SEO Optimization",
      "Social Media Management",
      "Monthly Analytics",
    ],
    gradient: "from-pink-500 to-cyan-500",
  },
  {
    id: 3,
    name: "Complete Package",
    subtitle: "Enterprise",
    price: "Custom Pricing",
    description: "Full-service solution",
    features: [
      "Everything in Scale",
      "Custom Development",
      "Dedicated Account Manager",
      "24/7 Support",
      "Marketing Strategy",
      "Brand Development",
    ],
    gradient: "from-cyan-500 to-blue-500",
  },
];

export default function SolutionsSlider() {
  const [activeIndex, setActiveIndex] = useState(1);

  const goToPrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? solutions.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setActiveIndex((prev) => (prev === solutions.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="solutions" className="py-20 px-4 md:px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
              Choose Your Path
            </span>
          </h2>
          <p className="text-xl text-foreground/70">
            Flexible pricing packages tailored to your startup stage
          </p>
        </div>

        {/* Slider Container */}
        <div className="relative">
          <div className="flex items-center justify-center gap-4">
            {/* Left Arrow */}
            <button
              onClick={goToPrevious}
              className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 transition-all"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Cards Container */}
            <div className="flex-1 overflow-hidden">
              <div className="flex gap-6 justify-center">
                {solutions.map((solution, index) => {
                  const isActive = index === activeIndex;
                  const distance = Math.abs(index - activeIndex);

                  return (
                    <div
                      key={solution.id}
                      className={`transition-all duration-300 ${
                        isActive ? "scale-100 opacity-100" : "scale-90 opacity-50"
                      } ${distance > 1 ? "hidden md:block" : ""}`}
                      style={{
                        minWidth: isActive ? "320px" : "280px",
                      }}
                    >
                      <div className={`relative group h-full rounded-2xl backdrop-blur-xl bg-gradient-to-br ${solution.gradient} p-0.5 shadow-2xl`}>
                        <div className="absolute inset-0 rounded-2xl bg-white/10 group-hover:bg-white/20 transition-all"></div>
                        <div className="relative bg-white/95 rounded-2xl p-8 h-full flex flex-col">
                          <div className="mb-6">
                            <p className="text-sm font-semibold text-purple-600 mb-2">
                              {solution.subtitle}
                            </p>
                            <h3 className="text-2xl font-bold text-foreground mb-2">
                              {solution.name}
                            </h3>
                            <p className="text-sm text-foreground/60">
                              {solution.description}
                            </p>
                          </div>

                          <div className="mb-6">
                            <p className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
                              {solution.price}
                            </p>
                          </div>

                          <div className="space-y-3 mb-8 flex-1">
                            {solution.features.map((feature, idx) => (
                              <div key={idx} className="flex items-start gap-3">
                                <Check size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                                <span className="text-sm text-foreground/80">
                                  {feature}
                                </span>
                              </div>
                            ))}
                          </div>

                          <Button className={`w-full bg-gradient-to-r ${solution.gradient} text-white border-0 hover:opacity-90`}>
                            Get Started
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Arrow */}
            <button
              onClick={goToNext}
              className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 transition-all"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {solutions.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === activeIndex
                    ? "bg-gradient-to-r from-purple-600 to-cyan-600 w-8"
                    : "bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
