import { CheckCircle } from "lucide-react";

const steps = [
  {
    number: 1,
    title: "Consultation",
    description: "Discuss your startup needs and goals",
    duration: "1-2 days",
  },
  {
    number: 2,
    title: "Documentation",
    description: "Prepare all required documents and paperwork",
    duration: "3-5 days",
  },
  {
    number: 3,
    title: "License Application",
    description: "Submit application to UAE authorities",
    duration: "5-10 days",
  },
  {
    number: 4,
    title: "Corporate Setup",
    description: "Bank account and tax registration",
    duration: "3-7 days",
  },
  {
    number: 5,
    title: "Digital Services",
    description: "Website, email, and social media setup",
    duration: "5-10 days",
  },
  {
    number: 6,
    title: "Launch & Support",
    description: "Go live with ongoing support",
    duration: "Ongoing",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
              How It Works
            </span>
          </h2>
          <p className="text-xl text-foreground/70">
            Simple process from consultation to launch
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="relative">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-gradient-to-br from-purple-600 to-cyan-600">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-sm text-foreground/60 mt-1">
                    {step.description}
                  </p>
                  <p className="text-xs text-purple-600 font-semibold mt-2">
                    {step.duration}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
