import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { useLocation } from "wouter";

interface FormData {
  // Section 1: Basics
  fullName: string;
  email: string;
  phone: string;

  // Section 2: Roots
  legalStatus: string;
  operationalHurdles: string[];

  // Section 3: Growth
  digitalPresence: string;
  growthBudget: string;

  // Section 4: Timing
  timeframe: string;
}

const TOTAL_STEPS = 4;

export default function BookingForm() {
  const [, setLocation] = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    legalStatus: "",
    operationalHurdles: [],
    digitalPresence: "",
    growthBudget: "",
    timeframe: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitMutation = trpc.contact.submit.useMutation();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (hurdle: string) => {
    setFormData((prev) => ({
      ...prev,
      operationalHurdles: prev.operationalHurdles.includes(hurdle)
        ? prev.operationalHurdles.filter((h) => h !== hurdle)
        : [...prev.operationalHurdles, hurdle],
    }));
  };

  const handleRadioChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateStep = (): boolean => {
    switch (currentStep) {
      case 1:
        if (!formData.fullName.trim()) {
          toast.error("Please enter your full name");
          return false;
        }
        if (!formData.email.trim()) {
          toast.error("Please enter your email");
          return false;
        }
        if (!formData.phone.trim()) {
          toast.error("Please enter your phone number");
          return false;
        }
        return true;
      case 2:
        if (!formData.legalStatus) {
          toast.error("Please select your legal status");
          return false;
        }
        if (formData.operationalHurdles.length === 0) {
          toast.error("Please select at least one operational hurdle");
          return false;
        }
        return true;
      case 3:
        if (!formData.digitalPresence) {
          toast.error("Please select your digital presence status");
          return false;
        }
        if (!formData.growthBudget) {
          toast.error("Please select your growth budget");
          return false;
        }
        return true;
      case 4:
        if (!formData.timeframe) {
          toast.error("Please select your desired timeframe");
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep()) {
      if (currentStep < TOTAL_STEPS) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep()) return;

    setIsSubmitting(true);

    try {
      await submitMutation.mutateAsync({
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        message: `Strategy Session Request\n\nLegal Status: ${formData.legalStatus}\nOperational Hurdles: ${formData.operationalHurdles.join(", ")}\nDigital Presence: ${formData.digitalPresence}\nGrowth Budget: ${formData.growthBudget}\nTimeframe: ${formData.timeframe}`,
        type: "booking_request",
      });

      // Redirect to thank you page
      setLocation("/thank-you");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const progressPercentage = (currentStep / TOTAL_STEPS) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-foreground">
            Step {currentStep} of {TOTAL_STEPS}
          </span>
          <span className="text-sm text-foreground/60">
            {Math.round(progressPercentage)}%
          </span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-600 to-cyan-600 transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Step 1: The Basics */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                The Basics
              </h2>
              <p className="text-foreground/70">Tell us who you are</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Your full name"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your@company.com"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <p className="text-xs text-foreground/60 mt-1">
                Professional/company email preferred
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                WhatsApp / Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+971 50 123 4567"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <p className="text-xs text-foreground/60 mt-1">
                Crucial for the UAE market
              </p>
            </div>
          </div>
        )}

        {/* Step 2: The Roots */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                The Roots
              </h2>
              <p className="text-foreground/70">Your operational foundation</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-4">
                Current Legal Status *
              </label>
              <div className="space-y-3">
                {[
                  {
                    value: "starting",
                    label: "I'm just starting out (No license yet)",
                  },
                  {
                    value: "existing",
                    label: "I have an existing license but need to scale/renew",
                  },
                  {
                    value: "international",
                    label: "I'm an international founder looking to expand to Dubai",
                  },
                ].map((option) => (
                  <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="legalStatus"
                      value={option.value}
                      checked={formData.legalStatus === option.value}
                      onChange={(e) =>
                        handleRadioChange("legalStatus", e.target.value)
                      }
                      className="w-4 h-4"
                    />
                    <span className="text-foreground/80">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-4">
                What is your primary operational hurdle? (Select all that apply)
                *
              </label>
              <div className="space-y-3">
                {[
                  { value: "licensing", label: "Trade Licensing & Legalities" },
                  { value: "banking", label: "Banking & Financial Setup" },
                  { value: "visas", label: "Visas & Employee Onboarding" },
                ].map((option) => (
                  <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.operationalHurdles.includes(
                        option.value
                      )}
                      onChange={() => handleCheckboxChange(option.value)}
                      className="w-4 h-4"
                    />
                    <span className="text-foreground/80">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: The Growth */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                The Growth
              </h2>
              <p className="text-foreground/70">Your digital ambition</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-4">
                Do you have an active digital presence? *
              </label>
              <div className="space-y-3">
                {[
                  {
                    value: "none",
                    label: "No, I need a website and brand from scratch",
                  },
                  {
                    value: "existing",
                    label: "Yes, but it isn't converting/generating leads",
                  },
                  {
                    value: "scaling",
                    label: "Yes, and I'm ready to scale with SEO/Ads",
                  },
                ].map((option) => (
                  <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="digitalPresence"
                      value={option.value}
                      checked={formData.digitalPresence === option.value}
                      onChange={(e) =>
                        handleRadioChange("digitalPresence", e.target.value)
                      }
                      className="w-4 h-4"
                    />
                    <span className="text-foreground/80">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-4">
                What is your monthly growth budget? *
              </label>
              <div className="space-y-3">
                {[
                  { value: "under2k", label: "Under $2,000" },
                  { value: "2k5k", label: "$2,000 - $5,000" },
                  { value: "5kplus", label: "$5,000+" },
                ].map((option) => (
                  <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="growthBudget"
                      value={option.value}
                      checked={formData.growthBudget === option.value}
                      onChange={(e) =>
                        handleRadioChange("growthBudget", e.target.value)
                      }
                      className="w-4 h-4"
                    />
                    <span className="text-foreground/80">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 4: The Timing */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                The Timing
              </h2>
              <p className="text-foreground/70">When do you want to launch?</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-4">
                How soon do you want to be fully operational? *
              </label>
              <div className="space-y-3">
                {[
                  {
                    value: "urgent",
                    label: "As soon as possible (Under 30 days)",
                  },
                  { value: "months", label: "Within 1-3 months" },
                  { value: "research", label: "Just researching for now" },
                ].map((option) => (
                  <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="timeframe"
                      value={option.value}
                      checked={formData.timeframe === option.value}
                      onChange={(e) =>
                        handleRadioChange("timeframe", e.target.value)
                      }
                      className="w-4 h-4"
                    />
                    <span className="text-foreground/80">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-cyan-50 border border-purple-200 rounded-lg p-4">
              <p className="text-sm text-foreground/80">
                <span className="font-semibold">Ready to proceed?</span> Click
                "Secure My Strategy Session" to book your personalized consultation.
              </p>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-4 pt-8">
          {currentStep > 1 && (
            <Button
              type="button"
              onClick={handlePrevious}
              variant="outline"
              className="flex-1 flex items-center justify-center gap-2"
            >
              <ChevronLeft size={18} />
              Back
            </Button>
          )}

          {currentStep < TOTAL_STEPS ? (
            <Button
              type="button"
              onClick={handleNext}
              className="flex-1 bg-gradient-to-r from-purple-600 to-cyan-600 text-white border-0 hover:opacity-90 flex items-center justify-center gap-2"
            >
              Next
              <ChevronRight size={18} />
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-gradient-to-r from-purple-600 to-cyan-600 text-white border-0 hover:opacity-90"
            >
              {isSubmitting ? "Processing..." : "Secure My Strategy Session"}
            </Button>
          )}
        </div>
      </form>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
}
