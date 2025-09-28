import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Leaf, Recycle, Heart } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const CompanyDescription: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // Wait until all cards are mounted
    if (cardsRef.current.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [cardsRef.current.length]); // re-run when cards mount

  const features = [
    {
      icon: <Leaf className="h-12 w-12 text-blue-600" />,
      title: "Paper Products",
      description:
        "Biodegradable paper cutlery made from sustainable sources, perfect for eco-conscious dining experiences.",
    },
    {
      icon: <Recycle className="h-12 w-12 text-blue-600" />,
      title: "Bagasse Innovation",
      description:
        "Revolutionary cutlery made from sugarcane bagasse, transforming agricultural waste into functional products.",
    },
    {
      icon: <Heart className="h-12 w-12 text-blue-600" />,
      title: "Plastic-Free Future",
      description:
        "Completely plastic-free alternatives that decompose naturally, protecting our planet for future generations.",
    },
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Revolutionizing Sustainable Dining
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            At Himavan, we're committed to creating eco-friendly cutlery solutions that combine
            functionality with environmental responsibility. Our products are designed to reduce
            plastic waste while maintaining the quality and durability you need.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group"
            >
              <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompanyDescription;
