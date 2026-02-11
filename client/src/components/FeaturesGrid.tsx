import { Zap, Shield, Building2, Globe, Mail, Megaphone } from "lucide-react";

const features = [
  {
    icon: Building2,
    title: "UAE Business Licensing",
    description: "Complete setup for your business license with expert guidance",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Shield,
    title: "Compliance & Legal",
    description: "Stay compliant with UAE regulations and international standards",
    gradient: "from-pink-500 to-red-500",
  },
  {
    icon: Zap,
    title: "Corporate Setup",
    description: "Bank accounts, tax registration, and corporate essentials",
    gradient: "from-red-500 to-orange-500",
  },
  {
    icon: Globe,
    title: "Domain & Web Services",
    description: "Professional domain registration and web hosting",
    gradient: "from-orange-500 to-cyan-500",
  },
  {
    icon: Mail,
    title: "Email & Communications",
    description: "Business email setup and professional communication tools",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    icon: Megaphone,
    title: "Digital Marketing Support",
    description: "Social media setup, SEO, and marketing strategy",
    gradient: "from-blue-500 to-purple-500",
  },
];

export default function FeaturesGrid() {
  return (
    <section id="features" className="py-20 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
              Everything You Need
            </span>
          </h2>
          <p className="text-xl text-foreground/70">
            Comprehensive services to launch and grow your tech startup
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 hover:border-white/30 p-8 transition-all"
              >
                <div className="relative">
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-foreground/70">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
