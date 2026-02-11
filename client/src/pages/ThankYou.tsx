import { CheckCircle, Download, Calendar, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function ThankYou() {
  const handleDownloadGuide = () => {
    // In a real scenario, this would download a PDF
    // For now, we'll show a toast notification
    const link = document.createElement("a");
    link.href = "/founders-guide-dubai.pdf";
    link.download = "Founders-Guide-to-Dubai.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-white to-white/95 flex items-center justify-center px-4 py-20">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full blur-xl opacity-30"></div>
            <div className="relative bg-white rounded-full p-6 shadow-2xl">
              <CheckCircle className="w-16 h-16 text-green-500" />
            </div>
          </div>
        </div>

        {/* Main Message */}
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold">
            <span className="bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
              You're In!
            </span>
          </h1>
          <p className="text-xl text-foreground/70 leading-relaxed">
            Your strategy session request has been received. Our team is reviewing your details and will reach out within 24 hours via WhatsApp or email.
          </p>
        </div>

        {/* What Happens Next */}
        <div className="bg-gradient-to-br from-purple-50 to-cyan-50 border border-purple-200 rounded-2xl p-8 space-y-6">
          <h2 className="text-2xl font-bold text-foreground">What Happens Next</h2>

          <div className="space-y-4">
            {[
              {
                step: 1,
                title: "We Review Your Details",
                description:
                  "Our team analyzes your Roots & Growth needs to create a personalized roadmap.",
                icon: "📋",
              },
              {
                step: 2,
                title: "Initial Consultation",
                description:
                  "A 30-minute call to understand your vision, timeline, and budget.",
                icon: "📞",
              },
              {
                step: 3,
                title: "Custom Proposal",
                description:
                  "We send a detailed proposal with pricing, timeline, and next steps.",
                icon: "📄",
              },
              {
                step: 4,
                title: "Launch Your Growth",
                description:
                  "Once you're ready, we begin building your Roots & Growth simultaneously.",
                icon: "🚀",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="flex gap-4 items-start text-left p-4 rounded-lg bg-white/50 hover:bg-white transition-colors"
              >
                <div className="text-3xl flex-shrink-0">{item.icon}</div>
                <div>
                  <p className="font-semibold text-foreground">
                    Step {item.step}: {item.title}
                  </p>
                  <p className="text-foreground/70 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Download Guide */}
        <div className="bg-gradient-to-r from-purple-600 to-cyan-600 rounded-2xl p-8 text-white space-y-4">
          <h3 className="text-2xl font-bold">While You Wait...</h3>
          <p className="text-white/90 leading-relaxed">
            Download our "Founder's Guide to Dubai" — a comprehensive resource covering licensing timelines, banking requirements, visa sponsorship, and digital marketing strategies for the UAE market.
          </p>
          <Button
            onClick={handleDownloadGuide}
            className="bg-white text-purple-600 hover:bg-white/90 border-0 font-semibold flex items-center gap-2 mx-auto"
          >
            <Download size={18} />
            Download Your Free Guide
          </Button>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="https://wa.me/971501234567"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 p-4 rounded-lg border-2 border-purple-200 hover:bg-purple-50 transition-colors text-foreground font-semibold"
          >
            <MessageCircle size={20} />
            Message Us on WhatsApp
          </a>
          <Link
            href="/"
            className="flex items-center justify-center gap-2 p-4 rounded-lg border-2 border-cyan-200 hover:bg-cyan-50 transition-colors text-foreground font-semibold"
          >
            <Calendar size={20} />
            Back to Home
          </Link>
        </div>

        {/* FAQ Section */}
        <div className="space-y-4 text-left">
          <h3 className="text-2xl font-bold text-foreground text-center">
            Common Questions
          </h3>

          <div className="space-y-3">
            {[
              {
                q: "How long will the strategy session take?",
                a: "Our initial consultation is 30 minutes. We'll discuss your Roots & Growth needs, timeline, and budget to create a personalized roadmap.",
              },
              {
                q: "Do you offer payment plans?",
                a: "Yes! We offer flexible payment options for all packages. Our team will discuss this during your consultation.",
              },
              {
                q: "What if I'm not ready to commit yet?",
                a: "No pressure. Our guide provides valuable insights even if you decide to DIY. We're here when you're ready.",
              },
              {
                q: "Can I upgrade or downgrade my package later?",
                a: "Absolutely. Your package can evolve as your business grows. We move you seamlessly from The Foundation to The Visionary.",
              },
            ].map((item, idx) => (
              <details
                key={idx}
                className="group border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <summary className="font-semibold text-foreground flex items-center justify-between">
                  {item.q}
                  <span className="text-purple-600 group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <p className="text-foreground/70 mt-3">{item.a}</p>
              </details>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="pt-8 space-y-4">
          <p className="text-foreground/70">
            Questions before your call? Reach out anytime.
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="mailto:hello@inceptum.ae"
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold hover:opacity-90 transition-opacity"
            >
              Email Us
            </a>
            <a
              href="https://wa.me/971501234567"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg border-2 border-purple-600 text-purple-600 font-semibold hover:bg-purple-50 transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
