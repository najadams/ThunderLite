"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const timeline = [
  {
    year: "2020",
    title: "Foundation Established",
    description:
      "Art Aid was founded with a mission to support young artists and their families.",
  },
  {
    year: "2021",
    title: "First Grant Program",
    description:
      "Launched our first grant program, supporting 50 families in the first year.",
  },
  {
    year: "2022",
    title: "Online Store Launch",
    description:
      "Introduced our online marketplace for young artists to showcase and sell their work.",
  },
  {
    year: "2023",
    title: "National Expansion",
    description:
      "Expanded our programs nationwide, reaching over 500 families across the country.",
  },
];

const testimonials = [
  {
    quote:
      "Art Aid has been a blessing for our family. The support we've received has allowed our daughter to pursue her passion for painting.",
    author: "Sarah Johnson",
    role: "Parent",
  },
  {
    quote:
      "Thanks to Art Aid, I can share my art with the world and help support my family. It's a dream come true.",
    author: "Michael Chen",
    role: "Young Artist, Age 15",
  },
  {
    quote:
      "The impact Art Aid has on these young artists and their families is truly remarkable. I'm proud to be a donor.",
    author: "David Williams",
    role: "Regular Donor",
  },
];

export default function About() {
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-slide-up", "opacity-100");
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    const timelineItems =
      timelineRef.current?.querySelectorAll(".timeline-item");
    timelineItems?.forEach((item) => {
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen pt-16">
      {/* Intro Section */}
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Our Story
              </h1>
              <p className="text-xl text-gray-600">
                Art Aid was founded with a simple yet powerful mission: to
                support young artists and their families through financial
                assistance and creative opportunities.
              </p>
              <p className="text-gray-600">
                We believe that every child deserves the chance to explore their
                artistic potential, regardless of their family's financial
                circumstances. Through our programs, we've helped hundreds of
                families turn creativity into opportunity.
              </p>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl animate-fade-in mb-5">
              <Image
                src="/hero-bg.jpg"
                alt="Young artist painting"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-3xl font-bold">Our Mission</h2>
              <p className="text-xl">
                To empower young artists by providing financial support and
                creating opportunities for them to showcase their talent while
                supporting their families.
              </p>
            </div>
            <div
              className="space-y-6 animate-fade-in"
              style={{ animationDelay: "0.2s" }}>
              <h2 className="text-3xl font-bold">Our Vision</h2>
              <p className="text-xl">
                A world where every young artist has the resources and support
                they need to pursue their creative dreams and contribute to
                their family's well-being.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section bg-gray-50" ref={timelineRef}>
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Our Journey
          </h2>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-indigo-200" />

            {/* Timeline Items */}
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div
                  key={item.year}
                  className={`timeline-item relative opacity-0 ${
                    index % 2 === 0
                      ? "lg:ml-auto lg:pl-32"
                      : "lg:mr-auto lg:pr-32"
                  }`}
                  style={{ transitionDelay: `${index * 0.2}s` }}>
                  <div className="bg-white p-6 rounded-lg shadow-md relative">
                    {/* Timeline Dot */}
                    <div className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-indigo-600 rounded-full z-10 lg:left-0 lg:right-auto">
                      <div className="absolute inset-0 bg-indigo-600 rounded-full animate-ping opacity-75" />
                    </div>
                    <div className="text-indigo-600 font-bold text-lg mb-2">
                      {item.year}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            What People Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.author}
                className="bg-white p-8 rounded-lg shadow-md animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="text-indigo-600 mb-4">
                  <svg
                    className="w-8 h-8"
                    fill="currentColor"
                    viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <p className="text-gray-600 mb-6">{testimonial.quote}</p>
                <div>
                  <div className="font-bold">{testimonial.author}</div>
                  <div className="text-gray-500">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
