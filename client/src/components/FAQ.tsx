import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqItems = [
  {
    category: "Licensing",
    question: "How long does it take to get a business license?",
    answer: "Typically 15-30 days depending on the type of license and completeness of documentation.",
  },
  {
    category: "Licensing",
    question: "What types of licenses are available for tech startups?",
    answer: "We offer freelance, professional, commercial, and industrial licenses tailored to your business model.",
  },
  {
    category: "Compliance",
    question: "What compliance requirements must I follow?",
    answer: "UAE requires annual audits, tax registration, and adherence to labor laws. We guide you through all requirements.",
  },
  {
    category: "Compliance",
    question: "Do I need a local sponsor?",
    answer: "Depends on your visa status. We can arrange sponsorship if needed.",
  },
  {
    category: "Costs",
    question: "What are the hidden costs?",
    answer: "No hidden costs. We provide transparent pricing with all fees upfront.",
  },
  {
    category: "Costs",
    question: "Can I upgrade my package later?",
    answer: "Yes, you can upgrade anytime. We'll credit your current package towards the upgrade.",
  },
  {
    category: "Digital Services",
    question: "Do you provide website development?",
    answer: "Yes, we offer custom website development, e-commerce solutions, and SEO optimization.",
  },
  {
    category: "Digital Services",
    question: "What social media platforms do you manage?",
    answer: "We manage LinkedIn, Instagram, Facebook, Twitter, and TikTok based on your target audience.",
  },
  {
    category: "Support",
    question: "Is support available 24/7?",
    answer: "Yes, our support team is available 24/7 for urgent matters and during business hours for general inquiries.",
  },
  {
    category: "Support",
    question: "Can I change my package after signing up?",
    answer: "Absolutely. You can upgrade, downgrade, or modify your services anytime.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 px-4 md:px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
              Frequently Asked Questions
            </span>
          </h2>
          <p className="text-xl text-foreground/70">
            Everything you need to know about our services
          </p>
        </div>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="rounded-lg border border-white/10 backdrop-blur-xl bg-white/5 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/10 transition-colors"
              >
                <div className="text-left">
                  <p className="text-xs font-semibold text-purple-600 mb-1">
                    {item.category}
                  </p>
                  <p className="font-semibold text-foreground">
                    {item.question}
                  </p>
                </div>
                <ChevronDown
                  size={20}
                  className={`flex-shrink-0 text-purple-600 transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openIndex === index && (
                <div className="px-6 py-4 border-t border-white/10 bg-white/5">
                  <p className="text-foreground/80">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
