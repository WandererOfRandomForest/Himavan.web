import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Award, Globe, Target } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const [activeStory, setActiveStory] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement[]>([]);

  const stories = [
    {
      title: "Our Beginning",
      content: "Founded with a vision to revolutionize the cutlery industry, Himavan started as a small initiative to reduce plastic waste in dining experiences."
    },
    {
      title: "Innovation Drive",
      content: "We invested heavily in research and development to create sustainable alternatives that don't compromise on quality or functionality."
    },
    {
      title: "Global Impact",
      content: "Today, we've helped thousands of businesses transition to eco-friendly cutlery, preventing millions of plastic items from reaching landfills."
    },
    {
      title: "Future Vision",
      content: "Our goal is to make sustainable dining the standard worldwide, creating a plastic-free future for generations to come."
    }
  ];

  const stats = [
    { icon: <Users className="h-8 w-8" />, number: "10,000+", label: "Happy Customers" },
    { icon: <Award className="h-8 w-8" />, number: "5M+", label: "Products Delivered" },
    { icon: <Globe className="h-8 w-8" />, number: "50+", label: "Countries Served" },
    { icon: <Target className="h-8 w-8" />, number: "100%", label: "Plastic-Free" }
  ];

  useEffect(() => {
    const stats = statsRef.current;

    gsap.fromTo(
      stats,
      { opacity: 0, y: 30, scale: 0.85 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStory(prev => (prev + 1) % stories.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [stories.length]);

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About Himavan
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're passionate about creating sustainable solutions that make a real difference 
            in the world. Our journey is driven by innovation, quality, and environmental responsibility.
          </p>
        </div>

        {/* Interactive Story Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div className="space-y-4">
            {stories.map((story, index) => (
              <div
                key={index}
                onClick={() => setActiveStory(index)}
                className={`p-6 rounded-xl cursor-pointer transition-all duration-500 ${
                  activeStory === index 
                    ? 'bg-blue-600 text-white shadow-lg scale-105' 
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                <h3 className="text-xl font-bold mb-2">{story.title}</h3>
                <p className="leading-relaxed">{story.content}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center">
            <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl p-8 text-white shadow-xl">
              <h3 className="text-3xl font-bold mb-6">Our Mission</h3>
              <p className="text-lg leading-relaxed mb-6">
                To provide innovative, sustainable cutlery solutions that help businesses 
                and individuals reduce their environmental footprint while maintaining 
                the highest standards of quality and functionality.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Sustainable', 'Innovative', 'Quality', 'Eco-friendly'].map((tag, index) => (
                  <span
                    key={index}
                    className="bg-white/20 px-4 py-2 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              ref={el => el && (statsRef.current[index] = el)}
              className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <div className="text-blue-600 mb-4 flex justify-center">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
