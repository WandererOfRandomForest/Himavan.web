import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const ScrollingQuotes: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const quotes = [
    "The Earth does not belong to us; we belong to the Earth",
    "Small acts, when multiplied by millions, can transform the world",
    "Nature is not a place to visit. It is home",
    "The environment is where we all meet; where we all have a mutual interest",
    "Every day is Earth Day when you live sustainably",
    "Be the change you wish to see in the world",
    "The greatest threat to our planet is the belief that someone else will save it"
  ];

  useEffect(() => {
    const container = containerRef.current;
    
    if (container) {
      const totalWidth = container.scrollWidth / 2;
      
      gsap.set(container, { x: 0 });
      
      gsap.to(container, {
        x: -totalWidth,
        duration: 40,
        ease: "none",
        repeat: -1
      });
    }
  }, []);

  return (
    <section className="py-16 bg-blue-600 overflow-hidden">
      <div 
        ref={containerRef}
        className="flex whitespace-nowrap"
        style={{ width: 'fit-content' }}
      >
        {[...quotes, ...quotes].map((quote, index) => (
          <div
            key={index}
            className="inline-block px-8 text-white text-xl md:text-2xl font-medium"
          >
            "{quote}"
            <span className="mx-8 text-blue-300">•</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ScrollingQuotes;