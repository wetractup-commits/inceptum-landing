import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="mx-4 mt-4 md:mx-6 md:mt-6 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl">
        <div className="px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">I</span>
            </div>
            <span className="font-bold text-lg bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
              Inceptum
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("features")}
              className="text-foreground/80 hover:text-foreground transition-colors"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="text-foreground/80 hover:text-foreground transition-colors"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="text-foreground/80 hover:text-foreground transition-colors"
            >
              FAQ
            </button>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white border-0">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-foreground"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-white/20 px-6 py-4 space-y-4">
            <button
              onClick={() => scrollToSection("features")}
              className="block w-full text-left text-foreground/80 hover:text-foreground transition-colors"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="block w-full text-left text-foreground/80 hover:text-foreground transition-colors"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="block w-full text-left text-foreground/80 hover:text-foreground transition-colors"
            >
              FAQ
            </button>
            <Button className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 text-white border-0">
              Get Started
            </Button>
          </div>
        )}
      </nav>
    </header>
  );
}
