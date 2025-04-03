"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const impactLevels = [
  {
    amount: 25,
    description: "Provides art supplies for one child",
    icon: (
      <svg
        className="w-12 h-12"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
        />
      </svg>
    ),
  },
  {
    amount: 50,
    description: "Sponsors a workshop session",
    icon: (
      <svg
        className="w-12 h-12"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
        />
      </svg>
    ),
  },
  {
    amount: 100,
    description: "Funds a month of art education",
    icon: (
      <svg
        className="w-12 h-12"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
    ),
  },
  {
    amount: 500,
    description: "Supports a family for six months",
    icon: (
      <svg
        className="w-12 h-12"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    ),
  },
];

export default function Donate() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [isRecurring, setIsRecurring] = useState(false);

  useEffect(() => {
    // Load FlipCause widget script
    const script = document.createElement("script");
    script.src = "https://flipcause.com/widget/widget_loader/YOURWIDGETID";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^\d+$/.test(value)) {
      setCustomAmount(value);
      setSelectedAmount(null);
    }
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-90" />
          <div className="absolute inset-0 bg-[url('/donate-bg.jpg')] bg-cover bg-center mix-blend-overlay" />
        </div>
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-bold mb-6">
            Make a Difference Today
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl">
            Your donation helps young artists pursue their dreams while
            supporting their families.
          </motion.p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Impact Visualization */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-center mb-8">
                Your Impact
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {impactLevels.map((level, index) => (
                  <motion.div
                    key={level.amount}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`card p-6 text-center cursor-pointer transition-all duration-200 ${
                      selectedAmount === level.amount
                        ? "ring-2 ring-indigo-600 bg-indigo-50"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => handleAmountSelect(level.amount)}>
                    <div
                      className={`mx-auto mb-4 text-indigo-600 ${
                        selectedAmount === level.amount ? "scale-110" : ""
                      } transition-transform duration-200`}>
                      {level.icon}
                    </div>
                    <div className="text-2xl font-bold mb-2">
                      ${level.amount}
                    </div>
                    <p className="text-gray-600">{level.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Donation Form */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4">Choose Amount</h3>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-4">
                    {impactLevels.map((level) => (
                      <button
                        key={level.amount}
                        onClick={() => handleAmountSelect(level.amount)}
                        className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                          selectedAmount === level.amount
                            ? "bg-indigo-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}>
                        ${level.amount}
                      </button>
                    ))}
                  </div>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                      $
                    </span>
                    <input
                      type="text"
                      value={customAmount}
                      onChange={handleCustomAmountChange}
                      placeholder="Enter custom amount"
                      className="input pl-8"
                    />
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={isRecurring}
                    onChange={(e) => setIsRecurring(e.target.checked)}
                    className="form-checkbox h-5 w-5 text-indigo-600 rounded"
                  />
                  <span className="text-gray-700">
                    Make this a monthly donation
                  </span>
                </label>
              </div>

              {/* FlipCause Widget Container */}
              <div id="flipcause-widget-container" className="w-full">
                {/* Widget will be loaded here */}
              </div>
            </div>

            {/* Additional Information */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="card p-6">
                <h3 className="text-xl font-bold mb-4">Tax Deductible</h3>
                <p className="text-gray-600">
                  Your donation is tax-deductible. You will receive a receipt
                  for your records.
                </p>
              </div>
              <div className="card p-6">
                <h3 className="text-xl font-bold mb-4">Secure Payment</h3>
                <p className="text-gray-600">
                  All transactions are processed securely through FlipCause's
                  encrypted payment system.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
