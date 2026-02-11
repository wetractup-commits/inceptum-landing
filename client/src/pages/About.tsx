import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AlertCircle, Zap, Leaf, Sun } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-white to-white/95">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 md:px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 bg-clip-text text-transparent">
              The Architecture of Growth
            </span>
          </h1>
          <p className="text-xl text-foreground/70">
            How Inceptum bridges the gap between bureaucracy and obscurity
          </p>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-20 px-4 md:px-6 relative overflow-hidden bg-gradient-to-b from-white/50 to-white">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <AlertCircle className="w-8 h-8 text-red-500" />
                <h2 className="text-4xl font-bold text-foreground">
                  The Problem: The "Founder's Gap"
                </h2>
              </div>
              <p className="text-lg text-foreground/70 leading-relaxed mb-6">
                Most startups fail not because the idea was bad, but because they got stuck in the gap. One side of the gap is <span className="font-semibold text-red-600">Bureaucracy</span>—the endless cycle of licensing, visas, and compliance. The other side is <span className="font-semibold text-red-600">Obscurity</span>—having a legal business that nobody knows exists.
              </p>
              <p className="text-lg text-foreground/70 leading-relaxed">
                Founders are forced to manage two different worlds, speaking two different languages, usually with two different agencies that never talk to each other. You're stuck juggling legal requirements while your competition is building market presence.
              </p>
            </div>

            {/* Visual Gap Representation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              <div className="rounded-2xl bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 p-8 space-y-4">
                <h3 className="text-2xl font-bold text-red-700 flex items-center gap-2">
                  <span className="text-3xl">⚖️</span> Bureaucracy
                </h3>
                <ul className="space-y-3 text-foreground/70">
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 font-bold">•</span>
                    <span>Trade license applications</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 font-bold">•</span>
                    <span>Visa and sponsorship</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 font-bold">•</span>
                    <span>Banking and compliance</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 font-bold">•</span>
                    <span>Tax registration</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-orange-200 p-8 space-y-4">
                <h3 className="text-2xl font-bold text-orange-700 flex items-center gap-2">
                  <span className="text-3xl">👻</span> Obscurity
                </h3>
                <ul className="space-y-3 text-foreground/70">
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 font-bold">•</span>
                    <span>No online presence</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 font-bold">•</span>
                    <span>Zero SEO visibility</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 font-bold">•</span>
                    <span>No brand authority</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 font-bold">•</span>
                    <span>Lost customer acquisition</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Solution Section */}
      <section className="py-20 px-4 md:px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Zap className="w-8 h-8 text-green-500" />
                <h2 className="text-4xl font-bold text-foreground">
                  The Solution: Roots & Growth
                </h2>
              </div>
              <p className="text-lg text-foreground/70 leading-relaxed mb-8">
                At Inceptum, we believe a business is a living organism. To survive, it needs two things working in perfect harmony:
              </p>
            </div>

            {/* Split Screen Roots vs Growth */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Roots */}
              <div className="rounded-2xl overflow-hidden backdrop-blur-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-200/50 p-8 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                    <Leaf className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">The Roots</h3>
                </div>
                <p className="text-sm text-foreground/60 italic">
                  Operational Infrastructure
                </p>
                <p className="text-foreground/80 leading-relaxed">
                  You cannot build a skyscraper on a swamp. We provide the deep-earth stability—legal structures, banking, PRO services, and compliance—that keeps your business grounded and protected.
                </p>
                <div className="space-y-3 pt-4">
                  <div className="flex items-start gap-3">
                    <span className="text-purple-600 font-bold text-lg">✓</span>
                    <span className="text-foreground/80">Trade license & business registration</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-purple-600 font-bold text-lg">✓</span>
                    <span className="text-foreground/80">Banking & visa sponsorship</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-purple-600 font-bold text-lg">✓</span>
                    <span className="text-foreground/80">Tax & compliance setup</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-purple-600 font-bold text-lg">✓</span>
                    <span className="text-foreground/80">Ongoing legal protection</span>
                  </div>
                </div>
              </div>

              {/* Growth */}
              <div className="rounded-2xl overflow-hidden backdrop-blur-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-200/50 p-8 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-600 to-blue-600 flex items-center justify-center">
                    <Sun className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">The Growth</h3>
                </div>
                <p className="text-sm text-foreground/60 italic">
                  Digital Strategy & Market Presence
                </p>
                <p className="text-foreground/80 leading-relaxed">
                  Once the roots are set, you need to reach for the sun. We build the high-converting digital presence, SEO dominance, and brand authority that turns a "registered company" into a "market leader."
                </p>
                <div className="space-y-3 pt-4">
                  <div className="flex items-start gap-3">
                    <span className="text-cyan-600 font-bold text-lg">✓</span>
                    <span className="text-foreground/80">High-converting website design</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-cyan-600 font-bold text-lg">✓</span>
                    <span className="text-foreground/80">SEO optimization & visibility</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-cyan-600 font-bold text-lg">✓</span>
                    <span className="text-foreground/80">Social media & brand strategy</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-cyan-600 font-bold text-lg">✓</span>
                    <span className="text-foreground/80">Paid advertising & growth hacking</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 30-Day Launch Timeline */}
      <section className="py-20 px-4 md:px-6 relative overflow-hidden bg-gradient-to-b from-white to-purple-50/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
                The 30-Day Launch Roadmap
              </span>
            </h2>
            <p className="text-lg text-foreground/70">
              How Roots and Growth work in parallel to accelerate your launch
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                week: "Week 1",
                roots: "License application submitted",
                growth: "Brand strategy & website design kickoff",
              },
              {
                week: "Week 2",
                roots: "Banking setup & visa processing",
                growth: "Website development & SEO foundation",
              },
              {
                week: "Week 3",
                roots: "License approval & corporate setup",
                growth: "Website launch & social media setup",
              },
              {
                week: "Week 4",
                roots: "Full operational readiness",
                growth: "SEO optimization & first campaigns live",
              },
            ].map((item, idx) => (
              <div key={idx} className="flex gap-6">
                <div className="flex-shrink-0 w-24">
                  <div className="text-lg font-bold text-purple-600 bg-purple-50 rounded-lg p-3 text-center">
                    {item.week}
                  </div>
                </div>
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-lg bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 p-4">
                    <p className="text-sm font-semibold text-purple-700 mb-1">🌱 Roots</p>
                    <p className="text-foreground/80">{item.roots}</p>
                  </div>
                  <div className="rounded-lg bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200 p-4">
                    <p className="text-sm font-semibold text-cyan-700 mb-1">🚀 Growth</p>
                    <p className="text-foreground/80">{item.growth}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-purple-50 to-cyan-50 border border-purple-200">
            <p className="text-center text-lg text-foreground">
              <span className="font-bold">The Key Insight:</span> By handling Roots and Growth simultaneously, we cut your time-to-market in half. You don't wait for your license to start your SEO—we build them in parallel.
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 px-4 md:px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-12">
          <div>
            <h2 className="text-4xl font-bold mb-8">
              <span className="bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
                How We're Changing the Ecosystem
              </span>
            </h2>

            <div className="space-y-8">
              {[
                {
                  title: "Unified Velocity",
                  description:
                    "By handling your trade license and your landing page simultaneously, we cut the time-to-market by half. You don't wait for your license to start your SEO; we build them in parallel.",
                  icon: "⚡",
                },
                {
                  title: "Total Clarity",
                  description:
                    "We remove the friction of the Middle Eastern business landscape. No more chasing three different consultants. One dashboard, one partner, one vision.",
                  icon: "🎯",
                },
                {
                  title: "Built-in Scalability",
                  description:
                    "Our ecosystem is designed to evolve with you. We move you from The Foundation to The Visionary seamlessly, ensuring your legal compliance always matches your marketing reach.",
                  icon: "📈",
                },
              ].map((item, idx) => (
                <div key={idx} className="rounded-2xl border border-purple-200 bg-white/50 backdrop-blur-sm p-8 hover:border-purple-400 transition-colors">
                  <div className="flex items-start gap-4">
                    <span className="text-4xl flex-shrink-0">{item.icon}</span>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-3">
                        {item.title}
                      </h3>
                      <p className="text-foreground/80 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Core Philosophy */}
          <div className="rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-600 p-12 text-white text-center space-y-4">
            <p className="text-2xl font-bold">Our Core Philosophy</p>
            <p className="text-lg leading-relaxed">
              <span className="font-semibold">We handle the complexity of the "now" so you can focus on the "next."</span> We build the roots; you own the growth.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
