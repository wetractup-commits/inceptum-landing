import { useState } from "react";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

type FormStep = "initial" | "package" | "details" | "success";

export default function LeadCaptureForm() {
  const [step, setStep] = useState<FormStep>("initial");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    packageInterest: "",
    hasLicense: "",
    message: "",
  });

  const submitMutation = trpc.contact.submit.useMutation();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePackageSelect = (pkg: string) => {
    setFormData((prev) => ({ ...prev, packageInterest: pkg }));
    setStep("package");
  };

  const handleLicenseSelect = (hasLicense: string) => {
    setFormData((prev) => ({ ...prev, hasLicense }));
    setStep("details");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      await submitMutation.mutateAsync({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        message: `Package Interest: ${formData.packageInterest}\nHas License: ${formData.hasLicense}`,
        type: "strategy_session",
      });

      setStep("success");
      toast.success("Thank you! We'll be in touch soon.");

      // Reset form after 3 seconds
      setTimeout(() => {
        setStep("initial");
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          packageInterest: "",
          hasLicense: "",
          message: "",
        });
      }, 3000);
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <section id="contact" className="py-20 px-4 md:px-6 relative overflow-hidden">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
              Ready to Launch?
            </span>
          </h2>
          <p className="text-xl text-foreground/70">
            Book a strategy session with our team
          </p>
        </div>

        {/* Form Container */}
        <div className="rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 p-8">
          {step === "initial" && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-foreground">
                Which package interests you?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: "The Foundation", id: "foundation" },
                  { name: "The Scaler", id: "scaler" },
                  { name: "The Fortress", id: "fortress" },
                  { name: "The Visionary", id: "visionary" },
                ].map((pkg) => (
                  <button
                    key={pkg.id}
                    onClick={() => handlePackageSelect(pkg.name)}
                    className="p-4 rounded-lg border-2 border-white/20 hover:border-purple-400 hover:bg-white/10 transition-all text-left font-semibold text-foreground"
                  >
                    {pkg.name}
                  </button>
                ))}
              </div>
              <p className="text-sm text-foreground/60">
                Not sure? Choose any option and we'll discuss during your session.
              </p>
            </div>
          )}

          {step === "package" && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-foreground">
                Do you already have a trade license?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => handleLicenseSelect("Yes")}
                  className="p-4 rounded-lg border-2 border-white/20 hover:border-green-400 hover:bg-white/10 transition-all text-left font-semibold text-foreground"
                >
                  ✓ Yes, I have one
                </button>
                <button
                  onClick={() => handleLicenseSelect("No")}
                  className="p-4 rounded-lg border-2 border-white/20 hover:border-orange-400 hover:bg-white/10 transition-all text-left font-semibold text-foreground"
                >
                  ✗ No, I need help
                </button>
              </div>
              <button
                onClick={() => setStep("initial")}
                className="text-sm text-purple-600 hover:text-purple-700"
              >
                ← Back
              </button>
            </div>
          )}

          {step === "details" && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h3 className="text-2xl font-bold text-foreground">
                Tell us about yourself
              </h3>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-foreground placeholder-foreground/50 focus:outline-none focus:border-purple-400"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-foreground placeholder-foreground/50 focus:outline-none focus:border-purple-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+971 50 123 4567"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-foreground placeholder-foreground/50 focus:outline-none focus:border-purple-400"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="Your company (optional)"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-foreground placeholder-foreground/50 focus:outline-none focus:border-purple-400"
                />
              </div>

              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep("package")}
                  className="flex-1"
                >
                  ← Back
                </Button>
                <Button
                  type="submit"
                  disabled={submitMutation.isPending}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-cyan-600 text-white border-0"
                >
                  {submitMutation.isPending ? "Submitting..." : "Book Session"}
                </Button>
              </div>
            </form>
          )}

          {step === "success" && (
            <div className="text-center space-y-6 py-12">
              <div className="text-6xl">✨</div>
              <h3 className="text-2xl font-bold text-foreground">
                Thank you!
              </h3>
              <p className="text-foreground/70">
                We've received your request and will be in touch within 24 hours to schedule your strategy session.
              </p>
              <p className="text-sm text-foreground/60">
                In the meantime, check your email for a welcome guide.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
