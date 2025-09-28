import React, { useRef } from "react";
import { Typewriter } from "react-simple-typewriter";

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);

  return (
    <section
      id="home"
      ref={heroRef}
      className="min-h-screen relative flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Sustainable dining background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-blue-800/60 to-blue-700/70" />
      </div>

      <div className="text-center z-10 px-4 relative">
        {/* Typewriter Typography */}
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6 tracking-wider text-white">
          <Typewriter
            words={["HIMAVAN"]}
            loop={0} // 0 = infinite loop
            cursor
            cursorStyle="|"
            typeSpeed={120} // typing speed (ms per letter)
            deleteSpeed={80} // deleting speed (ms per letter)
            delaySpeed={1500} // delay before deleting
          />
        </h1>

        <div className="h-16 md:h-24"></div>

        <p
          ref={quoteRef}
          className="text-xl md:text-2xl text-white mb-8 max-w-2xl mx-auto leading-relaxed font-medium"
        >
          Sustainable Cutlery Solutions for a Greener Tomorrow
        </p>

        <button
          onClick={() =>
            document
              .getElementById("products")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-50 hover:scale-105 transition-all duration-300 shadow-lg"
        >
          Explore Products
        </button>
      </div>
    </section>
  );
};

export default Hero;
