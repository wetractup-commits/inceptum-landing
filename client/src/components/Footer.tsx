import { Mail, Phone, MapPin } from "lucide-react";
import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-white/5 to-white/10 backdrop-blur-xl border-t border-white/10 py-16 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">I</span>
              </div>
              <span className="font-bold text-lg bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
                Inceptum
              </span>
            </div>
            <p className="text-foreground/60 text-sm">
              Your complete partner for launching tech startups in the UAE.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-bold text-foreground mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-foreground/60">
              <li><Link href="/#packages" className="hover:text-foreground transition">Packages</Link></li>
              <li><Link href="/#features" className="hover:text-foreground transition">Services</Link></li>
              <li><Link href="/#how-it-works" className="hover:text-foreground transition">How It Works</Link></li>
              <li><Link href="/#faq" className="hover:text-foreground transition">FAQ</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-foreground mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-foreground/60">
              <li><Link href="/about" className="hover:text-foreground transition">About</Link></li>
              <li><Link href="/" className="hover:text-foreground transition">Home</Link></li>
              <li><Link href="/booking" className="hover:text-foreground transition">Book Session</Link></li>
              <li><a href="mailto:hello@inceptum.ae" className="hover:text-foreground transition">Contact</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-foreground mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-foreground/60">
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-purple-600" />
                <a href="mailto:hello@inceptum.ae" className="hover:text-foreground transition">
                  hello@inceptum.ae
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-purple-600" />
                <a href="tel:+971123456789" className="hover:text-foreground transition">
                  +971 1 234 5678
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-purple-600 flex-shrink-0 mt-0.5" />
                <span>Dubai, UAE</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-foreground/60">
            <p>&copy; 2026 Inceptum. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-foreground transition">Privacy Policy</a>
              <a href="#" className="hover:text-foreground transition">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
