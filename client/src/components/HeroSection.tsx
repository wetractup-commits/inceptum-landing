import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen flex items-center justify-center pt-20 px-4 md:px-6 relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Column */}
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="inline-block px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-semibold">
              For Tech Startups
            </div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 bg-clip-text text-transparent">
                Launch Your Tech Startup in the UAE
              </span>
            </h1>
            <p className="text-xl text-foreground/70 leading-relaxed">
              Everything you need under one roof. From UAE business licensing and compliance to digital marketing solutions—we handle it all so you can focus on building.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={() => scrollToSection("solutions")}
              className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white text-lg px-8 py-6 rounded-xl border-0 flex items-center justify-center gap-2"
            >
              Explore Solutions
              <ArrowRight size={20} />
            </Button>
            <Button
              variant="outline"
              className="text-lg px-8 py-6 rounded-xl border-2 border-purple-300 hover:bg-purple-50"
            >
              Book Consultation
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 pt-8">
            <div>
              <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
                500+
              </p>
              <p className="text-sm text-foreground/60">Companies Launched</p>
            </div>
            <div>
              <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
                98%
              </p>
              <p className="text-sm text-foreground/60">Success Rate</p>
            </div>
            <div>
              <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
                24/7
              </p>
              <p className="text-sm text-foreground/60">Support</p>
            </div>
          </div>
        </div>

        {/* Right Column - Gradient Visual */}
        <div className="hidden md:flex items-center justify-center">
          <div className="relative w-full h-96">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-pink-400 to-cyan-400 rounded-3xl opacity-30 blur-2xl"></div>
            <div className="absolute inset-4 bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 rounded-2xl opacity-20"></div>
            <div className="absolute inset-8 bg-white/5 backdrop-blur-xl rounded-xl border border-white/20 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="text-6xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
                  ✨
                </div>
                <p className="text-foreground/60">All-in-One Solution</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
