import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isEcosystemOpen, setIsEcosystemOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
    setIsEcosystemOpen(false);
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
            <Link
              href="/"
              className="text-foreground/80 hover:text-foreground transition-colors"
            >
              Home
            </Link>

            {/* Ecosystem Dropdown */}
            <div className="relative group">
              <button className="text-foreground/80 hover:text-foreground transition-colors flex items-center gap-1">
                The Ecosystem
                <ChevronDown size={16} className="group-hover:rotate-180 transition-transform" />
              </button>
              <div className="absolute left-0 mt-2 w-48 rounded-lg backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <Link
                  href="/#features"
                  className="block w-full text-left px-4 py-3 text-foreground/80 hover:text-foreground hover:bg-white/10 transition-colors first:rounded-t-lg"
                >
                  Operational Services
                </Link>
                <Link
                  href="/#digital-services"
                  className="block w-full text-left px-4 py-3 text-foreground/80 hover:text-foreground hover:bg-white/10 transition-colors last:rounded-b-lg"
                >
                  Digital Services
                </Link>
              </div>
            </div>

            <Link
              href="/#packages"
              className="text-foreground/80 hover:text-foreground transition-colors"
            >
              Packages
            </Link>
            <Link
              href="/about"
              className="text-foreground/80 hover:text-foreground transition-colors"
            >
              About
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link
              href="/booking"
              className="inline-block"
            >
              <Button
                className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white border-0"
              >
                Book Strategy Session
              </Button>
            </Link>
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
            <Link
              href="/"
              className="block w-full text-left text-foreground/80 hover:text-foreground transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>

            {/* Mobile Ecosystem Dropdown */}
            <div>
              <button
                onClick={() => setIsEcosystemOpen(!isEcosystemOpen)}
                className="w-full text-left text-foreground/80 hover:text-foreground transition-colors py-2 flex items-center justify-between"
              >
                The Ecosystem
                <ChevronDown
                  size={16}
                  className={`transition-transform ${isEcosystemOpen ? "rotate-180" : ""}`}
                />
              </button>
              {isEcosystemOpen && (
                <div className="pl-4 space-y-2 mt-2">
                  <Link
                    href="/#features"
                    className="block w-full text-left text-foreground/70 hover:text-foreground transition-colors py-1"
                    onClick={() => setIsOpen(false)}
                  >
                    Operational Services
                  </Link>
                  <Link
                    href="/#digital-services"
                    className="block w-full text-left text-foreground/70 hover:text-foreground transition-colors py-1"
                    onClick={() => setIsOpen(false)}
                  >
                    Digital Services
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/#packages"
              className="block w-full text-left text-foreground/80 hover:text-foreground transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Packages
            </Link>
            <Link
              href="/about"
              className="block w-full text-left text-foreground/80 hover:text-foreground transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              href="/booking"
              className="block"
              onClick={() => setIsOpen(false)}
            >
              <Button
                className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 text-white border-0"
              >
                Book Strategy Session
              </Button>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
