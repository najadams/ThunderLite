"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const stats = [
  { label: "Families Supported", value: 500, suffix: "+" },
  { label: "Artworks Sold", value: 1000, suffix: "+" },
  { label: "Total Donations", value: 250000, prefix: "$", suffix: "" },
  { label: "Young Artists", value: 750, suffix: "+" },
];

const quickLinks = [
  {
    title: "Apply for Funds",
    description: "Get support for your child's artistic journey",
    href: "/apply",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        />
      </svg>
    ),
  },
  {
    title: "Shop Artwork",
    description: "Browse and purchase unique pieces from young artists",
    href: "/store",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    title: "Donate",
    description: "Support our mission to empower young artists",
    href: "/donate",
    icon: (
      <svg
        className="w-6 h-6"
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

const AnimatedCounter = ({
  value,
  prefix = "",
  suffix = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 50;
    const stepValue = value / steps;
    const stepDuration = duration / steps;

    let current = 0;
    const timer = setInterval(() => {
      current += stepValue;
      if (current > value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span className="text-4xl font-bold text-indigo-600">
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-bg.jpg"
            alt="Children creating art"
            fill
            className="object-cover brightness-75"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
        </div>

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 animate-fade-in">
            Empowering Creativity,
            <br />
            Changing Lives
          </h1>
          <p
            className="text-xl md:text-2xl mb-12 animate-fade-in"
            style={{ animationDelay: "0.2s" }}>
            Support young artists and their families
          </p>
          <div
            className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in"
            style={{ animationDelay: "0.4s" }}>
            <Link href="/about" className="btn-gradient">
              Learn More
            </Link>
            <Link
              href="/donate"
              className="btn-secondary bg-white/10 backdrop-blur-sm hover:bg-white/20">
              Donate Now
            </Link>
            <Link
              href="/store"
              className="btn-secondary bg-white/10 backdrop-blur-sm hover:bg-white/20">
              Shop Art
            </Link>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="section bg-gray-50 py-18">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-20">
            Our Impact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center p-8 bg-white rounded-lg shadow-md animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}>
                <AnimatedCounter
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
                <p className="mt-4 text-gray-600 text-lg">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="section py-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {quickLinks.map((link, index) => (
              <Link
                key={link.title}
                href={link.href}
                className="card group p-8 animate-fade-in hover:shadow-lg transition-shadow duration-300"
                style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="text-indigo-600 mb-6 transform group-hover:scale-110 transition-transform">
                  {link.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{link.title}</h3>
                <p className="text-gray-600 text-lg">{link.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
