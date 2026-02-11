import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingForm from "@/components/BookingForm";

export default function Booking() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-white to-white/95">
      <Header />

      <section className="pt-32 pb-20 px-4 md:px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
                Build Your Roadmap
              </span>
            </h1>
            <p className="text-xl text-foreground/70">
              Answer a few strategic questions and we'll create a personalized plan for your Roots & Growth.
            </p>
          </div>

          {/* Form Container */}
          <div className="bg-white/50 backdrop-blur-xl border border-white/20 rounded-2xl p-8 md:p-12 shadow-2xl">
            <BookingForm />
          </div>

          {/* Trust Signals */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              {
                icon: "⏱️",
                title: "Takes 5 Minutes",
                description: "Quick questions to understand your needs",
              },
              {
                icon: "🔒",
                title: "100% Confidential",
                description: "Your information is secure and private",
              },
              {
                icon: "✨",
                title: "No Commitment",
                description: "Explore options at your own pace",
              },
            ].map((item, idx) => (
              <div key={idx} className="space-y-3">
                <p className="text-4xl">{item.icon}</p>
                <h3 className="font-bold text-foreground">{item.title}</h3>
                <p className="text-sm text-foreground/70">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
