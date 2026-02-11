import { Award, Zap, Users, TrendingUp } from "lucide-react";

const reasons = [
  {
    icon: Award,
    title: "UAE Compliance Experts",
    description: "Deep knowledge of local regulations and best practices",
  },
  {
    icon: Zap,
    title: "All-in-One Solution",
    description: "No need to juggle multiple vendors",
  },
  {
    icon: Users,
    title: "Tech-Focused Approach",
    description: "We understand startup challenges",
  },
  {
    icon: TrendingUp,
    title: "Transparent Pricing",
    description: "No hidden fees or surprise costs",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
              Why Choose Inceptum
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-cyan-600 flex items-center justify-center">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {reason.title}
                </h3>
                <p className="text-foreground/70">{reason.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
